/**
 * Noteables Container
 *
 * @xtype calc-skilltree-container-noteables
 *
 * @class Calc.view.skilltree.container.Noteables
 * @extends Calc.view.skilltree.container.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.Noteables', {
    extend: 'Calc.view.skilltree.container.Abstract',
    alias: 'widget.calc-skilltree-container-noteables',

    loader: {
        url: Calc.appFolder + '/template/skilltree/Noteables.html',
        autoLoad: true,
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});