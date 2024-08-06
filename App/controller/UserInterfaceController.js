Ext.define('MyApp.controller.UserInterfaceController', {
    extend: 'Ext.app.Controller',

    stores:['OrdenesDeTrabajoStore'],
    views:['UserInterfaceManager'],

    init: function() {
        console.log('Initialized Users! This happens before ' +
                    'the Application launch() function is called');
    }
});