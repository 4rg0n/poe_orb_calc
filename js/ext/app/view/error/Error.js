/**
 * Error Panel
 *
 * @xtype calc-error-erro
 *
 * @class Calc.view.error.Error
 * @extends Ext.panel.Panel
 * @mixin Calc.library.mixin.Template
 * @mixin Calc.library.mixin.tab.Tab
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.error.Error', {
    extend: 'Ext.panel.Panel',
    
    mixins: [
        'Calc.library.mixin.Template',
        'Calc.library.mixin.tab.Tab'
    ],
    
    type: null,
    
    header: false,
    
    iconCls: Calc.cssPrefix + 'icon-error',

    alias: 'widget.calc-error-error',
    tabId: 'calc-error-error',
    

    title: Language.translate('Error'),

    loader: {
        url: Calc.appFolder + '/template/error/Error.html',
        renderer: Calc.XTemplateRenderer.loader
    },
    
    styleHtmlContent: true,
    autoScroll: true,
    
    
    /**
     * Sets data for template
     * Oberwrites Calc.library.mixin.Template.setData()
     *
     * @param {Object} data
     * @param {Boolean} load
     */
    setData: function(data, load)
    {
        if (Ext.isObject(data)) {
            this.data = data;
            
            this.setTitle(data.title);

            if (load) {
                this.loadTemplate();
            }
        }
    },
    
    
    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function(config)
    {
        Ext.apply(this, config);
        
        this.initLoaderUrl();
        
        this.callParent(arguments);
    },
    
    
    /**
     * Initialise loader URL
     */
    initLoaderUrl: function()
    {
        //Unbekannter Fehler?
        if (this.isUnknown) {
            this.loader.url = Calc.appFolder + '/template/error/Error.html';
            return;
        }
        
        if (this.type) {
            this.loader.url = Calc.appFolder +'/template/error/' + this.type + '.html';
        }
    }
});