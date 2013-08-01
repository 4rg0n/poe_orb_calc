/**
 * Error Class
 *
 * @class Calc.library.error.Error
 * @uses Calc.library.language.Language
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.error.Error', {
    
    uses: [
        'Calc.library.language.Language'
    ],
    
    /**
     * Own error message
     * 
     * @cfg {String} [msg]
     */
    msg: null,
    
    /**
     * Error type (HTTP Standards)
     * 
     * @cfg {Number/String} [type]
     */
    type: '',
    
    
    /**
     * Title of the error
     * 
     * @cfg {String} [title="Error"]
     */
    title: 'Error',
    
    
    /**
     * Contains the error message of http
     * 
     * @cfg {String} [errorMsg]
     */
    errorMsg: '',
    
    
    /**
     * Shows whether the error is unknown
     * 
     * @property {Boolean} isUnknown
     */
    isUnknown: false,
    
    
    /**
     * Error stack
     * 
     * @cfg {String[]} [stack]
     */
    stack: [],
    
    
    /**
     * true to display the stack in the error template
     * 
     * @cfg {Boolean} [showStack=false]
     */
    showStack: false,
    
    
    /**
     * true to log the stack automaticly
     * 
     * @cfg {Boolean} [logStack=false]
     */
    logStack: false,
    
    
    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function(config)
    {
        Ext.apply(this, config);
        
        this.init();
    },
    
    
    /**
     * Initialises the messages
     */
    init: function()
    {
        this.buildErrorMsg();
        this.buildMessage();
        
        if (this.logStack) {
            this.log();
        }
    },
    
    
    /**
     * Returns own error message
     * 
     * @return {String}
     */
    getMsg: function()
    {
        return this.msg;    
    },
    
    
    /**
     * @see Calc.library.error.Error.getMsg
     * @return {String}
     */
    getMessage: function()
    {
        return this.getMsg();
    },
    
    
    /**
     * Builds the msg if there where no set
     */
    buildMessage: function()
    {
        var msg = '';
        
        //Wenn schon eine Nachricht vorhanden ist, nehm die
        if (this.getMessage()) {
            return;
        }
        
        switch(this.getType()) {
            case 400:
                msg = Calc.Language.translate('Sent request was faulty.');
                break;
            case 401:
                msg = Calc.Language.translate('You are not authorized to see this site.');
                break;
            case 403:
                msg = Calc.Language.translate('You have no access to this site');
                break;
            case 404: 
                msg = Calc.Language.translate('The requested site was not found.');
                break;
            case 500: 
                msg = Calc.Language.translate('The server expirienced a problem.');
                break;
            case 430: 
                msg = Calc.Language.translate('Everything is broken T_T');
                break;
            default:
                break;
        }
        
        this.msg = msg;
    },
    
    
    /**
     * Returns error type
     * 
     * @return {Number}
     */
    getType: function()
    {
        return this.type;
    },
    
    
    /**
     * Returns all the error Data
     * 
     * @return {Object}
     */
    getData: function()
    {
        return {
            isUnknown: this.isUnknown,    
            title: Calc.Language.translate(this.getTitle()),
            type: this.getType(),
            errorMsg: this.getErrorMsg(),
            msg: this.getMessage(),
            stack: this.getStack(),
            showStack: this.showStack
        }
    },
    
    
    /**
     * Returns the title of the error
     * 
     * @return {String}
     */
    getTitle: function()
    {
        return this.title;    
    },
    
    
    /**
     * Returns the error stack
     * If asString is true it will be returned as a string =D
     * 
     * @param {Boolean} [asString=false]
     * @return {String}
     */
    getStack: function(asString)
    {
        var stack = this.stack;
            asString = asString || false;
        
        if (asString) {
            stack = stack.join('\n');
        }
        
        return stack;    
    },
    
    
    /**
     * Builds the errorMsg
     */
    buildErrorMsg: function()
    {
        var msg = Ext.String.capitalize(this.getStatusText());
        
        if (Ext.isEmpty(this.errorMsg)) {
            this.errorMsg = msg;
        }
    },
    
    
    /**
     * Returns the HTTP Status text depending on type
     * 
     * @param {Number} type
     * @return {String}
     */
    getStatusText: function(type)
    {
        var type = type || this.getType(),
            msg = '';
                        
        switch(this.getType()) {
            case 400:
                msg = Calc.Language.translate('bad Request');
                break;
            case 401:
                msg = Calc.Language.translate('unauthorized');
                break;
            case 403:
                msg = Calc.Language.translate('forbidden');
                break;
            case 404: 
                msg = Calc.Language.translate('not Found');
                break;
            case 500: 
                msg = Calc.Language.translate('internal Server Error');
                break;
            case 430: 
                msg = Calc.Language.translate('fuuuuuck');
                break;    
                
            default:
                this.isUnknown = true;
                msg = Calc.Language.translate('unknown');
                break;
        }
        
        return msg;
    },
    
    
    /**
     * logs the stack to the console
     */
    log: function()
    {
        Ext.global.console.error(this.getStack(true));    
    },
    
    /**
     * Returns http error message
     * 
     * @return {String}
     */
    getErrorMsg: function()
    {
        return this.errorMsg;
    },
    
    
    /**
     * Checks whether the error is an unauthenticated error
     * 
     * @return {Boolean}
     */
    isUnauthenticated: function()
    {
        if (this.getType() == 401) {
            return true;
        }
        
        return false;
    }
 });