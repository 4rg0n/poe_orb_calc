/**
 * Main tabpanel
 *
 * @xtype calc-tabpanel
 *
 * @class Calc.view.layout.TabPanel
 * @extends Ext.tab.Panel
 * @requires Calc.view.orb.Grid
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.layout.TabPanel', {
    extend: 'Ext.tab.Panel',
    
    requires: [
        'Calc.view.orb.Grid',
        'Calc.view.phys-dmg.Form',
        'Calc.view.adv-dmg.Form'
    ],
    
    id: 'calc-tabpanel',
    alias: 'widget.calc-tabpanel',
    
    
    
    items: [{
        xtype: 'calc-orb-grid'
    }, {
        xtype: 'calc-phys-dmg-form'
    }, {
        xtype: 'calc-adv-dmg-form'
    }]
});