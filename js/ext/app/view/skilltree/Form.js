/**
 * Skilltree Form
 *
 * @xtype calc-skilltree-form
 *
 * @class Calc.view.skilltree.Form
 * @extends Ext.form.Panel
 * @requires Calc.view.skilltree.container.Info
 * @requires Calc.view.skilltree.container.Miscs
 * @requires Calc.view.skilltree.container.Keystones
 * @requires Calc.view.skilltree.container.NodeStats
 * @requires Calc.view.skilltree.container.Noteables
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.calc-skilltree-form',

    requires: [
        'Calc.view.skilltree.container.Info',
        'Calc.view.skilltree.container.Miscs',
        'Calc.view.skilltree.container.Keystones',
        'Calc.view.skilltree.container.NodeStats',
        'Calc.view.skilltree.container.Notables'
    ],
    
    closable: false,
    
    bodyPadding: 10,
    autoScroll: true,
    
    title: Calc.Language.translate('Skill Tree') + ' (Beta)',
     
    items: [{
        xtype: 'fieldset',
        defaultType: 'textfield',
        padding: 5,
        
        //TODO Regex Validierung
        items: [{
            name: 'skilltree-url',
            fieldLabel: Calc.Language.translate('Skill Tree URL'),
            allowBlank: false,
            width: 600
        }]
    }, {
        xtype: 'button',
        text: Calc.Language.translate('generate', null, true),
        action: 'generate',
        formBind: true
    }, {
        xtype: 'calc-skilltree-container-info'
    }, {
        xtype: 'calc-skilltree-container-miscs'
    }, {
        xtype: 'calc-skilltree-container-notables'
    }, {
        xtype: 'calc-skilltree-container-keystones'
    }, {
        xtype: 'calc-skilltree-container-node-stats'
    }]
})