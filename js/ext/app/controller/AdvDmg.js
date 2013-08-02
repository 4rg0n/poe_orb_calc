/**
 * Advanced Damage Controller
 *
 * @class Calc.controller.AdvDmg
 * @extends Calc.controller.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.AdvDmg', {
    extend: 'Calc.controller.Abstract',

    views: [
        'adv-dmg.Form'
    ],


    /**
     * Opens the advanced damage form
     *
     * @param {Calc.library.routing.Request} request
     */
    openRoute: function(request)
    {
        this.open()
    },


    /**
     * Opens the advanced damage form
     */
    open: function()
    {
        var advDmgForm = this.getView('adv-dmg.Form').create();
        this.getTabPanel().addTab(advDmgForm);
    }
});