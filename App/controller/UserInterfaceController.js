Ext.define('MyApp.controller.UserInterfaceController', {
    extend: 'Ext.app.Controller',

    views:[],

    init: function() {
        console.log('Initialized Users! This happens before ' +
                    'the Application launch() function is called');
    }
});