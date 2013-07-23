/**
 * Main application
 *
 * @author Arg0n <argonthechecker@gmail.com>
 */

//TODO Besser machen?!
var Calc = Calc || {};

Calc.cssPrefix = 'calc-';
Calc.appFolder = 'js/ext/app';

Ext.application({
    
    requires: [

        //Singletons
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
        'MainMenu'
    ],


    init: function()
    {
        Calc.app = this;
    },

    launch: function()
    {
        Ext.create('Calc.view.Viewport');
    }
});