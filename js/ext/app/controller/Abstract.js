/**
 * Abstract Controller
 *
 * @class Calc.controller.Abstract
 * @extends Ext.app.Controller
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.Abstract', {
    extend: 'Ext.app.Controller',


    /**
     * Returns the Tabpanel
     *
     * @returns {Calc.view.layout.TabPanel}
     */
    getTabPanel: function()
    {
        return Ext.getCmp('calc-tabpanel');
    },


    /**
     * Returns the Notification Bar
     *
     * @returns {Calc.view.layout.NotificationBar}
     */
    getNotificationBar: function()
    {
        return Ext.getCmp('calc-notification-bar');
    },


    /**
     * Returns the Message Box
     *
     * @returns {Calc.view.MessageBox}
     */
    getMsgBox: function()
    {
        return this.getNotificationBar().getMsgBox();
    },


    /**
     * Displays an error in the Message Box
     *
     * @param {String} msg
     */
    error: function(msg)
    {
        this.getMsgBox().error(msg);
    },


    /**
     * Displays an info in the Message Box
     *
     * @param {String} msg
     */
    info: function(msg)
    {
        this.getMsgBox().info(msg);
    },


    /**
     * Displays a warning in the Message Box
     *
     * @param {String} msg
     */
    warn: function(msg)
    {
        this.getMsgBox().warn(msg);
    }
});