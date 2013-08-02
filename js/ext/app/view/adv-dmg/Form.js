/**
 * Advanced Damage Form
 *
 * @xtype calc-adv-dmg-form
 *
 * @class Calc.view.adv-dmg.Form
 * @extends Ext.panel.Panel
 * @mixin Calc.library.mixin.tab.Tab
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.adv-dmg.Form', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.calc-adv-dmg-form',

    mixins: [
        'Calc.library.mixin.tab.Tab'
    ],

    tabId: 'calc-adv-dmg-form',
    routeId: 'adv-dmg',

    closable: false,
    
    title: Calc.Language.translate('Advanced DPS Calculator'),
    
    html: 'coming soon...'
})