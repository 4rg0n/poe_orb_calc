/**
 * Routing Class
 *
 * @class Calc.library.routing.Routing
 * @requires Ext.util.History
 * @requires Calc.library.routing.Routes
 * @requires Calc.library.routing.UriMatcher
 * @uses Calc.library.routing.Request
 * @uses Calc.library.routing.Exception
 * @alternateClassName Calc.Routing
 * @singleton
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.Routing', {
    
    alternateClassName: 'Calc.Routing',

    singleton: true,
    
    requires: [
        'Ext.util.History',
        'Calc.library.routing.Routes',
        'Calc.library.routing.UriMatcher'
    ],
    
    uses: [
        'Calc.library.routing.Exception',
        'Calc.library.routing.Request'
    ],

    
    /**
     * ExtJs History
     * 
     * @property {Ext.util.History} history 
     */
    history: null,
   
    /**
     * Path to routing config file
     * 
     * @cfg {String} [routingConfigPath=Calc.appFolder + "/config/routing.jso"]
     */    
    routingConfigPath: Calc.appFolder + '/config/routing.json',
    
    
    /**
     * Hashbang
     * 
     * @cfg {String} [hashbang="#!"]
     */
    hashbang: '#!',
    
    
    /**
     * Routes store
     * 
     * @property {Calc.library.routing.Routes} routes 
     */
    routes: null,
    
    
    /**
     * Uri Matcher for matching routes
     * 
     * @property {Calc.library.routing.UriMatcher} matcher
     */
    matcher: null,
    
    
    /**
     * Name of controller which will executes the routes
     * 
     * @cfg {String} routingController
     */
    routingController: 'Calc.controller.Routing',
    
    
    /**
     * @constructor
     */
    constructor: function()
    {
        this.history = Ext.util.History;
    },
    
    /**
     * Init
     * 
     * @param {Function} callback
     */
    init: function(callback)
    {
        this.history.init();
        this.initMatcher();
        this.initRoutes(callback);
    },
    
    /**
     * Inits store with routes
     */
    initRoutes: function(callback)
    {
        this.routes = Ext.create('Calc.library.routing.Routes');
        
        this.routes.load(function(routes, operation, success) {
            if (typeof callback == 'function') {
                callback(success);
            }
        })
    },
    
    
    /**
     * inits matcher
     */
    initMatcher: function()
    {
        this.matcher = Ext.create('Calc.library.routing.UriMatcher', {
            routes: this.routes
        });
    },
    

    /**
     * Generates a route path string from given object
     *
     *      @example
     *      Routing.generate({
     *          module: 'rest',
     *          controller: 'user',
     *          action: 'list'
     *      });
     *
     *      -> gibt "rest/user/list/" zurück
     *
     *
     *      @example
     *      Routing.generate({
     *          module: 'rest',
     *          controller: 'user',
     *          action: 'list'
     *      }, {
     *          id: 1,
     *          name: 'test'
     *      });
     *
     *      -> gibt "rest/user/list/id/1/name/test/" zurück
     *
     * @param {String/Object} route
     * @param {Object} [params]
     * @return {String}
     */
    generate: function(route, params)
    {
        var uri = '',
            params = params || null;

        if (Ext.isObject(route)) {

            //Route object validation
            if (this._validateRouteObj(route)) {
                Ext.Object.each(route, function(field, value) {
                    uri += value.toLowerCase() + '/';
                });
            }
        } else if (Ext.isString(route)) {

            uri = route.toLowerCase();
        }

        if (uri && params) {
            uri = this.appendParams(uri, params);
        }

        return uri;
    },


    /**
     * Validates the route object
     *
     * @private
     * @param {Object} route
     * @throws Calc.routing.Exception
     * @return {Boolean}
     */
    _validateRouteObj: function(route) {

        var fields = ['module', 'controller', 'action'],
            i = 0,
            invalidFields = [],
            emptyFields = [],
            valid = true;

        Ext.Object.each(route, function(field, value) {
            //are fieldnames correct?
            if (field !== fields[i]) {
                invalidFields.push(field);
            }

            //Hat das Feld einen Wert?
            if (Ext.isEmpty(value)) {
                emptyFields.push(field);
            }

            i++;
        });

        //Fehlerausgabe invalide Felder
        if (invalidFields.length > 0) {
            valid = false;
            
            throw new Calc.routing.Exception(
                Ext.String.format('Following fields are unknown or a wrong name: {0}', invalidFields.join(', '))
            );
        }

        //Fehlerausgabe leere Felder
        if (emptyFields.length > 0) {
            valid = false;
            
            throw new Calc.routing.Exception(
                Ext.String.format('Following fields have no value: {0}', emptyFields.join(', '))
            );
        }

        return valid;
    },


    /**
     * Appends parameters to URI
     *
     * @param {String} uri
     * @param {Object} params
     * @return {String}
     */
    appendParams: function(uri, params)
    {
        Ext.Object.each(params, function(field, value) {
            uri += field + '/' + value + '/';
        });

        return uri;
    },
    
    
    /**
     * Gets hash from URI
     * 
     * @return {String}
     */
    getUriString: function()
    {
        var hash = this.getHash(),
            uriString = hash.substr(hash.indexOf(this.hashbang) + this.hashbang.length);
        
        uriString = uriString || '/';    
            
        return uriString;
    },
    
    
    /**
     * Returns window location hash
     * 
     * @return {String}
     */
    getHash: function()
    {
        return window.location.hash;
    },
    
    
    /**
     * Retruns matching request to URI
     * 
     * @return {Calc.library.routing.Request}
     */
    getRequest: function()
    {
        var uri = this.getUriString(),
            
            route = this.getMatcher().match(uri),   
        
            request = this.buildRequest({
                route: route
            });
        
        return request;
    },
    
    
    /**
     * Returns matcher
     * 
     * @return {Calc.library.routing.UriMatcher}
     */
    getMatcher: function()
    {
        return this.matcher;
    },
    
    
    /**
     * Returns store with routes
     * 
     * @return {Calc.library.routing.Routes}
     */
    getRoutes: function()
    {
        return this.routes;
    },
    
    
    /**
     * Builds new request object
     * 
     * @param {Object} config
     * @return {Calc.library.routing.Request}
     */
    buildRequest: function(config)
    {
        config.requestedUri = this.getUriString();
        
        return Ext.create('Calc.library.routing.Request', config);
    },
    
    
    /**
     * Executes a request
     * 
     * @param {Calc.library.routing.Request} request
     */
    execRequest: function(request)
    {
        Calc.app.getController(this.routingController).exec(request);    
    }
});
