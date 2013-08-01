/**
 * Main application
 *
 * @author Arg0n <argonthechecker@gmail.com>
 */

//TODO Besser machen?!
var Calc = Calc || {};

Calc.cssPrefix = 'calc-';
Calc.appFolder = 'js/ext/app';
Calc.resourcesFolder = 'js/ext/resources';

Ext.application({
    
    requires: [

        //Singletons
        'Calc.library.error.ErrorManager',
        'Calc.library.Base64',
        'Calc.library.language.Language',
        'Calc.library.service.Service',
        'Calc.library.util.XTemplateRenderer'
    ],
    
    uses: [
        'Calc.view.Viewport'
    ],

    name: 'Calc',
    autoCreateViewport: false,
    appFolder: Calc.appFolder,
    
    controllers: [
        'Error',
        'Orb',
        'PhysDmg',
        'MainMenu',
        'SkillTree'
    ],
    
    constructor: function()
    {
        Ext.Error.handle = this.onError;
        
        this.callParent();
    },
    
    init: function()
    {
        Calc.app = this;
    },

    launch: function()
    {
        //TODO Bessere Lösung finden
        //Fixes autoWidth from tooltips... dirty one ^^
        delete Ext.tip.Tip.prototype.minWidth;

        Ext.create('Calc.view.Viewport');
    },
    
    
    onError: function(err)
    {
        console.log('muuuuuuuuuuuh');
        
        if (Ext.isString(err)) {
            
        }
        
        if (err instanceof Ext.Error) {
            
        }
        
        if (err instanceof Calc.library.exception.Exception)
        {
            err.log();
        }
        
        if (err instanceof Error)
        {
            
        }
        
        return true;
    }
});


