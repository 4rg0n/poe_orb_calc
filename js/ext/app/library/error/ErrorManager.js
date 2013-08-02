/**
 * Error Manager
 *
 * @class Calc.library.error.ErrorManager
 * @uses Calc.view.error.Window
 * @uses Calc.library.error.ErrorFactory
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.error.ErrorManager', {
    alternateClassName: 'Calc.ErrorManager',
    singleton: true,
    
    uses: [
        'Calc.view.error.Window',
        'Calc.library.error.ErrorFactory'
    ],
    
    errorRouteId: 'error',
    errorWindowClass: 'Calc.view.error.Window',
    errorWindow: null,
    
    /**
     * Contains error object
     * 
     * @property {Calc.library.error.Error} error
     */
    error: null,
    
    
    /**
     * {
     *  msg: 'Not found'
     *  type: '404',
     *  title: 'Error',
     *  errorMsg: 'Not Found'
     * }
     * 
     * @param {Object/Ext.data.Operation} object
     * @param {Boolean} asWindow  
     */
    show: function(object, asWindow)
    {
        var error = this.buildError(object),
            asWindow = asWindow || false,
            request;
            
        if (true === asWindow) {
            this._showWindow(error);
        } else {
            
            //TODO Routing =)
            //request = this.buildErrorRequest(error)
            
            //Calc.Routing.execRequest(request);
        }
    },
    
    
    /**
     * Builds the error request
     * 
     * @param {Calc.library.error.Error} error
     * @return {Calc.library.routing.Request}
     */
    buildErrorRequest: function(error) 
    {
        var errorRoute = Calc.Routing.getRoutes().getRoute(this.errorRouteId),
            request = Calc.Routing.getRequest();
            
        request.setError(error);
        request.setRoute(errorRoute);
        
        return request;
    },
     
    
    /**
     * 
     * Shows an error in a window
     * 
     * @private
     * @param {Calc.library.error.Error} error
     */
    _showWindow: function(error)
    {
        var errorWindow = this.getErrorWindow();
        
        errorWindow.setData(error.getData(), true);
        
        errorWindow.show();
    },
    
    
    /**
     * Returns the error object
     * 
     * @return {Calc.library.error.Error}
     */
    getError: function()
    {
        return this.error;
    },
    
    
    /**
     * Builds the error object
     * 
     * @param {Object/Ext.data.Operation/Ext.Error/Error/Calc.library.exception.Exception} object
     * @return {Calc.library.error.Error}
     */
    buildError: function(object) 
    {
        return Calc.library.error.ErrorFactory.create(object);
    },
    
    
    /**
     * Gibt das Error Fenster zurück wenn vorhanden,
     * ansonsten wird es erstellt
     * 
     * @private
     */
    getErrorWindow: function()
    {
        if (this.errorWindow) {
            return this.errorWindow;
        } else {
            return this.buildErrorWindow();
        }
    },

    
    /**
     * Erstellt das Error fenster und gibt dieses zurück
     * 
     * @private
     * @return {Calc.view.error.Window}
     */
    buildErrorWindow: function()
    {
        this.errorWindow = Ext.create(this.errorWindowClass);
        
        return this.errorWindow;
    },
    
    
    /**
     * Logs an error
     * 
     * @param {Mixed} error
     */
    log: function(error)
    {
        if (!error.isError) {
            error = this.buildError(error);
        }
        
        error.log();
    }
});