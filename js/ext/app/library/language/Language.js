/**
 * Language Class
 *
 * @class Calc.library.language.Language
 * @singleton
 * @alternateClassName Calc.Language
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.language.Language', {

    singleton: true,

    requires: [
        'Calc.library.language.Store'
    ],

    alternateClassName: 'Calc.Language',


    /**
     * Language Map
     *
     * @cfg {Object} languageMap
     */
    languageMap: {
        'de': ['de', 'de-de', 'de-ch', 'de-at', 'de-lu', 'de-li'],
        'en': ['en', 'en-en', 'en-us', 'en-gb', 'en-au', 'en-ca', 'en-nz', 'en-ie', 'en-za', 'en-jm', 'en-bz', 'en-tt']
    },
    
    
    /**
     * Names of the language codes
     * 
     * @cfg {Object} languageNames 
     */
    languageNames: {
        'de': 'German',
        'en': 'English'
    },


    /**
     * Contains language
     *
     * @cfg {String} language
     */
    language: null,


    /**
     * Language cookie name
     */
    languageCookie: 'poe-calc-lang',

    /**
     * Contains store
     *
     * @cfg {String/Ext.data.Store/Calc.library.language.Store} [store="Calc.library.language.Store"]
     */
    store: 'Calc.library.language.Store',
    
    
    /**
     * @constructor
     */
    constructor: function()
    {
        this.init();    
    },
    

    /**
     * init
     *
     * @param {Object} [config]
     * @param {Function} [callback]
     */
    init: function(config, callback)
    {
        Ext.apply(this, config);

        this.initLanguage();
        this.setStore();
        this._setModelFields();
        this.load({
            callback: function() {
                
                if (callback) {
                    callback();
                }
            }
        });
    },


    /**
     * Returns the current setted language
     *
     * @return {String}
     */
    getLanguage: function()
    {
        if (Ext.isEmpty(this.language)) {

            //Cookie set?
            if (this.hasCookie()) {
                this.language = this.getCookie();
            } else {

                //Read Browser language
                this.language = this.getBrowserLanguage();
            }
        }

        return this.language
    },


    /**
     * Reads the language of the browser
     *
     * @return {String}
     */
    getBrowserLanguage: function()
    {
        var lang = '';

        //Getting Browser language
        if (Ext.isIE) {
            lang = navigator.browserLanguage;
        } else {
            lang = navigator.language;
        }

        return lang;
    },


    /**
     * Maps different formats to one
     *
     * @param {String} lang
     * @return {String}
     */
    mapLanguage: function(lang)
    {
        var langString = ''

        //Nach der Sprache im Objekt suchen
        Ext.Object.each(this.languageMap, function(field, langCodes) {
            if (Ext.isEmpty(langString)) {
                Ext.Array.each(langCodes, function(langCode) {
                    if (lang.toLowerCase() === langCode.toLowerCase()) {
                        langString = field;
                        return false
                    }
                });
            } else {
                return false;
            }
        });

        return langString;
    },


    /**
     * Sets the language
     *
     * @param {String} [lang]
     */
    initLanguage: function(lang)
    {
        var lang = lang || this.language || '';

        if (Ext.isEmpty(lang)) {

            lang = this.getLanguage();

            this.language = this.mapLanguage(lang);
        } else {
            this.language = lang;
            this.addLanguage(lang, [lang, lang + '-' + lang]);
        }

        this.setCookie(lang);
    },


    /**
     * Setzt den Store
     *
     * Der Ãœbergebene Store kann eine Instanz eines stores sein, oder der Klassenname
     * Wenn kein Store Ã¼bergeben wird er auf Utmt.store.Language gesetzt
     *
     *  @param {Ext.data.Store/String} [store]
     */
    setStore: function(store)
    {
        var store = store || this.store || null;

        if (Ext.isString(store)) {
            store = Ext.create(store);
        } else if (!store.isStore) {
            Ext.Error.raise('Language store could not instantiate.');
        }

        this.store = store;
    },


    /**
     * Returns the store
     *
     * @return {Ext.data.Store}
     */
    getStore: function()
    {
        return this.store;
    },


    /**
     * Translates a String
     *
     * @param {String} string
     * @param {String[]/Object} [values]
     * @param {Boolean} capitalize
     */
    translate: function(string, values, capitalize)
    {
        var record = this.getStore().getById(string),
            values = values || null,
            translatedString = '';

        if (record) {
            translatedString = record.get(this.getLanguage());
        }

        if (Ext.isEmpty(translatedString)) {
            translatedString = string;
        }

        if (Ext.isArray(values) || Ext.isObject(values)) {
            translatedString = new Ext.Template(translatedString);
            translatedString = translatedString.apply(values);
        }
        
        if (true === capitalize) {
            translatedString = Ext.String.capitalize(translatedString);
        }
        
        return translatedString;
    },


    /**
     * Sets fields into the model
     *
     * @private
     */
    _setModelFields: function()
    {
        var fields = this.getFields();

        this.getStore().model.setFields(fields);
    },


    /**
     * Determines which fields are needed
     *
     * @return {Object[]}
     */
    getFields: function()
    {
        var fields = [];

        Ext.Object.each(this.languageMap, function(field) {
            fields.push({
                name: field,
                type: 'string'
            });
        });

        return fields;
    },


    /**
     * Adds a language
     *
     *      @example
     *
     *      Language.addLanguage('fr', ['fr', 'fr-be', 'fr-ca', ...]);
     *
     *
     * @param {String} tag - XML tag e.g. 'de' for <de></de>
     * @param {String[]} langCodes
     */
    addLanguage: function(tag, langCodes)
    {
        if (Ext.isString(tag) && Ext.isArray(langCodes)) {

            var currentTags = Ext.Object.getKeys(this.languageMap);

            if (false === Ext.Array.contains(currentTags, tag)) {
                this.languageMap[tag] = langCodes;
                this._setModelFields();
            }
        }
    },


    /**
     * Loads the language store
     *
     * @param {Object/Function} [options]
     */
    load: function(options)
    {
        this.getStore().load(options);
    },


    /**
     * Checks if a cookie is set
     *
     * @return {Boolean}
     */
    hasCookie: function()
    {
        return !Ext.isEmpty(this.getCookie());
    },


    /**
     * Reads the Cookie and returns it
     *
     * @return {Object}
     */
    getCookie: function()
    {
        return Ext.util.Cookies.get(this.languageCookie);
    },


    /**
     * Sets the cookie
     *
     * @param {String} lang
     */
    setCookie: function(lang)
    {
        Ext.util.Cookies.set(this.languageCookie, lang);
    },
    
    /**
     * Resturns all registred languages
     * 
     * @return {Object}
     */
    getLanguages: function()
    {
        var me = this,
            langs = {};
        
        Ext.Object.each(this.languageMap, function(field) {
            langs[field] = me.getLanguageName(field);
        });
        
        return langs;
    },
    
    
    /**
     * Returns the name of the language
     * 
     * @param {String} lang
     * @return {String}
     */
    getLanguageName: function(lang)
    {
        return this.languageNames[lang];
    }
});