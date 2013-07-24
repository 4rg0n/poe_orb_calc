/**
 * Skilltree Form
 *
 * @xtype calc-skilltree-form
 *
 * @class Calc.view.skilltree.Form
 * @extends Ext.form.Panel
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.view.skilltree.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.calc-skilltree-form',
    
    closable: false,
    
     bodyPadding: 10,
    
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
        //TODO Add more Container
        xtype: 'container',
        itemId: 'skills',
        styleHtmlContent: true,
        margin: 10
    }]
})