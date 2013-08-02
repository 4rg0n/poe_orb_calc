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
        'Calc.view.skilltree.Form',
        'Calc.library.exception.Exception'
    ],
    
    id: 'calc-tabpanel',
    alias: 'widget.calc-tabpanel',

    tabMixinClassName: 'Calc.library.mixin.tab.Tab',

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
     * init
     *
     * adds listeners to the tabpanel
     */
    initComponent: function()
    {
        this.addListener('tabchange', this.changeTab);
        this.callParent();
    },

    
    /**
     * Executes before a tab is added to the tabpanel
     * Checks if the tab already exists in the tabpanel
     * If it exist, it will be activated and not added again
     *
     * Also checks if the component has the tab mixin
     *
     * @param {Calc.view.layout.TabPanel} tabpanel
     * @param {Ext.Component/Calc.library.mixin.tab.Tab} component
     * @throws {Calc.Exception}
     * @returns {Boolean}
     */
    addTab: function(component)
    {
        var tabId = null;

        if (component._isTab) {

            try {
                tabId = component.getTabId();
            } catch(err) {
                throw err;
            }

            if (this.hasTab(tabId)) {
                this.setActiveTab(this.getTab(tabId));
                return false;
            }

        } else {
            throw new Calc.Exception(
                Ext.String.format('Component must implement mixin "{0}".', this.tabMixinClassName)
            );

            return false;
        }
        
        this.add(component);
        this.setActiveTab(component);
    },
 


    /**
     * Executes when active tab is changing
     * Changes the URI
     *
     * @param {Calc.view.layout.TabPanel} tabpanel
     * @param {Ext.Component/Calc.library.mixin.tab.Tab} newTab
     * @param {Ext.Component/Calc.library.mixin.tab.Tab} oldTab
     */
    changeTab: function(tabpanel, newTab, oldTab)
    {
        console.log(newTab.getTabId(), newTab.getRouteId());
    },

    
    /**
     * Checks if the tab is present in the tabpanel
     * 
     * @param {String/Ext.Component/Calc.library.mixin.tab.Tab} key - the component or the tabId of the component
     * @return {Boolean}
     */
    hasTab: function(key)
    {
        if (Ext.isString(key)) {
            return !Ext.isEmpty(this.getTab(key));
        }

        if (Ext.isObject(key) && key.isComponent && key._isTab) {
            return !Ext.isEmpty(this.getTab(key.getTabId()));
        }

        return false;
    },
    
    
    /**
     * Returns the tab with the given tabId
     * 
     * @param {String} tabId
     * @return {Ext.tab.Tab}
     */
    getTab: function(tabId)
    {
        var tab = null;

        this.items.findBy(function(item, key) {
            if (item.getTabId() == tabId) {
                tab =  item;
                return false;
            }
        });

        return tab;
    }
});