/**
 * Orb Controller
 *
 * @class Calc.controller.Orb
 * @extends Calc.controller.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.Orb', {
    extend: 'Calc.controller.Abstract',

    models: [
        'Orb'
    ],
    
    stores: [
        'Orbs'
    ],
    
    views: [
        'orb.Grid'
    ],
    
    refs: [{
        ref: 'orbGrid',
        selector: 'calc-orb-grid'
    }],


    /**
     * init
     */
    init: function()
    {
        this.control({
            'calc-orb-grid': {
                edit: this.calculate
            },
            'calc-orb-grid button[action="reset"]': {
                click: this.reset
            }         
        });
    },


    /**
     * Calculates the output values
     *
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e
     */
    calculate: function(editor, e) 
    {
        var grid = e.grid,
            store = grid.getStore(),
            output = 0,
            result = 0,
            exceptions,
            exceptionValue = 1;
         
        store.each(function(record) {
            
            output = 0;
            exceptions = record.get('exceptions');
            
            store.each(function(record) {

                //Does the orb has an exception?
                if (exceptions.hasOwnProperty(record.getId())) {
                    exceptionValue = exceptions[record.getId()];
                } else {
                    exceptionValue = 1;
                }
                 
                output += record.get('inputAmount') * record.get('value') * exceptionValue;
            });
             
            result = output / record.get('value');
            record.set('outputAmount', result)
        });
    },


    /**
     * Resets all values
     */
    reset: function()
    {
        var store = this.getOrbsStore();
        
        store.each(function(record) {
            record.set('inputAmount', 0);
            record.set('outputAmount', 0);
        });
    }  
});