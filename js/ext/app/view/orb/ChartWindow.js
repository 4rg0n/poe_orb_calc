/**
* Orb Chart Window
*
* @xtype calc-orb-chart-window
*
* @class Calc.view.orb.ChartWindow
* @extends Ext.window.Window
* @author Arg0n <argonthechecker@gmail.com>
*/
Ext.define('Calc.view.orb.ChartWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.calc-orb-chart-window',


    /**
     * Contains the Orb model
     *
     * @property {Ext.data.Model/Calc.model.Orb} orb
     */
    orb: null,


    layout: 'fit',
    closable: true,
    modal: true,

    minHeight: 600,
    minWidth: 800,

    items: [{
        xtype: 'chart',

        animate: true,
        shadow: true,

        store: null,

        axes: [{
            type: 'Numeric',
            position: 'bottom',
            fields: ['outputAmount'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: Calc.Language.translate('amount', null, true),
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'left',
            fields: ['name'],
            title: Calc.Language.translate('Orb Name')
        }],

        theme: 'Category1',

        background: {
            gradient: {
                id: 'bgGradiant',
                angle: 90,
                stops: {
                    0: {
                        color: '#ddd'
                    },
                    100: {
                        color: '#fff'
                    }
                }
            }
        },

        series: [{
            type: 'bar',
            axis: 'bottom',
            highlight: true,
            tips: {
                trackMouse: true,
                width: 'auto',
                renderer: function(storeItem) {
                    this.setIconCls(Calc.cssPrefix + storeItem.get('iconCls') + '-48px');
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('outputAmount'));
                }
            },
            label: {
                display: 'insideEnd',
                field: 'outputAmount',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333',
                'text-anchor': 'middle'
            },
            xField: 'name',
            yField: ['outputAmount']
        }]
    }],


    /**
     * Returns the chart
     *
     * @returns {Ext.chart.Chart}
     */
    getChart: function()
    {
        var chart;

        try {
            chart = this.down('chart');
        } catch(err) {
            chart = this.items[0];
        }

        return chart;
    },


    /**
     * @returns {Ext.data.Model/Calc.model.Orb}
     */
    getOrb: function()
    {
        return this.orb;
    },


    /**
     * Sets a store in the chart
     *
     * @param {Ext.data.Store/String} store
     */
    setStore: function(store)
    {
        var chart = this.getChart();

        if (store && store.isStore) {
            chart.store = store;
        } else if(Ext.isString(store)) {
            chart.store = Ext.create(store, {autoLoad: false});
        }
    },


    /**
     * Returns the store of the chart
     *
     * @returns {Ext.data.Store/Ext.store.Orbs}
     */
    getStore: function()
    {
        var chart = this.getChart(),
            store;

        try {
            store = chart.getStore();
        } catch(err) {
            store = chart.store;
        }

        return store;
    },


    /**
     * @constructor
     *
     * @param {Object} config
     */
    constructor: function(config)
    {
        this.orb = config.orb;

        this.setStore(config.store);
        this.setHead(this.orb);

        this.callParent(arguments);
    },


    /**
     * Sets the title and icon of the window
     *
     * @param {Ext.data.Model/Calc.model.Orb} [orb]
     */
    setHead: function(orb)
    {
        orb = orb || this.getOrb();

        if (orb.isModel && orb instanceof Calc.model.Orb) {
            this.title = (orb.get('name'));
            this.iconCls = (Calc.cssPrefix + orb.get('iconCls') + '-16px');

        }
    },


    /**
     * Starts the calculation of the outputValues
     *
     * @param {Function} [callback]
     */
    calculate: function(callback)
    {
        var orb = this.getOrb(),
            store = this.getStore(),
            storeOrb;

        store.load({callback: function() {
            storeOrb = store.findRecord('id', orb.get('id'));

            storeOrb.set('inputAmount', 1);

            store.calculate();

            if (callback) {
                callback();
            }
        }});
    }
});