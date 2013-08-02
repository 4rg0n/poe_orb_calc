/**
 * Javascript Error Handler
 * 
 * @class Calc.library.error.handler.JsError
 * @uses Calc.library.error.Error
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.error.handler.JsError', {
    
    uses: [
        'Calc.library.error.Error'
    ],
    
    statics: {
       
        /**
         * Builds the error object
         * 
         * @param {Error} error
         * @return {Calc.library.error.Error}
         */
        buildError: function(error)
        {
            if (error) {
                
                var options = this.buildConfig(error);
                
                return this.error = Ext.create('Calc.library.error.Error', options);
            }
            
            return null;
        },
        
        
        
        /**
         * Builds the error configuration
         * 
         * @param {Error} error
         * @return {Object}
         */
        buildConfig: function(error) {
            
            var options = {
                msg: error.message,
                type: 430,
                stack: this.buildStack(error),
                originalObject: error
            };
                       
            return options;
        },
        
        
        /**
         * Builds the error stack
         * 
         * @param {Error} error
         * @return {String[]}
         */
        buildStack: function(error)
        {
            var stack = [];
            
            if (Ext.isChrome) {
                stack = error.stack.split('\n');
            } else {
                stack = this.getStackTrace().split('\n');
            }
            
            return stack;
        },
        
        
        /**
         * Gets the stack trace
         * 
         * @return {String}
         */
        getStackTrace: function() {
            var obj = {};
            
            Error.captureStackTrace(obj, this.buildError);
            
            return obj.stack;
        }
    }
});