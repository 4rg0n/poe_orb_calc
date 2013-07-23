/**
 * Service model
 *
 * @class Calc.library.service.Model
 * @extends Ext.data.Model
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.service.Model', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'key', type: 'string'},
        {name: 'service', type: 'auto'},
        {name: 'scope', type: 'auto'},
        {name: 'config', type: 'auto'},
        {name: 'isInstanciated', type: 'boolean', defaultValue: false}
    ],
    
    isInstanciated: function()
    {
        return this.get('isInstanciated');
    }
});
