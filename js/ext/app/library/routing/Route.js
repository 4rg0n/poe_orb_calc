/**
 * Route Model
 * 
 * @class Calc.library.routing.Route
 * @uses Calc.library.routing.RouteCompiler
 * @uses Calc.library.routing.Exception
 * @uses Ext.Template
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.routing.Route', {
    extend: 'Ext.data.Model',
    
    uses: [
        'Calc.library.routing.RouteCompiler',
        'Calc.library.routing.Exception',
        'Ext.Template'
    ],
    
    /**
     * Delemiter for the controller-action format
     * 
     * @cfg {String} controllerDelimeter
     */
    controllerDelimeter: ':',
    
    
    /**
     * Suffix of the controller class name
     * 
     * @cfg {String} controllerSuffix
     */
    controllerSuffix: '',
    
    
    /**
     * Suffix of the action functions name
     * 
     * @cfg {String} actionSuffix
     */
    actionSuffix: 'Route',
    
    
    /**
     * Shows whether the route is already compiled
     * 
     * @property Boolean isCompiled
     */
    isCompiled: false,
    
    
    /**
     * Shows whether the configuration of the route is valid
     * 
     * @property {Boolean} isValid
     */
    isValid: true,
    
    
    fields: [
        { name: 'id', type: 'string' },
        { name: 'path', type: 'string' },
        { name: 'defaults', type: 'auto'},
        { name: 'requirements', type: 'auto'},
        { name: 'match', type: 'auto' },
        { name: 'compiled', type: 'auto' }
    ],
    
    /**
     * Returns the path of route
     * If an object is given, the tokens will be replaced with data from object
     *
     * @param {Ext.data.Model/Object} [object]
     * @return {String}
     */
    getPath: function(object)
    {
        var path = this.get('path'),
            tpl, data;

        if (object) {

            //Is object?
            if (Ext.isObject(object)) {
                data = object;
            }

            if (object.isModel) {
                data = object.getData();
            }

            tpl = new Ext.Template(path);
            path = tpl.apply(data);
        }

        return path;
    },
    
    /**
     * Sets the path
     * 
     * @chainable
     * @param {String} path
     * @return {Calc.library.routing.Route}
     */
    setPath: function(path)
    {
        this.set('path', path);
        
        return this;
    },
    
    
    /**
     * Returns the Path
     *
     * @param {Object/Ext.data.Model} [object]
     * @return {String}
     */
    getPattern: function(object)
    {
        return this.getPath(object);
    },
    
    
    /**
     * Sets the path
     * 
     * @chainable
     * @param {String} pattern
     * @return {Calc.library.routing.Route}
     */
    setPattern: function(pattern)
    {
        return this.setPath(pattern);
    },
    
    
    /**
     * Returns the match of the route
     * 
     * @return {Object}
     */
    getMatch: function()
    {
        return this.get('match');    
    },
    
    
    /**
     * Sets the match into the route
     * 
     * @chainable
     * @param {Object} match
     * @return {Calc.library.routing.Route}
     */
    setMatch: function(match)
    {
        this.set('match', match);
        
        return this;
    },
    
    /**
     * Returns the default configs
     * 
     * @return {Object}
     */
    getDefaults: function()
    {
        return this.get('defaults');
    },
    
    
    /**
     * Returns a certain default config 
     * 
     * @param {String} key
     * @return {String/Number}
     */
    getDefault: function(key)
    {
        var def = null;
        
        if (this.getDefaults()) {
            def =  this.getDefaults()[key];
        }
        
        return def;
    },
    
    
    /**
     * Checks if there is a default config with that key
     * 
     * @param {String} key
     * @return {Boolean}
     */
    hasDefault: function(key)
    {
        if (Ext.isEmpty(this.getDefault(key))) {
            return false;
        }
        
        return true
    },
    
    
    /**
     * Adds a default config
     * 
     * @example
     * 
     *  route.addDefaults({id: 1, lang: 'de'});
     * 
     * @chainable
     * @param {Object{}} newDefaults
     * @throws {Calc.route.Exception}
     * @return {Calc.library.routing.Route}
     */
    addDefaults: function(newDefaults) {
        
        if (Ext.isObject(newDefaults)) {
            
            var defaults = this.getDefaults();
            
            defaults = defaults || {};
            
            Ext.Object.each(newDefaults, function(key, value) {
                defaults[key] = value;
            });
            
            this.set('defaults', defaults);
            
        } else {
            throw new Calc.route.Exception('Only objects accepted.');
        }
        
        return this;
    },
    
    
    /**
     * Returns the requirements config
     * 
     * @return {Object}
     */
    getRequirements: function()
    {
        return this.get('requirements');
    },
    
    
    /**
     * Returns the requirement matching the key
     * 
     * @param {String} key
     * @return {String}
     */
    getRequirement: function(key) {
        
        var requ = null;
        
        if (this.get('requirements')) {
            requ = this.get('requirements')[key];
        }
        
        return requ;
    },
    
    
    /**
     * Checks whether a requirement with that key exists
     * 
     * @param {String} key
     * @return {Boolean}
     */
    hasRequirement: function(key) {
        
        if (Ext.isEmpty(this.getRequirement(key))) {
            return false;
        }
        
        return true;        
    },
    
    
    /**
     * Adds a new requirement
     * 
     * @example
     * 
     *  route.addRequirements({id: 'd+', lang: 'de|en'});
     * 
     * @chainable
     * @param {Object} newRequirements
     * @throws {Calc.route.Exception}
     * @return {Calc.library.routing.Route}
     */
    addRequirements: function(newRequirements)
    {
        if (Ext.isObject(newRequirements)) {
            
            var requirements = this.getRequirements()();
            
            requirements = requirements || {};
            
            Ext.Object.each(newRequirements, function(key, value) {
                requirements[key] = value;
            });
            
            this.set('requirements', requirements);
            
        } else {
            throw new Calc.route.Exception('Only objects accepted.');
        }
        
        return this;
    },
    
    /**
     * Returns the _controller config
     * 
     * @private
     * @return {String}
     */
    getControllerPattern: function()
    {
        var controllerPattern = '';
       
        if (this.getDefaults()) {
            controllerPattern = this.getDefaults()._controller;
        }
        
        return controllerPattern || '';    
    },
    
    
    /**
     * Returns the name of the controller
     * 
     * @return {String}
     */
    getController: function()
    {
        var controllerPattern = this.getControllerPattern(),
            controllerName = controllerPattern.split(this.controllerDelimeter)[0];
            
            
            if (controllerName) {
                controllerName = this._buildName(controllerName, this.controllerSuffix);
            }
        
        return Ext.String.capitalize(controllerName);
    },
    
    
    /**
     * Gibt den Namen der Route Methode zurück zurück
     * 
     * @return {String}
     */
    getRoute: function()
    {
        var controllerPattern = this.getControllerPattern(),
            routeName = controllerPattern.split(this.controllerDelimeter)[1];
            
            if (routeName) {
                routeName = this._buildName(routeName, this.actionSuffix);
            }
        
        return routeName;
    },
    
    
    /**
     * Builds the name of the controller / action
     * 
     * @private
     * @param {String} name
     * @param {String} suffix
     * @return {String}
     */
    _buildName: function(name, suffix)
    {
        var index = name.indexOf(suffix)
        
        //Suffix present in name?        
        if (index < 0) {
            name += suffix;
        } else {
            
            //Does suffix stand at the end?
            if((index + suffix.length) != name.length) {
                name += suffix;
            }
        }
        
        return name;
    },
    
    
    /**
     * Returns the name of the route function
     * 
     * @return {String}
     */
    getAction: function()
    {
        return this.getRoute();
    },

    
    /**
     * Compiles the route or returns the already compiled route
     * 
     * @return {Calc.library.routing.CompiledRoute}
     */
    compile: function()
    {
        if (this.isCompiled) {
            return this.get('compiled');
        } else {
            var compiled = Calc.library.routing.RouteCompiler.compile(this);
            
            this.set('compiled', compiled);
            this.isCompiled = true;
            
            return compiled;
        }
    },
    
    
    /**
     * Validates the route
     * 
     * @throws {Calc.route.Exception}
     */
    validate: function()
    {
        var controllerPattern = this.getControllerPattern(),
            id = this.get('id'),
            propertyError = 'Property "{0}" can not be empty.';
        
        if (Ext.isEmpty(id)) {
            
            throw new Calc.route.Exception(
                Ext.String.format(propertyError, 'id')
            );
       
            this.setValid(false);
            
            return;
        }
        
        if (Ext.isEmpty(this.getPath())) {
            
            throw new Calc.route.Exception(
                Ext.String.format('[Route: ' + id + '] ' + propertyError, 'path')
            );
            
            this.setValid(false);
        }
        
        if (Ext.isEmpty(this.getDefaults())) {
            
            throw new Calc.route.Exception(
                Ext.String.format('[Route: ' + id + '] ' + propertyError, 'defaults')
            );
    
            this.setValid(false);
        }
        
        if (Ext.isEmpty(controllerPattern)) {
            
            throw new Calc.route.Exception(
                Ext.String.format('[Route: ' + id + '] ' + propertyError, 'path')
            );
           
            this.setValid(false);
        } else {
            //Controller Action
            
            if (Ext.isEmpty(controllerPattern.split(this.controllerDelimeter))) {
                
                throw new Calc.route.Exception(
                    Ext.String.format(
                        '[Route: ' + id + '] ' + 'Must be in the format controller{0}action', this.controllerDelimeter
                    )
                );
               
                this.setValid(false);
            }
            
            if (Ext.isEmpty(this.getController())) {
                
                throw new Calc.route.Exception('[Route: ' + id + '] There is no controller set');
              
                this.setValid(false);
            }
            
            if (Ext.isEmpty(this.getAction())) {
                
                throw new Calc.route.Exception('[Route: ' + id + '] There is no action set');
                
                this.setValid(false);
            }
        }
    },
    
    
    /**
     * Sets the route valid or invalid
     * 
     * @param {Boolean} bool
     */
    setValid: function(bool)
    {
        this.isValid = bool;
    },
    
    
    /**
     * Returns the compiled route
     * 
     * @return {Calc.library.routing.CompiledRoute}
     */
    getCompiled: function()
    {
        return this.get('compiled');
    }
});