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
    }, {
        ref: 'formulaContainer',
        selector: 'calc-phys-dmg-form container[itemId="formula"]'
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
     */
    calculate: function()
    {
        var form = this.getPhysDmgForm(),
            physDmgField,
            attackSpeedField,
            resultField = this.getResultField(),
            formulaContainer = this.getFormulaContainer(),
            physDmg = 0,
            physDmgParts = [],
            fromDmg = 0,
            toDmg = 0,
            attackSpeed = 0.0,
            dps = 0;

        if (form.getForm().isValid()) {

            physDmgField = this.getPhysDmgField();
            attackSpeedField = this.getAttackSpeedField();

            physDmgParts = physDmgField.getValue().split(this.damageDelimeter);

            fromDmg = parseInt(physDmgParts[0]);
            toDmg = parseInt(physDmgParts[1]);
            attackSpeed = parseFloat(attackSpeedField.getValue());

            physDmg = (fromDmg + toDmg) / 2;
            dps = physDmg * attackSpeed;
        }

        //Update formula
        formulaContainer.update({
            fromDmg: fromDmg,
            toDmg: toDmg,
            attackSpeed: attackSpeed
        });

        resultField.setValue(Ext.Number.toFixed(dps, 2));
    },


    /**
     * Resets the form fields and formula
     */
    reset: function()
    {
        this.getFormulaContainer().update({
            fromDmg: 0,
            toDmg: 0,
            attackSpeed: 0.0
        });

        this.getPhysDmgForm().getForm().reset();
    },


    /**
     * Opens the physical damage form
     *
     * @param {Calc.library.routing.Request} request
     */
    openRoute: function(request)
    {
        this.open()
    },


    /**
     * Opens the physical damage form
     */
    open: function()
    {
        var physDmgForm = this.getView('phys-dmg.Form').create();
        this.getTabPanel().addTab(physDmgForm);
    }
});