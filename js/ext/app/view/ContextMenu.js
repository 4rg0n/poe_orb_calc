/**
 * Abstract Contextmenu class
 *
 * @class Calc.view.Contextmenu
 * @extends Ext.menu.Menu
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.ContextMenu', {
    extend: 'Ext.menu.Menu',

    /**
     * Contains the clicked record
     *
     * @cfg {Ext.data.Model} record
     */
    record: null,


    /**
     * Contains the clicked HTML Element
     *
     * @cfg {HTMLElement} htmlItem
     */
    htmlItem: null,


    /**
     * Returns the record
     *
     * @return {Ext.data.Model}
     */
    getRecord: function()
    {
        return this.record;
    },


    /**
     * Sets a new record
     *
     * @param {Ext.data.Model}
     */
    setRecord: function(record)
    {
        this.record = record;
    },


    /**
     * Sets a new HTML Element
     *
     * @param {HTMLElement}
     */
    setHtmlItem: function(htmlItem)
    {
        this.htmlItem = htmlItem;
    },


    /**
     * Returns the HTML Element
     *
     * @return {HTMLElement}
     */
    getHtmlItem: function()
    {
        return this.htmlItem;
    },


    /**
     * Reconfigurates the contextmenu
     *
     * @param {Object} config
     */
    setConfig: function(config)
    {
        Ext.apply(this, config);
    }
});