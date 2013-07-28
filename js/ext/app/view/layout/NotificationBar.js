/**
 * Notification Bar
 *
 * @xtype calc-notification-bar
 *
 * @class Calc.view.layout.NotificationBar
 * @extends Ext.container.Container
 * @requires Calc.view.MessageBox
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.layout.NotificationBar', {
    extend: 'Ext.container.Container',
    id: 'calc-notification-bar',
    alias: 'widget.calc-notification-bar',

    requires: [
        'Calc.view.MessageBox'
    ],

    height: 25,
    style: {
        backgroundColor: '#DFE9F5'
    },

    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'center'
    },

    items: [{
        xtype: 'calc-message-box',
        height: 15
    }],


    /**
     * Returns the Message Box
     *
     * @returns {Calc.view.MessageBox}
     */
    getMessageBox: function()
    {
        return this.down('calc-message-box');
    },

    /**
     * Shortcut for getMessageBox()
     *
     * @returns {Calc.view.MessageBox}
     */
    getMsgBox: function()
    {
        return this.getMessageBox();
    }
});
