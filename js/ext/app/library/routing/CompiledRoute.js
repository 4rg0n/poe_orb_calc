/**
 * Compiled Route
 * 
 * Contains information about compiled route
 *
 * @class Calc.library.routing.CompiledRoute
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.CompiledRoute', {
    
    /**
     * @property {String} staticPrefix
     */
    staticPrefix: null,
    
    
    /**
     * Contains regular expression of the path
     * 
     * @property {String} regex 
     */
    regex: null,
    
    
    /**
     * Contains all tokens of the path and some information about them
     * 
     * @example
     *  
     *  token.id: {
     *      type: 'variable',
     *      seperator: '/'
     *      regex: '//d+'
     *  }
     * 
     * 
     * @property {Object} tokens 
     */
    tokens: null,
    
    
    /**
     * Contains all variables of the path
     * 
     * @property {String[]} pathVariables  
     */
    pathVariables: null,
    
    
    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function(config)
    {
        Ext.apply(this, config);
    },
    
    
    /**
     * Returns the static prefix
     * 
     * @return {String}
     */
    getStaticPrefix: function()
    {
        return this.staticPrefix;
    },
    
    
    /**
     * Returns the regular expression of the path
     * 
     * @return {String}
     */
    getRegex: function()
    {
        return this.regex;
    },
    
    
    /**
     * Returns the tokens
     * 
     * @return {Object}
     */
    getTokens: function()
    {
        return this.tokens;
    },
    
    
    /**
     * Returns all path variables
     * 
     * @return {String[]}
     */
    getPathVariables: function()
    {
        return this.pathVariables;
    }
    
});