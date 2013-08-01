/**
 * Facebook Button
 *
 * @xtype calc-facebook-button
 *
 * @class Calc.library.social.button.Facebook
 * @extends Calc.library.social.button.Button
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.social.button.Facebook', {
    extend: 'Calc.library.social.button.Button',
    alias: 'widget.calc-facebook-button',
    
    tplPath: Calc.appFolder + '/template/social/Facebook.html',
    
    constructor: function()
    {
        this.initButton();
        this.callParent(arguments);
    },
    
    initButton: function()
    {
        !function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            
            if (d.getElementById(id)) return;
            
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk');
    }
});