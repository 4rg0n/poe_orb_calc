/**
 * Message Box
 *
 * @xtype calc-message-box
 *
 * @class Calc.view.MessageBox
 * @extends Ext.container.Container
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.MessageBox', {
    extend: 'Ext.container.Container',
    mixins: [
        'Calc.library.mixin.Template'
    ],

    alias: 'widget.calc-message-box',

    /**
     * Time for animation in ms
     *
     * @cfg {Number} animateDuration
     */
    animateDuration: 1000,


    /**
     * Display time in ms
     *
     * @cfg {Number} duration
     */
    duration: 6000,

    /**
     * CSS class
     *
     * @cfg {String} cls
     */
    cls: Calc.cssPrefix + 'msg-box',


    /**
     * CSS icon classes
     *
     * @cfg {Object} icons
     */
    icons: {
        info: Calc.cssPrefix + 'icon-info',
        warn: Calc.cssPrefix + 'icon-warn',
        error: Calc.cssPrefix + 'icon-error'
    },

    /**
     * Colors for highlighting
     *
     * @cfg {Object} icons
     */
    highlights: {
        info: '#ffffff',
        error: '#ff0000',
        warn: '#ffff9c'
    },


    /**
     * If true, parent component will be highlighted
     *
     * @cfg {Boolean} enableHighlight
     */
    enableHighlight: true,

    loader: {
        url: Calc.appFolder + '/template/MessageBox.html',
        autoLoad: false,
        renderer: Calc.XTemplateRenderer.loader
    },


    /**
     * Calls showMsg with info
     *
     * @param {String} msg
     */
    info: function(msg) {
        this.showMsg(msg, 'info');
    },


    /**
     * Calls showMsg with warn
     *
     * @param {String} msg
     */
    warn: function(msg) {
        this.showMsg(msg, 'warn');
    },


    /**
     * Calls showMsg with error
     *
     * @param {String} msg
     */
    error: function(msg) {
        this.showMsg(msg, 'error');
    },


    /**
     * Loads the msg into the Message Box
     * Highlights the parent component
     * ANimates the box
     *
     * @param {String} msg
     * @param {String} type
     */
    showMsg: function(msg, type)
    {
        var me = this,
            type = type || 'info',

            fadeOut = new Ext.util.DelayedTask(function(){
                me.getEl().fadeOut({
                    opacity: 0,
                    duration: me.animateDuration,
                    easing: 'easeOut',
                    remove: false,
                    useDisplay: false
                });
            }),

            iconCls = this.getIcon(type);

        this.setData({
            icon: iconCls,
            msg: msg
        }, true);

        this.doHighlight(type);

        this.getEl().fadeIn({
            opacity: 1,
            duration: me.animateDuration,
            easing: 'easeOut'
        });

        fadeOut.delay(me.duration);
    },


    /**
     * Executes the highlight when there is a parent component
     *
     * @param {String} type
     */
    doHighlight: function(type)
    {
        var color = this.getHighlightColor(type),
            component = this.up();

        if (this.enableHighlight) {
            if (component) {
                component.getEl().highlight(color);
            }
        }
    },


    /**
     * Returns the icon CSS class
     *
     * @param {String} type
     * @return {String}
     */
    getIcon: function(type)
    {
        return this.icons[type];
    },


    /**
     * Returns the color code
     *
     * @param {String} type
     * @return {String}
     */
    getHighlightColor: function(type)
    {
        return this.highlights[type];
    }
});