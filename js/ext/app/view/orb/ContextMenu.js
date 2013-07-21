/**
 * Orb Grid Contextmenu
 *
 * @xtype calc-orb-contextmenu
 *
 * @class Calc.view.orb.ContextMenu
 * @extends Calc.view.ContextMenu
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.orb.ContextMenu', {
    extend: 'Calc.view.ContextMenu',
    alias: 'widget.calc-orb-contextmenu',

    items: [{
        text: 'Show Chart',
        iconCls: 'calc-icon-bar-chart',
        action: 'show-bar-chart'
    }]
});
