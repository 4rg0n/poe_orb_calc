/**
 * Tab Mixin
 *
 * @class Calc.library.mixin.tab.Tab
 * @uses Calc.library.exception.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.mixin.tab.Tab', {

    uses: [
        'Calc.library.mixin.tab.Exception'
    ],

    /**
     * true, to identify the class owning a tab mixin
     *
     * @property {Boolean} _isTab
     */
    _isTab: true,

    /**
     * Id of the route associated with this tab
     *
     * @cfg {String} routeId
     */
    routeId: '',

    /**
     * Id of the tab
     *
     * @cfg {String} tabId
     */
    tabId: '',

    /**
     * Associated record for this tab
     *
     * @cfg {Ext.data.Model} record
     */
    record: null,


    /**
     * Returns the tab id
     *
     * @throws {Calc.tab.Exception}
     * @returns {String}
     */
    getTabId: function()
    {
        if (Ext.isEmpty(this.tabId)) {
            throw new Calc.tab.Exception('Tab must have an id');
        }

        return this.tabId;
    },


    /**
     * Returns the route id
     *
     * @returns {String}
     */
    getRouteId: function()
    {
        return this.routeId;
    },


    /**
     * Returns the record
     *
     * @returns {Ext.data.Model}
     */
    getRecord: function()
    {
        return this.record;
    }
});