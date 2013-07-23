/**
 * Store for Service Collection
 *
 * @class Calc.library.service.Store
 * @extends Ext.data.Store
 * @uses Calc.library.service.Model
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.service.Store', {
    extend: 'Ext.data.Store',
    uses: ['Calc.library.service.Model'],
    model: 'Calc.library.service.Model',
    autoLoad: false
});