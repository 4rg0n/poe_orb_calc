/**
 * Language Store
 *
 * @class Calc.library.language.Store
 * @extends Ext.data.Store
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.language.Store', {
    extend: 'Ext.data.Store',

    storeId: 'language',

    uses: [
        'Calc.library.language.Model'
    ],

    model: 'Calc.library.language.Model',

    proxy: {
        type: 'ajax',
        url: Calc.appFolder + '/data/lang.xml',
        reader: {
            type: 'xml',
            record: 'lang',
            root: 'body',
            idProperty: 'en'
        }
    },

    autoLoad: false,
    clearOnLoad: true
});