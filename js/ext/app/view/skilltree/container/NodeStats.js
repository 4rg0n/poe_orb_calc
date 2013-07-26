/**
 * Node Stats Container
 *
 * @xtype calc-skilltree-container-node-stats
 *
 * @class Calc.view.skilltree.container.NodeStats
 * @extends Calc.view.skilltree.container.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.container.NodeStats', {
    extend: 'Calc.view.skilltree.container.Abstract',
    alias: 'widget.calc-skilltree-container-node-stats',

    loader: {
        url: Calc.appFolder + '/template/skilltree/NodeStats.html',
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});