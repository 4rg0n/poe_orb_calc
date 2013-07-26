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
        ref: 'infoContainer',
        selector: 'calc-skilltree-form calc-skilltree-container-info'
    }, {
        ref: 'keystonesContainer',
        selector: 'calc-skilltree-form calc-skilltree-container-keystones'
    }, {
        ref: 'miscsContainer',
        selector: 'calc-skilltree-form calc-skilltree-container-miscs'
    }, {
        ref: 'nodeStatsContainer',
        selector: 'calc-skilltree-form calc-skilltree-container-node-stats'
    }, {
        ref: 'notablesContainer',
        selector: 'calc-skilltree-form calc-skilltree-container-notables'
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
            skills;
        try {
            skills = this.get('skilltree').getSkillsFromUrl(field.getValue());
        } catch(err) {
            err.log();
        }

        this.update(skills);
    },

    update: function(skills)
    {
        console.log(skills);
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