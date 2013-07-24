/**
 * Base64 encoding and decoding
 *
 * @class Calc.library.Base64
 * @singleton
 * @alternateClassName Calc.Base64
 * @uses Calc.library.exception.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.Base64', {
    alternateClassName: 'Calc.Base64',
    
    singleton: true,

    uses: [
        'Calc.library.exception.Exception'
    ],

    padChar: '=',
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"',
    
    /**
     * @private
     * 
     * @param {} s
     * @param {} i
     * @return {}
     */
    _getbyte64: function(s, i) 
    {
        var idx = this.alpha.indexOf(s.charAt(i));
        if (idx === -1) {
            throw new Calc.Exception('Cannot decode base64');
        }
        return idx
    },
    
    
    /**
     * @param {} s
     * @return {}
     */
    decode: function (s) 
    {
        var pads = 0,
            i, b10, imax = s.length,
            x = [];
            s = String(s);
            
        if (imax === 0) {
            return s
        }
        
        if (imax % 4 !== 0) {
            throw new Calc.Exception('Cannot decode base64');
        }
        
        if (s.charAt(imax - 1) === this.padChar) {
            pads = 1;
            if (s.charAt(imax - 2) === this.padChar) {
                pads = 2
            }
            imax -= 4
        }
        
        for (i = 0; i < imax; i += 4) {
            b10 = (this._getbyte64(s, i) << 18) | (this._getbyte64(s, i + 1) << 12) | (this._getbyte64(s, i + 2) << 6) | this._getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255))
        }
        
        switch (pads) {
            case 1:
                b10 = (this._getbyte64(s, i) << 18) | (this._getbyte64(s, i + 1) << 12) | (this._getbyte64(s, i + 2) << 6);
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
                break;
            case 2:
                b10 = (this._getbyte64(s, i) << 18) | (this._getbyte64(s, i + 1) << 12);
                x.push(String.fromCharCode(b10 >> 16));
                break
        }
        
        return x.join("")
    },
    
    /**
     * @private
     * 
     * @param {} s
     * @param {} i
     * @return {}
     */
    _getbyte: function(s, i) 
    {
        var x = s.charCodeAt(i);
        if (x > 255) {
            throw new Calc.Exception('INVALID_CHARACTER_ERR: DOM Exception 5');
        }
        return x
    },
    
    /**
     * 
     * @param {} s
     * @return {}
     */
    encode: function(s) 
    {
        if (arguments.length !== 1) {
            throw new Calc.Exception('SyntaxError: exactly one argument required');
        }
        
        s = String(s);
        
        var i, b10, x = [],
            imax = s.length - s.length % 3;
            
        if (s.length === 0) {
            return s
        }
        
        for (i = 0; i < imax; i += 3) {
            b10 = (this._getbyte(s, i) << 16) | (this._getbyte(s, i + 1) << 8) | this._getbyte(s, i + 2);
            x.push(this.alpha.charAt(b10 >> 18));
            x.push(this.alpha.charAt((b10 >> 12) & 63));
            x.push(this.alpha.charAt((b10 >> 6) & 63));
            x.push(this.alpha.charAt(b10 & 63))
        }
        
        switch (s.length - imax) {
            case 1:
                b10 = _getbyte(s, i) << 16;
                x.push(this.alpha.charAt(b10 >> 18) + this.alpha.charAt((b10 >> 12) & 63) + this.padChar + this.padChar);
                break;
                
            case 2:
                b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
                x.push(this.alpha.charAt(b10 >> 18) + this.alpha.charAt((b10 >> 12) & 63) + this.alpha.charAt((b10 >> 6) & 63) + this.padChar);
                break;
        }
        
        return x.join("")
    }
});