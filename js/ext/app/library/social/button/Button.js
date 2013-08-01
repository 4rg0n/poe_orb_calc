/**
 * Basic Social Media Button
 *
 * @class Calc.library.social.button.Button
 * @extends Ext.container.Container
 * @mixin Calc.library.mixin.Template
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.social.button.Button', {
    extend: 'Ext.container.Container',
    
    mixins: [
        'Calc.library.mixin.Template'
    ],
    
    styleHtmlContent: true,
    
    loader: {
        renderer: Calc.XTemplateRenderer.loader,
        autoLoad: true
    },
    
    /**
     * Path to button HTML
     * 
     * @cfg {String} tplPath
     */
    tplPath: '',
    
    constructor: function(config)
    {
        Ext.apply(this, config);
        
        //Setting path to loader =D
        this.loader.url = this.tplPath;
        
        this.callParent(config);
    }
});