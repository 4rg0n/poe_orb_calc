/**
 * Request object
 * Will be send on every single method called by the routing
 * 
 * @class Calc.library.routing.Request
 * @uses Calc.library.error.Error
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.Request', {
    
    uses: [
        'Calc.library.error.Error'
    ],
    
    /**
     * Requested URI... what else? ^^
     * 
     * @cfg {String} requestedUri 
     */
    requestedUri: null,
    
    
    /**
     * The found route for the request
     * 
     * @cfg {Calc.library.routing.Route} route
     */
    route: null,
    
    
    /**
     * Object with all parameters and theire values
     * 
     * @property {Object} params
     */
    params: null,
    
    
    /**
     * Error, if there was an error, like a 404
     * 
     * @property {Calc.library.error.Error} error
     */
    error: null,
    
    
    /**
     * Shows if there was an error
     * 
     * @property {Boolean} isValid
     */
    isValid: true,
    
    
    /**
     * @constructor
     * 
     * @param {Object} config
     */
    constructor: function(config)
    {
        Ext.apply(this, config);
        
        if(this.validateRoute()) {
            this.initParams();
        }
    },
    
    
    /**
     * Returns the requested URI
     * 
     * @return {String}
     */
    getRequestedUri: function()
    {
        return this.requestedUri;    
    },
    
    
    /**
     * Sets the route into the request
     * 
     * @param {Calc.library.routing.Route} route
     */
    setRoute: function(route)
    {
        this.route = route;
    },
    
    /**
     * Returns the found route object
     * 
     * @return {Calc.library.routing.Route}
     */
    getRoute: function()
    {
        return this.route;
    },
    
    
    /**
     * Returns the compiled route object
     * 
     * @return {{Calc.library.routing.CompiledRoute}
     */
    getCompiledRoute: function()
    {
        return this.getRoute().compile();
    },
    
    
    /**
     * Checks whether a route was found
     * Creates an error object when there isn't a route
     * 
     * @return {Boolean}
     */
    validateRoute: function()
    {
        if (!this.getRoute()) {
            this.route = Calc.Routing.getRoutes().getRoute('error');
            
            this.isValid = false;
            
            this.error = this.buildError({
                msg: Ext.String.format('No site found under "{0}".', this.getRequestedUri()),
                type: 404
            });
            
            return false;
        } else {
            return true;
        }
    },
    
    
    /**
     * Reads params and values
     * Sets the params.
     */
    initParams: function()
    {
        var route = this.getRoute(),
            matches = route.getMatch()
            compiledRoute = this.getCompiledRoute(),
            pathVariables = compiledRoute.getPathVariables(),
            params = {};
            
           
        Ext.Object.each(matches, function(key, value) {
           
            //Ist das Objekt eine Variable des Pfades?
            if (Ext.Array.contains(pathVariables, key)) {
                    
                //Hat sie einen Wert?
                if (value) {
                    params[key] = value;
                } else {
                    //Default Wert setzen
                    params[key] = route.getDefault(key);
                }
                
            }
        });                                 
        
        this.params = params;
    },
    
    
    /**
     * Shows whether the request has parameters
     * 
     * @return {Boolean}
     */
    hasParams: function()
    {
        return (!Ext.isEmpty(this.params));    
    },
    
    
    /**
     * Returns the pramaters of request
     * 
     * @return {Object}
     */
    getParams: function()
    {
        return this.params;    
    },
    
    
    /**
     * Returns a certain parameter with that key
     * 
     * @param {String} key
     * @return {mixed}
     */
    getParam: function(key) 
    {
        if (this.hasParams()) {
            if (Ext.Object.hasKey(this.getParams(), key)) {
                return this.getParams()[key];
            }
        }
    },
   
    
    /**
     * Adds parameters to the request
     * 
     * @chainable
     * @param {Object} params
     * @return {Calc.library.routing.Request}
     */
    addParams: function(params) 
    {
        Ext.apply(this.params, params);
        return this;
    },
    
    /**
     * Changes the value of a parameter
     * 
     * @chainable
     * @param {String} key
     * @param {Mixed} value
     * @return {Calc.library.routing.Request}
     */
    setParam: function(key, value) 
    {
        if (Ext.Object.hasKey(this.getParams(), key)) {
            this.params[key] = value;
        }
        
        return this;
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
     * Sets an error object into the request
     * 
     * @param {Calc.library.error.Error} error
     */
    setError: function(error)
    {
        this.error = error;
    },
    
    
    /**
     * Builds the error object and returns it
     * 
     * @private
     * @param {Object} config
     * @return {Calc.library.error.Error}
     */
    buildError: function(config)
    {
        return Ext.create('Calc.library.error.Error', config);
    }
});