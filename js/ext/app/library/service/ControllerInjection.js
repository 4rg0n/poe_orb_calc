/**
 * Overrides the ExtJs Controller constructor and adds some functions to it
 *  
 * @class Calc.library.service.ControllerInjection
 * @overrides Ext.app.Controller
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.service.ControllerInjection', {
    override: 'Ext.app.Controller',
    
    /**
     * Creates new Controller.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        var me = this;

        me.mixins.observable.constructor.call(me, config);

        if (me.refs) {
            me.ref(me.refs);
        }

        me.eventbus = Ext.app.EventBus;
        
        me.initAutoGetters();
        
        me.initServices();
    },
    
    
    /**
     * Adds services to the collection
     */
    initServices: function()
    {
        Calc.Service.addAll(this.services);
    },
    
    
    /**
     * Returns a service from the collection
     * 
     * @param {String} identifier
     * @param {Mixed} [scope=this]
     * @param {Boolean} [forceScope=false]
     * @return {Mixed}
     */
    get: function(identifier, scope, forceScope)
    {
        scope = scope || this;
        forceScope = forceScope || false;
        
        return Calc.Service.get(identifier, scope, forceScope);
    }
});