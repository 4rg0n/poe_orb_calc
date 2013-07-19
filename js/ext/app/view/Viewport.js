/**
 * Viewport
 *
 * @class Calc.view.Viewport
 * @extends Ext.container.Viewport
 * @requires Calc.view.layout.TabPanel
 * @requires Calc.view.layout.MainMenu
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    requires: [
        'Calc.view.layout.TabPanel',
        'Calc.view.layout.MainMenu'
    ],

    layout: 'border',
    
    items: [{
        region: 'north',
        xtype: 'calc-main-menu'
    }, {
        region: 'center',
        xtype: 'calc-tabpanel'
    }]
});