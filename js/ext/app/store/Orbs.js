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
        url: 'js/ext/app/data/orbs.json',
        reader: {
            type: 'json',
            root: 'orbs'
        }
    }
});