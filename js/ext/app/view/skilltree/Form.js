Ext.define('Calc.view.skilltree.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.calc-skilltree-form',
    
    closable: false,
    
     bodyPadding: 10,
    
    title: Calc.Language.translate('Skill Tree'),
     
    items: [{
        xtype: 'fieldset',
        defaultType: 'textfield',
        padding: 5,
        
        //TODO Regex Validierung
        items: [{
            name: 'skilltree-url',
            fieldLabel: Calc.Language.translate('skilltree URL', null, true),
            allowBlank: false,
            width: 600
        }]
    }, {
        xtype: 'button',
        text: Calc.Language.translate('generate', null, true),
        action: 'generate',
        formBind: true
    }]
})