/**
 * Info Container
 *
 * @xtype calc-skilltree-container-info
 *
 * @class Calc.view.skilltree.container.Info
 * @extends Calc.view.skilltree.container.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.Info', {
    extend: 'Calc.view.skilltree.container.Abstract',
    alias: 'widget.calc-skilltree-container-info',

    loader: {
        url: Calc.appFolder + '/template/skilltree/info.html',
        autoLoad: true,
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});