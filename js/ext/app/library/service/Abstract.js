/**
 * Abstract Service Class
 * 
 * @class Calc.library.service.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.service.Abstract', {
    
    /**
     * Show if the class is a service
     * 
     * @property {Boolean} isService
     */
    isService: true,
    
    
    /**
     * Model of the service
     * 
     * @property {Calc.library.service.Model} model 
     */
    model: null,
    
    
    /**
     * Return the model
     * 
     * @return {Calc.library.service.Model}
     */
    getModel: function()
    {
        return this.model;
    },
    
    
    /**
     * Removes one service from the service collection
     */
    destroy: function()
    {
        Service.getStore().remove(this.getModel());
        this.getModel().destroy();
    }
});