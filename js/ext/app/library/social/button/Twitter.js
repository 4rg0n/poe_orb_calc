/**
 * Twitter Button
 *
 * @xtype calc-twitter-button
 *
 * @class Calc.library.social.button.Twitter
 * @extends Calc.library.social.button.Button
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.social.button.Twitter', {
    extend: 'Calc.library.social.button.Button',
    alias: 'widget.calc-twitter-button',
    
    tplPath: Calc.appFolder + '/template/social/Twitter.html',
    
    constructor: function()
    {
        this.initButton();
        this.callParent(arguments);
    },
    
    initButton: function()
    {
        !function(d,s,id) {
            var js,
                fjs = d.getElementsByTagName(s)[0],
                p=/^http:/.test(d.location) ? 'http':'https';
                
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id; 
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js,fjs);
            }
        }(document, 'script', 'twitter-wjs');
    }
});