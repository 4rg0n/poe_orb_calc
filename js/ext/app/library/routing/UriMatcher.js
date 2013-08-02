/**
 * URI Matcher Class
 * 
 * Compares routes with generated regular expression
 * 
 * @class Calc.library.routing.UriMatcher
 * @uses Calc.library.routing.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.UriMatcher', {
    
    uses: [
        'Calc.library.routing.Exception'
    ],
    
    /**
     * Contains all routes from config
     * 
     * @cfg {Calc.library.routing.Routes} 
     */
    routes: null,
    
    
    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function(config)
    {
        Ext.apply(this, config);
    },
    
    
    /**
     * Returns route which matches to uri
     * 
     * @param {String} uri
     * @return {Calc.library.routing.Route}
     */
    match: function(uri) 
    {
        var route = null;
        
        route = this.matchRoutes(uri);
        
        return route;
    },
    
    
    /**
     * Searches matching route by uri and returns match
     * 
     * @param {String} uri
     * @return {Calc.library.routing.Route}
     */
    matchRoutes: function(uri)
    {
        var routes = this.routes,
            matchedRoute = null,
            compiledRoute,
            staticPrefix,
            matches;
        
        if (routes && uri) {
            
            routes.each(function(route) {
                compiledRoute = route.compile();
                staticPrefix = compiledRoute.getStaticPrefix();
                
                if ('' !== staticPrefix && uri.indexOf(staticPrefix) >= 0) {
                    //staticPrefix existiert in uri
                    
                    matches = XRegExp.exec(uri, XRegExp(compiledRoute.getRegex()));
                    
                    //Gefunden?
                    if (matches) {
                        
                        if (Ext.isEmpty(matchedRoute)) {
                            route.setMatch(matches);
                            matchedRoute = route;
                        } else {
                            new Calc.routing.Exception(
                                Ext.String.format('Two routes were found for the given uri: {0}', uri)
                            ).log();
                        }
                    }
                    
                }
            });
        }
        
        return matchedRoute;
    }
});