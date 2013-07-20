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

    title: 'DPS Calculator',

    bodyPadding: 10,

    items: [{
        xtype: 'fieldset',
        title: 'Formula',
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
        title: 'Calculator',
        defaultType: 'textfield',

        items: [{
            name: 'physical-damage',
            fieldLabel: 'Physical damage',
            emptyText: '0-0',
            maskRe: /[\d+\-]/,
            regex: /^\d+-\d+$/,
            regexText: 'Input format e.g.: 10-51',
            allowBlank: false
        }, {
            name: 'attack-speed',
            emptyText: '0.00',
            fieldLabel: 'Attack speed',
            maskRe: /[\d+\.]/,
            regex: /^\d+.\d+/,
            regexText: 'Input format e.g.: 1.25',
            allowBlank: false
        }, {
            xtype: 'tbspacer',
            height: 20
        }, {
            name: 'result',
            emptyText: '0',
            fieldLabel: 'DPS',
            readOnly: true
        }]

    }, {
        xtype: 'button',
        text: 'Reset',
        action: 'reset',
        minWidth: 100
    }]
});