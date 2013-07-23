/**
 * Main menu
 *
 * @xtype calc-main-menu
 *
 * @class Calc.view.layout.MainMenu
 * @extends Ext.toolbar.Toolbar
 * @uses Ext.menu.Menu
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.layout.MainMenu', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.calc-main-menu',
    
    uses: [
        'Ext.menu.Menu'
    ],
    
    id: 'calc-main-menu',

    items: [{
        text: 'Forum Post',
        href: 'http://www.pathofexile.com/forum/view-thread/441192'
    }, {
        text: 'GitHub',
        href: 'https://github.com/4rg0n/poe_orb_calc'
    }, {
        xtype: 'tbfill'
    }, {
        xtype: 'tbtext',
        text: Calc.Language.translate('language', null, true) + ':'
    }, {
        xtype: 'splitbutton',
        itemId: 'language-button'
    }, {
        xtype: 'tbseparator'
    }, {
        xtype: 'tbtext',
        text: 'coded by Arg0n & mathed by WhiteSammy'
    }],
    
    
    /**
     * init
     */
    initComponent: function()
    {
        this.callParent(arguments);
        this.initLanguageButton();
        this.addLanguages();
    },
    
    
    /**
     * Sets the flag for the language Button
     */
    initLanguageButton: function()
    {
        var langButton = this.down('[itemId="language-button"]');
        
        langButton.setIconCls(Calc.cssPrefix + 'icon-' + Calc.Language.getLanguage());
    },
    
    
    /**
     * Adds all available languages to the menu
     */
    addLanguages: function()
    {
        var langButton = this.down('[itemId="language-button"]'),
            langs = Calc.Language.getLanguages();
        
        langButton.menu = Ext.create('Ext.menu.Menu');
        
        Ext.Object.each(langs, function(lang, langName) {
            langButton.menu.add({
                text: Calc.Language.translate(langName, null, true),
                iconCls: Calc.cssPrefix + 'icon-' + lang,
                lang: lang,
                action: 'language-change'
            });
        });
    }
    

});