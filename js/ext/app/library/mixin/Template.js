/**
 * Template Interface
 *
 * @class Calc.library.mixin.Template
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.mixin.Template', {

    /**
     * Tells whether this component uses a template
     *
     * @property {Boolean} isTemplate
     */
    isTemplate: true,

    /**
     * Holds template data
     *
     * @property {Object} data
     */
    data: null,


    /**
     * Sets data
     *
     * @param {Object} data
     * @param {Boolean} load
     */
    setData: function(data, load)
    {
        if (Ext.isObject(data)) {
            this.data = data;

            if (load) {
                this.loadTemplate();
            }
        }
    },


    /**
     * Returns data
     *
     * @return {Object}
     */
    getData: function()
    {
        return this.data;
    },


    /**
     * Clears Data
     *
     * @param {Boolean} load
     */
    clearData: function(load)
    {
        this.data = null;

        if (true === load) {
            this.loadTemplate();
        }
    },


    /**
     * Loads data into template
     *
     * @return {Boolean}
     */
    loadTemplate: function()
    {
        var loader = this.getLoader();

        if (loader) {
            loader.load();
            return true;
        }

        return false;
    },


    /**
     * Shortcut for loadTemplate()
     *
     * @return {Boolean}
     */
    load: function()
    {
        return this.loadTemplate();
    }
});
