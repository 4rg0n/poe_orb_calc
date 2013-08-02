/**
 * Routen Collection (Store)
 * 
 * @class Calc.library.routing.Routes
 * @uses Calc.library.routing.Route
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.Routes', {
    extend: 'Ext.data.Store',
    
    uses: [
        'Calc.library.routing.Route',
        'Calc.library.error.ErrorManager'
    ],
    
    /**
     * Shows if config is vlaid
     * 
     * @property {Boolean} isValid
     */
    isValid: true,
    
    model: 'Calc.library.routing.Route',
    
    proxy: {
        type: 'ajax',
        url: Calc.appFolder + '/config/routing.json',
        reader: {
            type: 'json',
            root: 'routes',
            idProperty: 'id'
        }
    },
    
    
    /**
     * @constructor
     */
    constructor: function()
    {
        this.callParent(arguments);
        
        this.addListener('load', this.onLoad);
    },
    
    
    /**
     * Executes when config loading is finished.
     * Validates routes.
     * 
     * @param {Calc.library.routing.Routes} store
     * @param {Calc.library.routing.Route[]} routes
     */
    onLoad: function(store, routes)
    {
        try {
            this.validate(routes);
        } catch (err) {
            Calc.ErrorManager.log(err);            
        }
    },
    
    
    /**
     * Validates all routes
     * 
     * @param {Calc.library.routing.Route[]} routes
     */
    validate: function(routes)
    {
        var routes = routes || this.getRange();
        
        Ext.Array.each(routes, function(route) {
            try {
                route.validate();
            } catch(ex) {
                this.setValid(false);
                
                throw new Calc.routing.Exception(
                    Ext.String.format('Validation of route "{0}" failed', route.getId()),
                    ex
                );
            }
        });
    },
    
    
    /**
     * Sets isValid true or false
     * 
     * @param {Boolean} bool
     */
    setValid: function(bool)
    {
        this.isValid = bool;
    },
   
    
    /**
     * Returns route with id
     * 
     * @param {String} id
     * @return {Calc.library.routing.Route}
     */
    getRoute: function(id)
    {
        return this.getById(id);
    }
});