/**
 * Orb Model
 *
 * @class Calc.model.Orb
 * @extends Ext.data.Model
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.model.Orb', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'id', type: 'string'}, 
        {name: 'name', type: 'string'},
        {name: 'value', type: 'float'},
        {name: 'originalValue', type: 'float'},
        {name: 'inputAmount', type: 'int', defaultValue: 0},
        {name: 'outputAmount', type: 'float', defaultValue: 0.0},
        {name: 'exceptions', type: 'auto', defaultValue: {}},
        {name: 'iconCls', type: 'string'}
    ],


    /**
     * Checks if the orb has any exceptions
     *
     * @returns {Boolean}
     */
    hasExceptions: function()
    {
        return !Ext.Object.isEmpty(this.get('exceptions'));
    },


    /**
     * Returns the value of an exception
     *
     * @param {String} id
     * @returns {Number}
     */
    getException: function(id)
    {
        return this.get('exceptions')[id];
    }
});