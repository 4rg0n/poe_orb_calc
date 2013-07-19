/**
 * Main menu
 *
 * @xtype calc-main-menu
 *
 * @class Calc.view.layout.MainMenu
 * @extends Ext.toolbar.Toolbar
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.layout.MainMenu', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.calc-main-menu',

    id: 'calc-main-menu',

    items: [{
        text: 'Forum Post',
        href: 'http://www.pathofexile.com/forum/view-thread/441192'
    }, {
        text: 'GitHub',
        href: 'https://github.com/4rg0n/poe_orb_calc'
    }]

});