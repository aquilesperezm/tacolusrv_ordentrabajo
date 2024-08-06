Ext.application({
  name: "MyApp",
  appFolder: "Plugins/OrdenDeTrabajo/App",
  // The name of the initial view to create. With the classic toolkit this class
  // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
  // modern toolkit, the main view will be added to the Viewport.
  //
  //mainView: 'Main.view.main.Main'
  controllers: ["UserInterfaceController"],
  models: [],

  launch: () => {
    Ext.create("Ext.container.Viewport", {
      layout: "border",
      items: [
        {
          region: "north",
          html: '<h1 class="x-panel-header">Ordenes de Trabajo</h1>',
          border: false,
          margin: "0 0 5 0",
        } /*, {
                region: 'west',
                collapsible: true,
                title: 'Navigation',
                width: 150
                // could use a TreePanel or AccordionLayout for navigational items
            }, {
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
            }*/,
        {
          region: "center",
          xtype: "container", // TabPanel itself has no title
          //activeTab: 0, // First tab active by default
          items: {
           // title: "Ordenes de Trabajo",
            items: [
              {
                xtype: "panel",
                // title: "Grid",
                tbar: [
                  {
                    text: "Adicionar Orden de Trabajo"
                  },{
                    text: "Actualizar Orden de Trabajo"
                  },{
                    text: "Eliminar Orden de Trabajo"
                  },{
                    text: "Imprimir Orden de Trabajo"
                  }
                ],
                items: [
                  {
                    xtype: "grid",
                    title: "Ordenes de Trabajo",
                    columns: [
                      {
                        text: "No. Orden de Trabajo",
                        flex: 1,
                      },
                      {
                        text: "Centro Autorizado",
                        flex: 1,
                      },
                      {
                        text: "Cliente",
                        flex: 1,
                      },
                      {
                        text: "Vehículo",
                        flex: 1,
                      },
                      {
                        text: "No. Serie Tacografo",
                        flex: 1,
                      },
                    ],
                  },{
                    xtype: "grid",
                    title: "Tipos de Intervenciones por Orden de Trabajo Seleccionada",
                    columns: [
                      {
                        text: "Nombre de Intervención",
                        flex: 1,
                      }
                    ],
                  },{
                    xtype:'form',
                    title:'Formulario para Orden de Trabajo'
                  }
                ],
              },
            ],
          },
        },
      ],
    });
  },
});
