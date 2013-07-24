/**
 * Abstract Container
 *
 * @class Calc.view.skilltree.container.Abstract
 * @extends Ext.container.Container
 * @mixin Calc.library.mixin.Template
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.Abstract', {
    extend: 'Ext.container.Container',

    mixins: [
        'Calc.library.mixin.Template'
    ],

    styleHtmlContent: true,
    margin: 10
});