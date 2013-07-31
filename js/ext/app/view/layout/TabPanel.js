/**
 * Main tabpanel
 *
 * @xtype calc-tabpanel
 *
 * @class Calc.view.layout.TabPanel
 * @extends Ext.tab.Panel
 * @uses Calc.view.orb.Grid
 * @uses Calc.view.phys-dmg.Form
 * @uses Calc.view.adv-dmg.Form
 * @uses Calc.view.skilltree.For
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.layout.TabPanel', {
    extend: 'Ext.tab.Panel',
    
    uses: [
        'Calc.view.orb.Grid',
        'Calc.view.phys-dmg.Form',
        'Calc.view.adv-dmg.Form',
        'Calc.view.skilltree.Form'
    ],
    
    id: 'calc-tabpanel',
    alias: 'widget.calc-tabpanel',
    
    
    
    items: [{
        xtype: 'calc-orb-grid'
    }, {
        xtype: 'calc-phys-dmg-form'
    }, {
        xtype: 'calc-adv-dmg-form'
    }, {
        xtype: 'calc-skilltree-form'
    }],
    
    
    /**
     * Adds a tab to the tab panel
     * If the tab is already present, it will be activated instead.
     * 
     * @param {Ext.Component} component
     */
    addTab: function(component)
    {
        
    },
    
    
    /**
     * Checks if the tab is present in the tabpanel
     * 
     * @param {String/Ext.Component} key - the component or the tabId of the component
     * @return {Boolean}
     */
    hasTab: function(key) 
    {
        
    },
    
    
    /**
     * Returns the tab with the given tabId
     * 
     * @param {String} tabId
     * @return {Ext.tab.Tab}
     */
    getTab: function(tabId)
    {
        
    }
});