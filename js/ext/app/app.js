/**
 * Main application
 *
 * @author Arg0n <argonthechecker@gmail.com>
 */

var Calc = Calc || {};
(function()  {

    Ext.apply(Calc, {
        cssPrefix: 'calc-',
        appFolder:'js/ext/app',
        resourcesFolder: 'js/ext/resources'
    });


    /**
     * Reads the current environment from script src hash
     *
     * @returns {String}
     */
    Calc.getEnv = function()
    {
        var el = document.getElementById('calc-app'),
            env = 'prod';

        if (el) {
            env = el.attributes.getNamedItem('src').value.split('#')[1] || env;
        }

        return env;
    }

    Calc.env = Calc.getEnv();
}());

Ext.application({
    
    paths: {
        'Ext.ux': 'js/ext/ux'
    },
    
    requires: [

        //Overrides
        'Calc.library.override.Object',
        'Calc.library.override.Array',

        //Singletons
        'Calc.library.error.ErrorManager',
        'Calc.library.Base64',
        'Calc.library.language.Language',
        'Calc.library.service.Service',
        'Calc.library.routing.Routing',
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
        'SkillTree',
        'AdvDmg',
        'Routing'
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
        
        Calc.Routing.init(function(success) {

            try {
                var request = Calc.Routing.getRequest();

                Calc.Routing.execRequest(request);
            } catch (err) {

                Calc.ErrorManager.log(err);
            }
        });
    },
    
    
    onError: function(err)
    {
        
    }
});




