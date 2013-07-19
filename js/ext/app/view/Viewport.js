/**
 * Viewport
 *
 * @class Calc.view.Viewport
 * @extends Ext.container.Viewport
 * @requires Calc.view.layout.TabPanel
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    requires: [
        'Calc.view.layout.TabPanel'
    ],
    
    
    layout: 'border',
    
    items: [{
        region: 'center',
        xtype: 'calc-tabpanel'
    }]
});