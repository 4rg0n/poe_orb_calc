/**
 * Basic Exception Class
 *
 * @class Calc.library.exception.Exception
 * @extends Error
 * @alternateClassName Calc.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.exception.Exception', {
    extend: 'Error',

    alternateClassName: 'Calc.Exception',

    isException: true,
    
    name: 'Uncaught Exception',
    
    stack: null,
    
    /**
     * Exception message
     *
     * @cfg {String} [message="Exception"]
     */
    message: 'Exception',


    /**
     * Previous thrown exception
     *
     * @property {Calc.library.exception.Exception} previousException
     */
    previousException: null,


    /**
     * @constructor
     *
     * @param {String} [msg="Exception"]
     * @param {Calc.library.exception.Exception} [previousException]
     */
    constructor: function(msg, previousException)
    {
        this.message = msg || this.message;
        this.previousException = previousException;
        this.stack = this.buildStack(this.getStackTrace());
    },

    /**
     * Returns the message
     *
     * @return {String}
     */
    getMsg: function()
    {
        return this.message;
    },
    
    /**
     * Returns the previous thrown exception
     *
     * @returns {Calc.library.exception.Exception}
     */
    getPreviousException: function()
    {
        return this.previousException;
    },
    
    
    /**
     * Gets the stack trace
     * 
     * @return {String}
     */
    getStackTrace: function() {
        var obj = {};
        
        Error.captureStackTrace(obj, this.getStackTrace);
        
        return obj.stack;
    },
    
    
    /**
     * Builds the stack trace to an array
     * 
     * @param {String} stackTrace
     * @return {String[]}
     */
    buildStack: function(stackTrace)
    {
        return stackTrace.split('\n');
    },


    /**
     * Logs the exception to console
     */
    log: function()
    {
        var exceptions = this.getAllExceptions();

        Ext.Array.each(exceptions, function(exception) {

            var err = {msg: exception.getMsg()};

            var method = exception.log.caller,
                msg;

            if (method) {
                if (method.$name) {
                    err.sourceMethod = method.$name;
                }
                if (method.$owner) {
                    err.sourceClass = method.$owner.$className;
                }
            }

            if (Ext.Error.handle(err) !== true) {
                msg = Ext.Error.prototype.toString.call(err);

                Ext.log({
                    msg: msg,
                    level: 'error'
                });
            }
        });
    },


    /**
     * Returns this Exception with all previous Exceptions
     *
     * @returns {Calc.library.exception.Exception[]}
     */
    getAllExceptions: function()
    {
        var exceptions = [],
            currentException = this;

        while(currentException) {
            Ext.Array.push(exceptions, currentException);
            
            currentException = currentException.previousException;
        }

        return exceptions;
    }
});
