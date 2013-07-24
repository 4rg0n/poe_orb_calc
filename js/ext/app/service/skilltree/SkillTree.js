/**
 * Skilltree Service
 *
 * @class Calc.service.skilltree.SkillTree
 * @extends Calc.library.service.Abstract
 * @requires Calc.service.skilltree.node.Store
 * @uses Calc.library.Base64
 * @uses Calc.library.exception.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.service.skilltree.SkillTree', {
    extend: 'Calc.library.service.Abstract',

    uses: [
        'Calc.library.exception.Exception',
        'Calc.library.Base64'
    ],

    requires: [
        'Calc.service.skilltree.node.Store'
    ],

    /**
     * The current version of the passive skill tree
     *
     * @property {Number} currentTreeVersion
     */
    currentTreeVersion: 2,


    /**
     * Tells if the SkillTree is finished loading data
     *
     * @property {Boolean} isReady
     */
    isReady: false,


    /**
     * URL of Path of Exile website
     *
     * @cfg {String} poeUrl
     */
    poeUrl: 'www.pathofexile.com',


    /**
     * URI to the passive skill tree
     *
     * @cfg {String} skillTreeUri
     */
    skillTreeUri: 'passive-skill-tree',


    /**
     * Store with Skill Tree data
     *
     * @cfg {String/Calc.service.skilltree.node.Store}
     */
    store: 'Calc.service.skilltree.node.Store',


    /**
     * init
     *
     * @param {Function} [callback]
     * @returns {Boolean}
     */
    init: function(callback)
    {
        var me = this;

        if (false == me.isReady) {

            if (Ext.isString(me.store)) {
                me.store = Ext.create(me.store);
            }

            me.store.load({

                callback: function(records, operation, success) {

                    me.isReady = success;

                    if (typeof callback == 'function') {
                        callback(success);
                    }
                }
            });

            return true;
        }

        return false;
    },


    /**
     * Returns the Skill Tree nodes (store)
     *
     * @return {Ext.data.Store}
     */
    getNodes: function() {
        return this.getStore();
    },


    /**
     * Returns the store with skill tree data
     *
     * @return {String/Ext.data.Store}
     */
    getStore: function()
    {
        return this.store;
    },


    /**
     * Gets the Skills from URL
     * Returns false if URL couldn't be encoded
     *
     * @param {String} url
     * @returns {Boolean/Object}
     */
    getSkillsFromUrl: function(url)
    {
        var hashCode = this.getHashCodeFromUrl(url);

        if (hashCode) {
            return this.encode(hashCode);
        }
    },


    /**
     * Returns the hashcode of the URL
     *
     * @param {String} url
     * @returns {Boolean/String}
     */
    getHashCodeFromUrl: function(url)
    {
        var urlParts = url.split('/');

        if (urlParts[2] == this.poeUrl && urlParts[3] == this.skillTreeUri) {
            return urlParts[4];
        }

        throw new Calc.Exception('Invalid Url');
    },


    /**
     * Encodes the tree hash
     *
     * @param {String} hashCode
     * @returns {{keystones: Array, notables: Array, miscs: Array, nodeStats: Array}}
     */
    encode: function(hashCode)
    {
        try {
            var base64Data = Calc.Base64.decode(hashCode.replace(/-/g, "+").replace(/_/g, "/"));
        } catch(err) {
            throw new Calc.Exception('Could not decode hash', err);
        }

        var versionOffset = 0,
            classOffset = 4, 
            hashesOffset = 6,
            treeVersion = this._readInt32(versionOffset, base64Data),
            store = this.getStore();
            
        if (treeVersion == this.currentTreeVersion) {

            var charClass = this._readInt8(classOffset, base64Data),
                position = hashesOffset,
                totalValue = 0;

            var keystones = [],
                notables = [],
                miscs = [],
                nodeStats = [];

            var currentId,
                currentNode,
                currentEffect;

            var numberParser = /(?:\d*\.?\d+)/g,
                nodeValues = [];


            while (position < base64Data.length) {

                currentId = parseInt(this._readInt16(position, base64Data));
                currentNode = store.getById(currentId);

                if (true === currentNode.get('ks')) {
                    this._pushNode(keystones, currentNode);
                } else if (true === currentNode.get('not')) {
                    this._pushNode(notables, currentNode);
                } else {
                    this._pushNode(miscs, currentNode);
                }

                Ext.Array.each(currentNode.get('sd'), function(sd) {
                    currentEffect = sd.replace(numberParser, '$');
                    nodeValues = sd.match(numberParser);

                    if (nodeStats[currentEffect] == undefined) {
                        nodeStats[currentEffect] = {};
                        nodeStats[currentEffect].values = [];
                    }

                    nodeStats[currentEffect].values = nodeStats[currentEffect].values.concat(nodeValues);
                });

                position +=2;
            }

            keystones = this._sortObject(keystones);
            notables = this._sortObject(notables);
            miscs = this._sortObject(miscs);
            nodeStats = this._sortObject(nodeStats);

            nodeStats = this._replaceNumberTokens(nodeStats);

            Ext.Object.each(nodeStats, function(key, nodeStat) {
                currentEffect = key;
                totalValue = 0;

                if (nodeStat.values.length > 0) {

                    Ext.Array.each(nodeStat.values, function(value) {
                        if (value != null) {
                            totalValue += parseFloat(value);
                        }
                    });

                    currentEffect = currentEffect.replace(/\$/g, totalValue);
                }
            });

            return {
                keystones: keystones,
                notables: notables,
                miscs: miscs,
                nodeStats: nodeStats
            };

        } else {
            throw new Calc.Exception('Invalid skill tree version');
        }
    },


    /**
     * Replaces all number tokens ($) with the value
     *
     * @param {Object} nodeStats
     * @returns {Object}
     * @private
     */
    _replaceNumberTokens: function(nodeStats)
    {
        var newObject = {},
            currentEffect,
            totalValue = 0;

        Ext.Object.each(nodeStats, function(key, nodeStat) {
            currentEffect = key;
            totalValue = 0;

            if (false === Ext.isEmpty(nodeStat.values)) {

                Ext.Array.each(nodeStat.values, function(value) {
                    if (value != null) {
                        totalValue += parseFloat(value);
                    }
                });

                currentEffect = currentEffect.replace(/\$/g, totalValue);

                newObject[currentEffect] = nodeStat;
            }
        });

        return newObject;
    },


    /**
     * @param {Number} arrURL
     * @param {Number} position
     * @param {String} dataString
     * @returns {Number}
     * @private
     */
    _readInt: function(arrURL, position, dataString)
    {
        arrURL = arrURL || 4;
    
        var base64Data = position + arrURL,
            n = [];
        
        if (base64Data > dataString.length) {
            throw 'Integer read exceeds bounds';
        }
        
        for (; position < base64Data; ++position) {
            n.push(dataString.charAt(position).charCodeAt(0));
        }
        
        return this._bytesToInt(n, arrURL);
    },


    /**
     * @param {Number} position
     * @param {String} dataString
     * @returns {Number}
     * @private
     */
    _readInt8: function(position, dataString)
    {
        return this._readInt(1, position, dataString);
    },


    /**
     * @param {Number} position
     * @param {String} dataString
     * @returns {Number}
     * @private
     */
    _readInt16: function(position, dataString)
    {
      return this._readInt(2, position, dataString);
    },


    /**
     * @param {Number} position
     * @param {String} dataString
     * @returns {Number}
     * @private
     */
    _readInt32: function(position, dataString)
    {
      return this._readInt(4, position, dataString);
    },


    /**
     * @param {Number} arrURL
     * @param {String} base64Data
     * @returns {Number}
     * @private
     */
    _bytesToInt: function(arrURL, base64Data)
    {
        base64Data = base64Data || 4;
        var n = 0;
        for (var r = 0; r < base64Data; ++r) {
            n += arrURL[r], r < base64Data - 1 && (n <<= 8);
        }
        return n;
    },


    /**
     * Adds a node to the object
     *
     * @param {Object} object
     * @param {Ext.data.Model/Calc.service.skilltree.node.Model} node
     * @private
     */
    _pushNode: function(object, node)
    {
        var dn = node.get('dn');

        if (object[dn] == undefined)
        {
            object[dn] = {};
            object[dn].count = 0;
        }

        object[dn].desc = node.get('sd').join('\n');
        object[dn].icon = node.get('icon');

        object[dn].count++;
    },


    /**
     * Sorts an object
     *
     * @param {Object} object
     * @returns {Object}
     * @private
     */
    _sortObject: function(object)
    {
        var sortedKeys = [],
            sortedObj = {};

        for (var i in object) {
            sortedKeys.push(i);
        }
        sortedKeys.sort();

        for (var i in sortedKeys) {
            sortedObj[sortedKeys[i]] = object[sortedKeys[i]];
        }
        return sortedObj;
    }
});