/**
 * Noteables Container
 *
 * @xtype calc-skilltree-container-notables
 *
 * @class Calc.view.skilltree.container.Noteables
 * @extends Calc.view.skilltree.container.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.Notables', {
    extend: 'Calc.view.skilltree.container.Abstract',
    alias: 'widget.calc-skilltree-container-notables',

    loader: {
        url: Calc.appFolder + '/template/skilltree/Notables.html',
        autoLoad: true,
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});