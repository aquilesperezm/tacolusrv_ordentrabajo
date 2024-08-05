Ext.application({
    name: 'MyApp',
    appFolder: 'Plugins/OrdenDeTrabajo/App',
    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'Main.view.main.Main'
    controllers:['Users'],
    models:[],
    
    launch: ()=>{
        
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                region: 'north',
                html: '<h1 class="x-panel-header">Ordenes de Trabajo</h1>',
                border: false,
                margin: '0 0 5 0'
            }/*, {
                region: 'west',
                collapsible: true,
                title: 'Navigation',
                width: 150
                // could use a TreePanel or AccordionLayout for navigational items
            }*/, {
                region: 'south',
                title: 'Información',
                collapsible: false,
                html: 'Information goes here',
                split: false,
                height: 50,
                minHeight: 100
            }, {
                region: 'east',
                title: 'East Panel',
                collapsible: true,
                split: true,
                width: 150
            }, {
                region: 'center',
                xtype: 'tabpanel', // TabPanel itself has no title
                activeTab: 0,      // First tab active by default
                items: {
                    title: 'Ordenes de Trabajo',
                    html: 'The first tab\'s content. Others may be added dynamically'
                }
            }]
        });
        
    }

});