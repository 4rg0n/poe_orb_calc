/**
 * Orb Controller
 *
 * @class Calc.controller.Orb
 * @extends Calc.controller.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.Orb', {
    extend: 'Calc.controller.Abstract',

    models: [
        'Orb'
    ],
    
    stores: [
        'Orbs'
    ],
    
    views: [
        'orb.Grid',
        'orb.ContextMenu',
        'orb.ChartWindow'
    ],
    
    refs: [{
        ref: 'orbGrid',
        selector: 'calc-orb-grid'
    }, {
        ref: 'orbChartWindow',
        selector: 'calc-orb-chart-window'
    }],


    /**
     * init
     */
    init: function()
    {
        this.control({
            'calc-orb-grid': {
                edit: this.calculate,
                itemcontextmenu: this.showContextMenu
            },
            'calc-orb-grid button[action="reset-inputs"]': {
                click: this.resetInputs
            },
            'calc-orb-grid button[action="reset-values"]': {
                click: this.resetValues 
            },

            'calc-orb-contextmenu menuitem[action="show-bar-chart"]': {
                click: this.showBarChart
            }
        });
    },


    /**
     * Calculates the output values
     *
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e
     */
    calculate: function(editor, e) 
    {
        var grid = e.grid,
            store = grid.getStore();

        store.calculate();
    },


    /**
     * Resets all inputs
     */
    resetInputs: function()
    {
        var store = this.getOrbsStore();
        
        store.each(function(record) {
            record.set('inputAmount', 0);
            record.set('outputAmount', 0);
        });
    },


    /**
     * Resets all values
     */
    resetValues: function()
    {
        var store = this.getOrbsStore();

        store.each(function(record) {
            record.set('value', record.get('originalValue'));
        });
    },


    /**
     * Opens a contextmenu on the clicked record
     *
     * @param {Ext.view.View} gridView
     * @param {Ext.data.Model} record
     * @param {HTMLElement} htmlItem
     * @param {Number} index
     * @param {Ext.EventObject} event
     */
    showContextMenu: function(gridView, record, htmlItem, index, event)
    {
        var cm = this.getView('orb.ContextMenu').create({
            record: record
        });

        event.stopEvent();

        cm.showAt(event.getXY());
    },


    /**
     * Opens a window with the bar shart of this orb
     *
     * @param {Ext.menu.Item} menuItem
     */
    showBarChart: function(menuItem)
    {
        var record = menuItem.parentMenu.getRecord(),
            chartWindow = this.getView('orb.ChartWindow').create({
                store: 'Calc.store.Orbs',
                orb: record
            });

        chartWindow.calculate(function() {
            chartWindow.show();
        });
    }
});