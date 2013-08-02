/**
 * Adds methods to Ext.Object
 *
 * @class Calc.library.Object
 * @overrides Ext.Object
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.override.Object', {
    override: 'Ext.Object',


    /**
     * Returns the value of an object
     *
     * @param {Object} object
     * @param {String} field
     * @return {*}
     */
    getValue: function(object, field) {

        if (object.hasOwnProperty(field)) {
            return object[field];
        }

        return null;
    },


    /**
     * Checks whether the object has the field
     *
     * @param {Object} object
     * @param {String} field
     * @return {Boolean}
     */
    hasField: function(object, field) {
        return object.hasOwnProperty(field);
    },


    /**
     * Checks whether the object has the field
     *
     * @param {Object} object
     * @param {String} key
     * @return {Boolean}
     */
    hasKey: function(object, key) {
        return this.hasField(object, key);
    },


    /**
     * Maps and filters an object
     *
     * @param {Object/Object[]} objects
     * @param {Object} map
     * @return {Object}
     */
    map: function(objects, map) {

        var newObject = {},
            objectArray = [];

        if (false === Ext.isArray(objects)) {
            objects = [objects];
        }

        Ext.Array.each(objects, function(object) {
            if (Ext.isObject(object)) {

                newObject = {};

                Ext.Object.each(object, function(field, value) {

                    if (Ext.Object.hasField(map, field)) {
                        if (Ext.Object.getValue(map, field) === true) {
                            newObject[field] = value;
                        } else {
                            newObject[Ext.Object.getValue(map, field)] = value;
                        }
                    }
                }, this);

                objectArray.push(newObject);
            }


        }, this);

        if (objectArray.length > 1) {
            return objectArray;
        } else {
            return objectArray[0];
        }
    },


    /**
     * Shallow compares the contents of 2 objects using strict equality. Objects are
     * considered equal if they both have the same set of properties and the
     * value for those properties equals the other in the corresponding object.
     *
     *     // Returns true
     *     Ext.Object.equals({
     *         foo: 1,
     *         bar: 2
     *     }, {
     *         foo: 1,
     *         bar: 2
     *     });
     *
     * @param {Object} object1
     * @param {Object} object2
     * @return {Boolean} `true` if the objects are equal.
     */
    equals: function(object1, object2)
    {
        var check = function(o1, o2) {
            var key;

            for (key in o1) {
                if (o1.hasOwnProperty(key)) {
                    if (o1[key] !== o2[key]) {
                        return false;
                    }
                }
            }
            return true;
        };

        // Short circuit if the same object is passed twice
        if (object1 === object2) {
            return true;
        } if (object1 && object2) {
            // Do the second check because we could have extra keys in
            // object2 that don't exist in object1.
            return check(object1, object2) && check(object2, object1);
        } else if (!object1 && !object2) {
            return object1 === object2;
        } else {
            return false;
        }
    },


    /**
     * Returns the amount of elments in an object
     *
     * @param {Object} object
     * @return {Number}
     */
    count: function(object)
    {
        var i = 0;

        this.each(object, function() {i++});

        return i;
    },


    /**
     * Reverses an object
     *
     * @param {Object} object
     * @return {Object}
     */
    reverse: function(object)
    {
        var reversed = {},
            keys = [];

        for (var k in object) {
            keys.unshift(k);
        }

        for (var c = keys.length,  n = 0; n < c; n++) {
            reversed[keys[n]] = object[keys[n]];
        }

        return reversed;
    }
});