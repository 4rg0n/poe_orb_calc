/**
 * Renderer for Templates
 *
 * @class Calc.library.util.XTemplateRenderer
 * @alternateClassName: Calc.XTemplateRenderer
 * @author Arg0n <argonthechecker@gmail.com>
 */
Ext.define('Calc.library.util.XTemplateRenderer', {

    alternateClassName: 'Calc.XTemplateRenderer',

    singleton: true,

    /**
     * @example
     *
     *   //Example template.html
     *   <p>Users:</p>
     *   <tpl for="users"><p>{name} (ID: {id})</p></tpl>
     *
     *   //Example ExtJs Komponente
     *   Ext.create('Ext.container.Container', {
     *       mixins: [
     *          'Calc.library.mixin.Template'
     *       ],
     *
     *       data: {
     *          users: [
     *              {
     *                  name: 'Admin',
     *                  id: 1
     *              },
     *              {
     *                  name: 'Guest'
     *                  id: 2
     *              }
     *          ]
     *       },
     *       loader: {
     *           url:'app/template/template.html',
     *           autoLoad: true,
     *           renderer: XTemplateRenderer.loader
     *       }
     *   });
     *
     * @param {Ext.ElementLoader} loader
     * @param {Object} response
     * @param {Object} active
     * @return {Boolean}
     */
    loader: function(loader, response, active) {
        var tpl = new Ext.XTemplate(response.responseText),
            targetComponent = loader.getTarget();

        if (targetComponent.isTemplate) {
            targetComponent.update(tpl.apply(targetComponent.getData()));
        } else {
            Ext.Error.raise(
                'Component (ID: ' + targetComponent.getId() +
                    ') is not a template component. Mixin "Calc.library.mixin.Template" required.'
            );

            return false;
        }

        return true;
    },


    /**
     * Returns the renderer function
     *
     * @param {String} name
     * @returns {Function}
     */
    getRenderer: function(name)
    {
        return this[name];
    }
});
