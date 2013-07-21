/**
 * Orb Table
 *
 * @xtype calc-orb-grid
 *
 * @class Calc.view.orb.Grid
 * @extends Ext.grid.Panel
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.orb.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.calc-orb-grid',
    
    title: 'Orb Calculator Table',
    
    store: 'Orbs',
    
    columns: [{
        dataIndex: 'iconCls',
        width: 25,
        renderer: function(value) {
            return Ext.String.format('<div class="{1}{0}-16px {1}icon"></div>', value, Calc.cssPrefix);
        },
        tooltip: 'Icon of the orb'
    }, {
        text: 'Name',
        dataIndex: 'name',
        flex: 1,
        tooltip: 'Name of the orb'
    }, {
        text: 'Input Amount',
        editor: {
            xtype: 'numberfield',
            value: 0,
            minValue: 0
        },
        dataIndex: 'inputAmount',
        flex: 4,
        tooltip: 'The amount of orbs you want to calculate',
        tdCls: 'calc-input-cell'
    }, {
        text: 'Output Amount',
        dataIndex: 'outputAmount',
        renderer: function(value) {
            return Ext.Number.toFixed(value, 2);
        },
        flex: 3,
        tooltip: 'The result of the calculation... magic ^^'
    }, {
        text: 'Value',
        dataIndex: 'value',
        flex: 2,
        tooltip: 'The value used for calculation'
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
        xtype: 'container',
        dock: 'top',
        padding: 5,
        html: '<p><ul>' +
                '<li>Click on an "Input Amount" cell to input a value</li>' +
                '<li>Rightclick on an orb to open a chart</li>' +
              '</ul></p>' +
              'For concerns about orb values please leave comments on thread ' +
              '<a href="http://www.pathofexile.com/forum/view-thread/441192" target="_blank">441192</a>'
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        height: 50,
        items: [{
            xtype: 'tbfill'
        }, {
            text: '<b>Reset</b>',
            action: 'reset',
            width: 200
        },{
            xtype: 'tbfill'
        }]
    }]
});