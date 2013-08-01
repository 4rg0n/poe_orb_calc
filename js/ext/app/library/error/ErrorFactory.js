Ext.define('Calc.library.error.ErrorFactory', {
    
    uses: [
        'Calc.library.error.Error',
        'Calc.library.error.handler.JsError',
        'Calc.library.error.handler.ExtError',
        'Calc.library.error.handler.Operation',
        'Calc.library.error.handler.Exception'
    ],
    
    statics: {
        
        /**
         * Builds the error object
         * 
         * @param {Object/Ext.data.Operation/Ext.Error/Error/Calc.library.exception.Exception} object
         * @return {Calc.library.error.Error}
         */
        create: function(object)
        {
            var error = null;
        
            if (object instanceof Ext.data.Operation) {
                error = Calc.library.error.handler.Operation.buildError(object);
                
            } else if (object instanceof Calc.library.exception.Exception) {
                error = Calc.library.error.handler.Exception.buildError(object);
                
            } else if (object instanceof Ext.Error) {
                error = Calc.library.error.handler.ExtError.buildError(object);
                
            } else if (object instanceof Error) {
                error = Calc.library.error.handler.JsError.buildError(object);
                
            } else {
                error = Ext.create('Calc.library.error.Error', object);
                
            }
            
            this.error = error;
            
            return error;
        }
    }
});