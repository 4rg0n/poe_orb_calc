/**
 * Ext.Error Handler
 * 
 * @class Calc.library.error.handler.ExtError
 * @uses Calc.library.error.Error
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.error.handler.ExtError', {
    
    uses: [
        'Calc.library.error.Error'
    ],
    
    statics: {
       
        /**
         * Builds the error object
         * 
         * @param {Ext.Error} error
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
         * @param {Ext.Error} error
         * @return {Object}
         */
        buildConfig: function(error) {
            
            var options = {
                msg: error.msg,
                type: 430,
                stack: this.buildStack(error)
            };
                       
            return options;
        },
        
        
        /**
         * Builds an array of the stack
         * 
         * @return {String[]}
         */
        buildStack: function()
        {
            return this.getStackTrace().split('\n');
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