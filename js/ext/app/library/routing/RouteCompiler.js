/**
 * Route Compiler
 * 
 * @class Calc.library.routing.Route
 * @uses Calc.library.routing.CompiledRoute
 * @uses Calc.library.routing.Exception
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.RouteCompiler', {
    
    uses: [
        'Calc.library.routing.CompiledRoute',
        'Calc.library.routing.Exception'
    ],
    
    statics: {
        
        regexDelimeter: '/',
        
        
        /**
         * Compiles a route
         * 
         * @param {Calc.library.routing.Route} route
         * @throws Calc.route.Exception
         * @return {Calc.library.routing.CompiledRoute}
         */
        compile: function(route)
        {
            var staticPrefix,
                regex,
                tokens,
                pathVariables,
                result;
                
            try {    
                
                result = this.compilePattern(route); 
                return Ext.create('Calc.library.routing.CompiledRoute', result);
                
            } catch(ex) {
                throw new Calc.routing.Exception(
                    Ext.String.format('Something went wrong while compiling the route: "{0}"', route.getId()),
                    ex
                )
            }
        },
        
        /**
         * Black magic voodoo stuff
         * 
         * @param {Calc.library.routing.Route} route
         * @throws Calc.routing.Exception}
         * @return {Object}
         */
        compilePattern: function(route)
        {
            var tokens = {},
                variables = [],
                varRegex = new RegExp('\{\(.*?)\}', 'g'), //findet alles zwischen {}
                matches = {},
                pattern = route.getPattern(),
                seperator = '/',
                pos = 0,
                me = this,
                isSeperator = false,
                firstOptional = null,
                varName, varNames, regexp, match, precedingText, precedingChar;
                
            //Search all variable names =)    
            while ((match = varRegex.exec(pattern)) !== null) {
                matches[match[1]] = {
                    match: match[0],
                    index: match.index,
                    input: match.input
                };
            }
            
            Ext.Object.each(matches, function(key, value) {
                varName = key;
                
                //Read static text infront of variable
                precedingText = pattern.substr(pos, value.index - pos);
                pos = value.index + value.match.length;
                
                //Read last letters
                if (precedingText.length > 0) {
                    precedingChar = precedingText.substr(-1);
                } else {
                    precedingChar = '';
                }
                
                //Is the last letter a delimeter?
                if (precedingChar !== '' && -1 !== precedingChar.indexOf(seperator)) {
                    isSeperator = true;
                } else {
                    isSeperator = false;
                }
                
                //Is variable name a number?
                if (Ext.isNumeric(varName)) {
                    throw new Calc.routing.Exception(
                        Ext.String.format('Variable name "{0}" of route {1} can not be numeric.', varName, pattern)
                    );
                }
                
                //Is there more than one of the names?
                if (Ext.Array.contains(variables, varName)) {
                    
                    throw new Calc.routing.Exception(
                        Ext.String.format(
                            'Variable name {0} of route {1} can not reference more then once.', varName, pattern
                        )
                    );
                }
                
                if (isSeperator && precedingText.length > 1) {
                    
                    
                    tokens[precedingText.substr(0, precedingText.length - 1)] = {
                        type: 'text'
                    };
                    
                } else if (!isSeperator && precedingText.length > 0) {
                    
                    tokens[precedingText] = {
                        type: 'text'
                    };
                                      
                }
                
                regexp = route.getRequirement(varName);
                              
                //Variable
                tokens[varName] = {
                    type: 'variable',
                    seperator: (isSeperator) ? precedingChar : '',
                    regexp: regexp || '\\w+'
                };
         
                Ext.Array.push(variables, varName);
            });
            
            //Save rest as text
            if (pos < pattern.length) {
                tokens[pattern.substr(pos)] = {
                    type: 'text'
                }
            }
            
            //Find first optional token (backwards)
            var keys = [], n;
            
            for (var k in tokens) {
                keys.unshift(k);
            }

            for (var c = keys.length,  n = 0; n < c; n++) {
                if (tokens[keys[n]].type === 'variable' && route.hasDefault(keys[n])) {
                    firstOptional = n;
                } 
            }
            
            regexp = '';
            
            var i = 0;
            
            Ext.Object.each(tokens, function(key, value) {
                regexp += me.computeRegexp(route, tokens, key, i, firstOptional);
                i++;
            });
            
            var result = {};
           
            
            Ext.Object.each(tokens, function(key, value) {
                
                if ('text' === value.type) {
                    result.staticPrefix = key;
                } else {
                    result.staticPrefix = '';
                }
                
                return false;
            });
            
            result.regex = '^' + regexp + '$';
            result.tokens = Ext.Object.reverse(tokens);
            result.pathVariables = variables;
            
            return result;
        },
        
        
        /**
         * Creates the regular expression
         * 
         * @param {Calc.library.routing.Route} route
         * @param {Object} tokens
         * @param {String} key
         * @param {Number} index
         * @param {Number} firstOptional
         * @return {String}
         */
        computeRegexp: function(route, tokens, key, index, firstOptional)
        {
            var token = tokens[key], 
                regexp, tokensAmount;
                
            if (token.type === 'text') {
                //Text tokens
                return key;
            } else {
                //Variable tokens
                
                if (index === 1 && firstOptional === 0) {
                    
                    regexp = Ext.String.format(
                        '(?:{0}?)(:?(?<{1}>{2})?)',
                        token.seperator,
                        key,
                        token.regexp
                    );
                    
                } else {
                    regexp = Ext.String.format(
                        '{0}(?<{1}>{2})',
                        token.seperator,
                        key,
                        token.regexp
                    );
                    
                    //Has the token a default value?
                    if (route.hasDefault(key)) {
                        regexp = '(?:' + regexp;
                        
                        tokensAmount = Ext.Object.count(tokens);
                        
                        //Is this the end?... oh god xD
                        if (tokensAmount - 1 === index) {
                            //Close optionals
                            
                            regexp += Ext.String.repeat(')?', tokensAmount - firstOptional - (0 === firstOptional ? 1 : 0));
                        }
                    }
                }
                
                return regexp;
            }
        }
    }
});