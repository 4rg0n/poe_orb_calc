/**
 * Skilltree Node Model
 *
 * @class Calc.service.skilltree.node.Model
 * @extends Ext.data.Model
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.service.skilltree.node.Model', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'ks', type: 'boolean'},
        {name: 'not', type: 'boolean'},
        {name: 'dn', type: 'string'},
        {name: 'sd', type: 'auto'},
        {name: 'icon', type: 'string'}
    ]
});
