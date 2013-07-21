/**
 * Ord Grid Infobox
 *
 * @class Calc.view.orb.InfoBox
 * @extends Ext.container.Container
 * @mixin Calc.library.mixin.Template
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.orb.InfoBox', {
    extend: 'Ext.container.Container',
    alias: 'widget.calc-orb-info-box',

    mixins: [
        'Calc.library.mixin.Template'
    ],

    loader: {
        url:'js/ext/app/template/orb/InfoBox.html',
        autoLoad: true,
        renderer: Calc.library.util.XTemplateRenderer.loader
    }
});
