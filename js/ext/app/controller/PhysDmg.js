/**
 * PhysDmg Controller
 *
 * @class Calc.controller.PhysDmg
 * @extends Calc.controller.Abstract
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.controller.PhysDmg', {
    extend: 'Calc.controller.Abstract',

    views: [
        'phys-dmg.Form'
    ],
    
    refs: [{
        ref: 'physDmgForm',
        selector: 'calc-phys-dmg-form'
    }, {
        ref: 'physDmgField',
        selector: 'calc-phys-dmg-form textfield[name="physical-damage"]'
    }, {
        ref: 'attackSpeedField',
        selector: 'calc-phys-dmg-form textfield[name="attack-speed"]'
    }, {
        ref: 'resultField',
        selector: 'calc-phys-dmg-form textfield[name="result"]'
    }],


    /**
     * Delimeter to seperate the damage values
     *
     * @cfg {String} damageDelimeter
     */
    damageDelimeter: '-',


    /**
     * init
     */
    init: function()
    {
        this.control({
            'calc-phys-dmg-form textfield[name="physical-damage"]': {
                change: this.calculate
            },
            'calc-phys-dmg-form textfield[name="attack-speed"]': {
                change: this.calculate
            },
            'calc-phys-dmg-form button[action="reset"]': {
                click: this.reset
            }
        });
    },


    /**
     * Calculates the DPS
     *
     * @param {Ext.form.field.Textfield} editor
     * @param {String} newValue
     * @param {String} oldValue
     */
    calculate: function(field, newValue, oldValue)
    {
        var form = this.getPhysDmgForm(),
            physDmgField,
            attackSpeedField,
            resultField = this.getResultField(),
            physDmg = 0,
            physDmgParts = [],
            dps = 0;

        if (form.getForm().isValid()) {

            physDmgField = this.getPhysDmgField();
            attackSpeedField = this.getAttackSpeedField();

            physDmgParts = physDmgField.getValue().split(this.damageDelimeter);

            physDmg = parseInt(physDmgParts[0]) + parseInt(physDmgParts[1]);

            dps = physDmg * parseFloat(attackSpeedField.getValue());
        }

        resultField.setValue(Ext.Number.toFixed(dps, 2));
    },

    reset: function()
    {
        this.getPhysDmgForm().getForm().reset();
    }

});