/**
 * Adds methods to Ext.Array
 *
 * @class Calc.library.Object
 * @overrides Ext.Array
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.override.Array', {
    override: 'Ext.Array',

    /**
     * Compares two arrays
     *
     * @param {Array} array1
     * @param {Array} array2
     * @returns {Boolean}
     */
    equals: function(array1, array2) {
        var len1 = array1.length,
            len2 = array2.length,
            i;

        // Short circuit if the same array is passed twice
        if (array1 === array2) {
            return true;
        }

        if (len1 !== len2) {
            return false;
        }

        for (i = 0; i < len1; ++i) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }

        return true;
    }
});