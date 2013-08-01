/**
 * Google+ Button
 *
 * @xtype calc-googleplus-button
 *
 * @class Calc.library.social.button.GooglePlus
 * @extends Calc.library.social.button.Button
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.social.button.GooglePlus', {
    extend: 'Calc.library.social.button.Button',
    alias: 'widget.calc-googleplus-button',
    
    tplPath: Calc.appFolder + '/template/social/GooglePlus.html',
    
    constructor: function()
    {
        this.initButton();
        this.callParent(arguments);
    },
    
    initButton: function()
    {
       !function() {
           var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
           po.src = 'https://apis.google.com/js/plusone.js';
           var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
       }();
    }
});

