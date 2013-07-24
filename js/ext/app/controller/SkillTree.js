/**
 * Skilltree Controller
 *
 * @class Calc.controller.SkillTree
 * @extends Calc.controller.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.SkillTree', {
    extend: 'Calc.controller.Abstract',
    
    views: [
        'skilltree.Form'
    ],
    
    refs: [{
        ref: 'skilltreeForm',
        selector: 'calc-skilltree-form'
    }, {
        ref: 'urlField',
        selector: 'calc-skilltree-form textfield[name="skilltree-url"]'
    }, {
        ref: 'skillContainer',
        selector: 'calc-skilltree-form container[itemId="skills"]'
    }],
    
    services: {
        'skilltree': 'Calc.service.skilltree.SkillTree'
    },


    /**
     * init
     */
    init: function()
    {
        this.control({
            'calc-skilltree-form button[action="generate"]': {
                click: this.generate
            },
            'calc-skilltree-form': {
                activate: this.loadNodes
            }
        });
    },


    /**
     * Encodes the given URL
     */
    generate: function()
    {
        var field = this.getUrlField(),
            skillContainer = this.getSkillContainer();
        try {
            var skills = this.get('skilltree').getSkillsFromUrl(field.getValue());
        } catch(err) {
            err.log();
        }

        skillContainer.update('Doesn\'t work yet, sorry =(');
    },


    /**
     * Loads all Data about the Skilltree when tab is activated
     *
     * @param {Calc.view.skilltree.Form} form
     */
    loadNodes: function(form)
    {
        var skillTreeService = this.get('skilltree');

        if (false === skillTreeService.isReady) {

            form.getEl().mask('Loading all damn possibile TreeNodes...');

            skillTreeService.init(function() {
                form.getEl().unmask();
            });
        }
    }
});