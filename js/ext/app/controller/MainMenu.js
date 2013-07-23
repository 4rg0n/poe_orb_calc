Ext.define('Calc.controller.MainMenu', {
    extend: 'Calc.controller.Abstract',
    
    refs: [{
        ref: 'mainMenu',
        selector: 'calc-main-menu'
    }, {
        ref: 'languageButton',
        selector: 'calc-main-menu splitbutton[itemId="language-button"]'
    }],
    
    init: function()
    {
        this.control({
            'calc-main-menu splitbutton[itemId="language-button"] menuitem[action="language-change"]': {
                click: this.changeLanguage
            }
        });
    },
    
    
    /**
     * Changes the current language
     * 
     * @param {Ext.button.Splitbutton} button
     */
    changeLanguage: function(button)
    {
        var currentLang = Calc.Language.getLanguage();
        
        //Did language really change?
        if (button.lang !== currentLang) {
            
            Calc.Language.setLanguage(button.lang);
            this.getMainMenu().initLanguageButton();
            
            window.location.reload()
        }
    }
})