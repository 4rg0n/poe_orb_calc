/**
 * Routing Controller
 *
 * @class Calc.controller.Routing
 * @extends Calc.controller.Abstract
 * @uses Calc.library.routing.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.Routing', {
    extend: 'Calc.controller.Abstract',
    
    uses: [
        'Calc.library.routing.Exception'
    ],
    
    
    /**
     * Holds the request object
     * 
     * @property {Calc.library.routing.Request} request 
     */
    request: null,
    
    
    /**
     * init
     */
    init: function()
    {
        //Listen when url changes
        Calc.Routing.history.on('change', this.buildRequest, this);
    },
    
    
    /**
     * Creates a request object and pass it to the exec method
     */
    buildRequest: function()
    {
        this.request = Calc.Routing.getRequest();
        
        this.exec(this.request);
    },
    
    /**
     * Executes an function in a controller
     * 
     * @param {Calc.library.routing.Request} request
     * @param {String} [controllerName]
     * @param {String} [actionName]
     * @throws {Calc.routing.Exception}
     */
    exec: function(request, controllerName, actionName)
    {
        if (request) {
            var controllerName = controller || request.getRoute().getController(),
                actionName = actionName || request.getRoute().getAction();
            
            var controller = this.getController(controllerName);
            
            //No controller found?
            if (!controller) {
                
                throw new Calc.routing.Exception(
                    Ext.String.format('Controller "{0}" was not found.', controllerName)
                );
              
                return;
            }
            
            //Does function in controller exists??
            if (typeof eval('controller.' + actionName) === 'function') {
                //Execute function
                
                eval('controller.' + actionName + '(request)');
            } else {
                throw new Calc.routing.Exception(
                    Ext.String.format('Controller "{0}" has no method "{1}".', controllerName, actionName)
                );
            }
                
        } else {
            throw new Calc.routing.Exception(
                'Can not exec() without a request object.'
            );
        }
    }
});