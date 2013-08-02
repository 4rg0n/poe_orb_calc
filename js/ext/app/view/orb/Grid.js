/**
 * Orb Table
 *
 * @xtype calc-orb-grid
 *
 * @class Calc.view.orb.Grid
 * @extends Ext.grid.Panel
 * @requires Calc.view.orb.InfoBox
 * @mixin Calc.library.mixin.tab.Tab
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.orb.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.calc-orb-grid',

    requires: [
        'Calc.view.orb.InfoBox'
    ],

    mixins: [
        'Calc.library.mixin.tab.Tab'
    ],

    tabId: 'calc-orb-grid',
    routeId: 'orb',

    title: Calc.Language.translate('Orb Calculator Table'),
    
    store: 'Orbs',
    
    columns: [{
        dataIndex: 'iconCls',
        width: 25,
        renderer: function(value) {
            return Ext.String.format('<div class="{1}{0}-16px {1}icon"></div>', value, Calc.cssPrefix);
        },
        tooltip: 'Icon of the orb'
    }, {
        text: Calc.Language.translate('name', null, true),
        dataIndex: 'name',
        flex: 1,
        tooltip: Calc.Language.translate('Name of the orb')
    }, {
        text: Calc.Language.translate('Input Amount'),
        editor: {
            xtype: 'numberfield',
            value: 0,
            minValue: 0
        },
        dataIndex: 'inputAmount',
        flex: 4,
        tooltip: Calc.Language.translate('The amount of orbs you want to calculate'),
        tdCls: Calc.cssPrefix + 'input-cell'
    }, {
        text: Calc.Language.translate('Output Amount'),
        dataIndex: 'outputAmount',
        renderer: function(value) {
            return Ext.Number.toFixed(value, 2);
        },
        flex: 3,
        tooltip: Calc.Language.translate('The result of the calculation... magic ^^')
    }, {
        text: Calc.Language.translate('value', null, true),
        editor: {
            xtype: 'numberfield',
            value: 0.0,
            minValue: 0.0
        },
        dataIndex: 'value',
        flex: 2,
        tooltip: Calc.Language.translate('The value used for calculation'),
        tdCls: Calc.cssPrefix + 'input-cell'
    }],
    
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    
    viewConfig: {
        markDirty: false
    },
    
    dockedItems: [{
        xtype: 'calc-orb-info-box',
        dock: 'top',
        padding: 5
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        height: 50,
        items: [{
            xtype: 'tbfill'
        }, {
            text: '<b>' + Calc.Language.translate('Reset Inputs') + '</b>',
            action: 'reset-inputs',
            width: 200
        }, {
            text: '<b>' + Calc.Language.translate('Reset Values') + '</b>',
            action: 'reset-values',
            width: 200
        }, {
            xtype: 'tbfill'
        }]
    }]
});