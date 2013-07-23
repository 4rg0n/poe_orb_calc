Ext.define('Calc.service.skilltree.SkillTree', {
    extend: 'Calc.library.service.Abstract',
    
    uses: [
        'Calc.library.Base64'
    ],
    
    encode: function(hashCode)
    {
        var decodedData = Calc.Base64.decode(hashCode.replace(/-/g, "+").replace(/_/g, "/")),
            versionOffset = 0, 
            classOffset = 4, 
            fullscreenOffset = 5, 
            hashesOffset = 6,
            treeVersion = this._readInt32(versionOffset, decodedData);
            
        console.log(treeVersion, decodedData);    
    },
    
    
    _readInt: function(arrURL, position, dataString)
    {
        arrURL = arrURL || 4;
    
        var decodedData = position + arrURL,
            n = [];
        
        if (decodedData > dataString.length) {
            throw "Integer read exceeds bounds";      
        }
        
        for (; position < decodedData; ++position) {
            n.push(dataString.charAt(position).charCodeAt(0));
        }
        
        return this._bytesToInt(n, arrURL);
    },
    
    
    _readInt8: function(position, dataString)
    {
      return this._readInt(1, position, dataString);
    },
    
    
    _readInt16: function(position, dataString)
    {
      return this._readInt(2, position, dataString);
    },
    
    
    _readInt32: function(position, dataString)
    {
      return this._readInt(4, position, dataString);
    },
    
    
    _bytesToInt: function(arrURL, decodedData)
    {
        decodedData = decodedData || 4;
        var n = 0;
        for (var r = 0; r < decodedData; ++r) {
            n += arrURL[r], r < decodedData - 1 && (n <<= 8);
        }
        return n;
    }
});