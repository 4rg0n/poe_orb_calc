/**
 * Keystones Container
 *
 * @xtype calc-skilltree-container-keystones
 *
 * @class Calc.view.skilltree.container.Keystones
 * @extends Calc.view.skilltree.container.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.Keystones', {
    extend: 'Calc.view.skilltree.container.Abstract',
    alias: 'widget.calc-skilltree-container-keystones',

    loader: {
        url: Calc.appFolder + '/template/skilltree/Keystones.html',
        autoLoad: true,
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});