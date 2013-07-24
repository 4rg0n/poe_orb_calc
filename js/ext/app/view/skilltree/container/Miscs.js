/**
 * Miscs Container
 *
 * @xtype calc-skilltree-container-miscs
 *
 * @class Calc.view.skilltree.container.Miscs
 * @extends Calc.view.skilltree.container.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.Miscs', {
    extend: 'Calc.view.skilltree.container.Abstract',
    alias: 'widget.calc-skilltree-container-miscs',

    loader: {
        url: Calc.appFolder + '/template/skilltree/Miscs.html',
        autoLoad: true,
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});