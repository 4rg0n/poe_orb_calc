/**
 * Window for Errors
 *
 * @xtype calc-error-window
 *
 * @class Calc.view.error.Window
 * @extends Ext.window.Window
 * @mixin Calc.library.mixin.Template
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.error.Window', {
    extend: 'Ext.window.Window',
    
    mixins: [
        'Calc.library.mixin.Template'
    ],
    
    
    /**
     * Error type
     * 
     * @cfg {Number} type  
     */
    type: null,
    
    iconCls: 'icon-error',

    alias: 'widget.calc-error-window',
    itemId: 'calc-error-window',
    
    autoScroll: true,
    
    closable: true,
    closeAction: 'hide',
    modal: true,

    loader: {
        url: Calc.appFolder + 'template/error/Error.html',
        renderer: Calc.XTemplateRenderer.loader
    },
    
    styleHtmlContent: true,
    bodyPadding: 10,
    maxHeight: 600,
    maxWidth: 800,
    
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
            
            Ext.apply(this, data);
            
            if (data.title) {
                this.setTitle(data.title);
            } else {
                this.setTitle(Language.translate('Error'));
            }
            
            if (data.type) {
                this.setType(data.type);
            }

            if (load) {
                this.loadTemplate();
            }
        }
    },
    
    
    /**
     * Sets error type
     * 
     * @param {Number} type
     */
    setType: function(type)
    {
        this.type = type;
        
        this.updateLoaderUrl();
    },
    
    
    /**
     * Initialise loader URL
     */
    updateLoaderUrl: function()
    {
        if (this.isUnknown) {
            this.loader.url = Calc.appFolder + '/template/error/Error.html';
            return;
        }
        
        if (this.type) {
            this.getLoader().url = Calc.appFolder + '/template/error/' + this.type + '.html';
        }
    }
});