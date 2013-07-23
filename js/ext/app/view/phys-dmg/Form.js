/**
 * Physical Damage Formular (DPS)
 *
 * @xtype calc-phys-dmg-form
 *
 * @class Calc.view.phys-dmg.Form
 * @extends Ext.form.Panel
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.phys-dmg.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.calc-phys-dmg-form',

    title: Calc.Language.translate('Simple DPS Calculator'),

    bodyPadding: 10,

    items: [{
        xtype: 'fieldset',
        title: Calc.Language.translate('formula', null, true),
        collapsible: true,
        collapsed: true,

        items: [{
            xtype: 'container',
            itemId: 'formula',
            styleHtmlContent: true,
            margin: 5,
            tpl: '<b>DPS</b> = ({fromDmg} + {toDmg}) / 2 * {attackSpeed}',

            data: {
                fromDmg: 0,
                toDmg: 0,
                attackSpeed: 0.0
            }
        }]
    }, {
        xtype: 'fieldset',
        title: Calc.Language.translate('calculator', null, true),
        defaultType: 'textfield',

        items: [{
            name: 'physical-damage',
            fieldLabel: Calc.Language.translate('physical damage', null, true),
            emptyText: '0-0',
            maskRe: /[\d+\-]/,
            regex: /^\d+-\d+$/,
            regexText: Calc.Language.translate('input format e.g.: {0}', ['10-51'], true),
            allowBlank: false
        }, {
            name: 'attack-speed',
            emptyText: '0.00',
            fieldLabel: Calc.Language.translate('attack speed', null, true),
            maskRe: /[\d+\.]/,
            regex: /^\d+.\d+/,
            regexText: Calc.Language.translate('input format e.g.: {0}', ['1.25'], true),
            allowBlank: false
        }, {
            xtype: 'tbspacer',
            height: 20
        }, {
            name: 'result',
            emptyText: '0',
            fieldLabel: Calc.Language.translate('DPS'),
            readOnly: true
        }]

    }, {
        xtype: 'button',
        text: Calc.Language.translate('reset', null, true),
        action: 'reset',
        minWidth: 100
    }]
});