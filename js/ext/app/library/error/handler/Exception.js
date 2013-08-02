/**
 * Exception Error Handler
 * 
 * @class Calc.library.error.handler.Exception
 * @uses Calc.library.error.Error
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.error.handler.Exception', {
    
    uses: [
        'Calc.library.error.Error'
    ],

    statics: {
       
        /**
         * Builds the error object
         * 
         * @param {Calc.library.exception.Exception} exception
         * @return {Calc.library.error.Error}
         */
        buildError: function(exception)
        {
            if (exception) {
                
                var options = this.buildConfig(exception);
                
                return this.error = Ext.create('Calc.library.error.Error', options);
            }
            
            return null;
        },
        
        
        
        /**
         * Builds the error configuration
         * 
         * @param {Calc.library.exception.Exception} exception
         * @return {Object}
         */
        buildConfig: function(exception) {
            
            var options = {
                msg: exception.getMsg(),
                type: 430,
                stack: this.buildStack(exception),
                originalObject: exception
            };
                       
            return options;
        },
        
        buildStack: function(exception)
        {
            var stack = [];
            
            stack = exception.stack;
            
            return stack;
        }
    }
});