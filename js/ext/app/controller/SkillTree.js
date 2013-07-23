Ext.define('Calc.controller.SkillTree', {
    extend: 'Calc.controller.Abstract',
    
    views: [
        'skilltree.Form'
    ],
    
    refs: [{
        ref: 'skilltreeForm',
        selector: 'calc-skilltree-form'
    }],
    
    services: {
        'skilltree': 'Calc.service.skilltree.SkillTree'
    },
    
    init: function()
    {
        this.control({
            'calc-skilltree-form button[action="generate"]': {
                click: this.generate
            }
        });
    },
    
    generate: function()
    {
        console.log(this.get('skilltree'))        
    }
});