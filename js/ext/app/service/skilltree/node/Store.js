/**
 * Skilltree Node Store
 *
 * @class Calc.service.skilltree.node.Store
 * @extends Ext.data.Store
 * @uses Calc.service.skilltree.node.Model
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.service.skilltree.node.Store', {
    extend: 'Ext.data.Store',

    uses: ['Calc.service.skilltree.node.Model'],
    model: 'Calc.service.skilltree.node.Model',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: Calc.appFolder + '/data/skilltree.json',
        reader: {
            type: 'json'
        }
    }
});

