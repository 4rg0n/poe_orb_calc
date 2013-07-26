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
        'Orb',
        'PhysDmg',
        'MainMenu',
        'SkillTree'
    ],


    init: function()
    {
        Calc.app = this;
    },

    launch: function()
    {
        //TODO Bessere Lösung finden
        Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
            maxWidth: 200,
            minWidth: 100
        });

        Ext.create('Calc.view.Viewport');
    }
});