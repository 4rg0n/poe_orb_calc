/**
 * Abstract Controller
 *
 * @class Calc.controller.Abstract
 * @extends Ext.app.Controller
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.Abstract', {
    extend: 'Ext.app.Controller',
    
    getTabPanel: function()
    {
        return Ext.getCmp('calc-tabpanel');
    }
    
});