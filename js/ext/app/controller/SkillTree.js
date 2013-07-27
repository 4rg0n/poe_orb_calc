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
            'calc-skilltree-form textfield[name="skilltree-url"]': {
                specialkey: this.onKey
            },
            'calc-skilltree-form': {
                activate: this.loadNodes
            }
        });
    },


    /**
     * When a key is pressed
     * When key is ENTER, executes generate()
     *
     * @param {Ext.form.field.Text} field
     * @param {Ext.EventObject} e
     */
    onKey: function(field, e)
    {
        if (e.getKey() == e.ENTER) {
            this.generate();
        }
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
        var infoCon = this.getInfoContainer(),
            keystonesCon = this.getKeystonesContainer(),
            miscsCon = this.getMiscsContainer(),
            nodeStatsCon = this.getNodeStatsContainer(),
            notablesCon = this.getNotablesContainer();

        console.log(skills);

        keystonesCon.setData(skills.keystones, true);
        miscsCon.setData(skills.miscs, true);
        notablesCon.setData(skills.notables, true);


        var nodeStats = this._buildNodeStats(skills.nodeStats);

        nodeStatsCon.setData(nodeStats, true);
    },


    _buildNodeStats: function(nodeStats) {

        var newNodeStats = {
            keystones: [],
            notables: [],
            miscs: []
        };

        nodeStats.each(function(nodeStat) {

            if (nodeStat.ks) {
                newNodeStats.keystones.push(nodeStat);
            } else if(nodeStat.not) {
                newNodeStats.notables.push(nodeStat);
            } else {
                newNodeStats.miscs.push(nodeStat);
            }
        });

        return newNodeStats;
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