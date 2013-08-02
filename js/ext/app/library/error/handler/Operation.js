/**
 * Operation Error Handler
 * 
 * @class Calc.library.error.handler.Operation
 * @uses Calc.library.error.Error
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.error.handler.Operation', {
    
    uses: [
        'Calc.library.error.Error'
    ],
    
    statics: {
       
        /**
         * Builds the error object
         * 
         * @param {Ext.data.Operation} operation
         * @return {Calc.library.error.Error}
         */
        buildError: function(operation)
        {
            if (operation) {
                
                var options = this.buildConfig(operation);
                
                return this.error = Ext.create('Calc.library.error.Error', options);
            }
            
            return null;
        },
        
        
        
        /**
         * Builds the error configuration
         * 
         * @param {Ext.data.Operation} operation
         * @return {Object}
         */
        buildConfig: function(operation) {
            
            var options = {};
            
            if (Ext.isString(operation.getError())) {
                options.errorMsg = operation.getError();
                options.type = 200;
            } else {
                options.errorMsg = operation.getError().statusText;
                options.type = operation.getError().status;
            }
            
            options.originalObject = operation;
            options.stack = this.buildStack();
            
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