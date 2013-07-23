/**
 * Service Container
 *  
 * @singleton 
 *  
 * @class Calc.library.service.Service
 * @requires Calc.library.service.Store
 * @alternateClassName Calc.Service
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.service.Service', {
    alternateClassName: 'Calc.Service',
    
    requires: [
        'Calc.library.service.ControllerInjection',
        'Calc.library.service.Store'
    ],
    
    singleton: true,
    
    /**
     * @cfg {String/Ext.data.Store} store
     */
    store: 'Calc.library.service.Store',
    
    /**
     * @cfg {String/Ext.data.Model} model
     */
    model: 'Calc.library.service.Model',

    /**
     * @cfg {String} modul
     */
    modul: 'service',
    
    
    constructor: function()
    {
        this.store = Ext.create(this.store);
    },

    /**
     * Adds services to collection
     *
     * @param {Object} services
     *
     * @example
     *
     *  addAll({
     *      image: 'Utmt.service.Image',
     *      foo: 'Bar',
     *      bar: {
     *          className: 'Foo',
     *          config: {
     *              id: 'bla',
     *              //...
     *          },
     *          scope: this
     *      }
     *  });
     *
     *
     */
    addAll: function(services) {

        var me = this;

        if (Ext.isObject(services)) {
            Ext.Object.each(services, function(key, value) {
                if (Ext.isObject(value)) {
                    me.add(key, value.className, value.config, value.scope);
                } else {
                    me.add(key, value);
                }
            });
        }
    },


    /**
     * Adds a service class to collection
     *
     * @chainable
     * @param {String} key
     * @param {String} className
     * @param {Object} [config]
     * @param {*} [scope]
     * @return {Utmt.library.service.Service}
     */
    add: function(key, className, config, scope)
    {
        var config = config || null,
            scope = scope || null,
            serviceModel;

        if (false === this.has(key, scope)) {
            

            serviceModel = Ext.create(this.model);
            
            className = this.buildClassName(className);
            
            Ext.require(className);
            
            serviceModel.set({
                key: key,
                className: className,
                scope: scope,
                config: config
            })
            
            this.getStore().add(serviceModel);
        }

        return this;
    },

    /**
     * Checks whether an instance of this service is available
     *
     * @param {String} key
     * @param {Mixed} [scope]
     * @returns {Boolean}
     */
    has: function(key, scope) {

        var servicesByKey = this.findAllByKey(key);

        if (scope) {
            var servicesByScope = this.findAllByScope(scope);

            return Ext.Array.contains(servicesByKey, servicesByScope);
        } else {
            if (servicesByKey.length > 0) {
                return true
            }
        }

        return false;
    },


    /**
     * Returns all records with that key
     *
     * @param {String} key
     * @return {Utmt.library.service.Model[]}
     */
    findAllByKey: function(key)
    {
        var records = [];

        this.getStore().each(function(record) {
            if (record.get('key') === key) {
                Ext.Array.push(records, record);
            }
        });

        return records;
    },


    /**
     * Returns all records with that scope
     *
     * @param {Mixed} scope
     * @return {Utmt.library.service.Model[]}
     */
    findAllByScope: function(scope) {
        var records = [];

        this.getStore().each(function(record) {
            if (record.get('scope') === scope) {
                Ext.Array.push(records, record);
            }
        });

        return records;
    },



    /**
     * Instanciate a service from model
     *
     * @param {Utmt.library.service.Model} model
     * @return {Mixed}
     */
    create: function(model) {
        var className = model.get('className'),
            config = model.get('config'),
            instance;
        
        instance = Ext.create(className, config);    
        
        model.set('service', instance);
        model.set('isInstanciated', true);
        
        instance.model = model;
        
        return instance;
    },
    
    
    /**
     * Builds the classname
     * 
     * @param {String} className
     * @return {String}
     */
    buildClassName: function(className)
    {
        var prefix = this.getNamespace(),
            regex = new RegExp('^(.*)\.' + this.modul + '\.');
            
        if (prefix !== Ext.Loader.getPrefix(className) && !className.match(regex)) {
            className = prefix + '.' + this.modul + '.' + className;
        }
        
        return className;
    },


    /**
     * Clears collection
     */
    clear: function() {
        this.getStore().removeAll();
    },


    /**
     * Returns the Namespace (Calc)
     *
     * @return {String}
     */
    getNamespace: function()
    {
        var className = Ext.getClassName(this);

        return Ext.Loader.getPrefix(className);
    },


    /**
     * Returns the store
     *
     * @return {Ext.data.Store/Calc.library.service.Store}
     */
    getStore: function()
    {
        return this.store;
    },


    /**
     * Returns a service.
     * Instanciates a services if it wasn't instanciated already.
     *
     * @param {String} key
     * @param {Mixed} [scope]
     * @param {Boolean} [forceScope=false] force search with scope
     * @return {Mixed}
     */
    getService: function(key, scope, forceScope)
    {
        var service = null,
            forceScope = forceScope || false;
        
        if (scope) {
            serviceModel = this.find(key, scope);
        }
        
        if (false === forceScope) {
            serviceModel = this.getByKey(key);
        } 
        
        if (!serviceModel) {
            console.warn(Language.translate('Service "{0}" not found.', [key]));
            return null;
        }
        
        //Service already instanciated?
        if (false === serviceModel.isInstanciated()) {
            service = this.create(serviceModel);
        } else {
            service = serviceModel.get('service');
        }

        return service;
    },
    
    
    /**
     * Shortcut for getService()
     *
     * @param {String} key
     * @param {Mixed} [scope]
     * @param {Boolean} [forceScope=false]
     * @return {Mixed}
     */
    get: function(key, scope, forceScope)
    {
        return this.getService(key, scope, forceScope);
    },


    /**
     * Returns a record by searching it via key
     *
     * @param {String} key
     * @return {Calc.library.service.Model/Ext.data.Model}
     */
    getByKey: function(key)
    {
        var result = null;

        this.getStore().each(function(record) {
            if (record.get('key') === key && !record.get('scope')) {
                result = record;
                return false; //break
            }
        });

        return result;
    },


    /**
     * Finds a record with key and scope
     *
     * @param {String }key
     * @param {Mixed} scope
     * @return {Calc.library.service.Model/Ext.data.Model}
     */
    find: function(key, scope)
    {
        var result = null;

        this.getStore().each(function(record) {
            if (record.get('key') === key && record.get('scope') === scope) {
                result = record;
                return false; //break
            }
        });

        return result;
    }
});
