/**
 * Main application
 *
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.application({
    name: 'Calc',
    autoCreateViewport: true,
    appFolder: 'js/ext/app',
    
    controllers: [
        'Orb',
        'PhysDmg'
    ],


    /**
     * init
     */
    init: function () {
        var me = this;
        
        Calc.app = me;
        Calc.cssPrefix = 'calc-';
    }
});