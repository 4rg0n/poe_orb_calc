/**
 * Orb Store
 *
 * @class Calc.store.Orbs
 * @extends Ext.data.Store
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.store.Orbs', {
    extend: 'Ext.data.Store', 
    
    model: 'Calc.model.Orb',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: Calc.appFolder + '/data/orbs.json',
        reader: {
            type: 'json',
            root: 'orbs'
        }
    },

    /**
     * Calculates the output values
     */
    calculate: function()
    {
        var me = this,
            output = 0,
            result = 0,
            exceptions,
            exceptionValue = 1;

        me.each(function(record) {

            output = 0;
            exceptions = record.get('exceptions');

            me.each(function(record) {

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
    }
});