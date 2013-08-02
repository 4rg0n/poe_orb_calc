/**
 * Error Controller
 *
 * @class Calc.controller.Error
 * @extends Calc.controller.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.Error', {
    extend: 'Calc.controller.Abstract',
    
    views: [
        'error.Error'
    ],
    
    init: function()
    {

    },
    
    errorRoute: function(request)
    {
        var errorView = this.getView('error.Error').create(request.getError().getData());
        
        errorView.setData(request.getError().getData(), true);
        
        this.error(request.getError().getMsg());
        
        this.getTabPanel().addTab(errorView);
    }
});
