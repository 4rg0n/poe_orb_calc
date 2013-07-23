/**
 * Main application
 *
 * @author Arg0n <argonthechecker@gmail.com>
 */

//TODO Besser machen?!
var Calc = {};

Calc.cssPrefix = 'calc-';
Calc.appFolder = 'js/ext/app';

Ext.application({
    
    uses: [
        'Calc.view.Viewport'
    ],
    
    requires: [

        //Singletons
        'Calc.library.language.Language',
        'Calc.library.util.XTemplateRenderer'
    ],

    name: 'Calc',
    autoCreateViewport: false,
    appFolder: Calc.appFolder,
    
    controllers: [
        'Orb',
        'PhysDmg'
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