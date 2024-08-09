Ext.define("MyApp.view.UserInterfaceManager", {
  extend: "Ext.container.Viewport",
  layout: "border",
  items: [
    {
      region: "north",
      html: '<h1 class="x-panel-header">Ordenes de Trabajo</h1>',
      border: false,
      margin: "0 0 5 0",
    },
    {
      region: "center",
      xtype: "container",
      scrollable: true, // TabPanel itself has no title
      //activeTab: 0, // First tab active by default
      items: {
        // title: "Ordenes de Trabajo",
        items: [
          {
            xtype: "panel",
            scrollable: true,
            // title: "Grid",
            tbar: [
              {
                text: "Adicionar Orden de Trabajo",
                id:'Adicionar_Orden'
              },
              {
                text: "Actualizar Orden de Trabajo",
              },
              {
                text: "Eliminar Orden de Trabajo",
              },
              {
                text: "Imprimir Orden de Trabajo",
              },
            ],
            items: [
              {
                xtype: "grid",
                title: "Ordenes de Trabajo",
                store: "OrdenesDeTrabajoStore",
                selModel: {
                  type: "checkboxmodel",
                  checkOnly: false,
                },
                columns: [
                  {
                    xtype: "rownumberer",
                    flex: 0.1,
                    text: "#",
                  },
                  {
                    text: "No. Orden de Trabajo",
                    flex: 1,
                    dataIndex: "numero_orden",
                  },
                  {
                    text: "Centro Autorizado",
                    flex: 1,
                    dataIndex: "full_centroautorizado",
                  },
                  {
                    text: "Cliente",
                    flex: 1,
                    dataIndex: "full_cliente",
                  },
                  {
                    text: "Vehículo",
                    flex: 1,
                    dataIndex: "full_vehiculo",
                  },
                  {
                    text: "No. Serie Tacografo",
                    flex: 1,
                    dataIndex: "no_serie_tacografo"
                  },
                ],
                listeners:{
                     selectionchange: function(grid,records){
                      var store = Ext.data.StoreManager.lookup('IntervencionByIDOrdenStore');
                          
                        if(records.length == 1){
                          store.load({
                            params:{'id_orden':records[0].id}
                          });
                        } else {
                          store.loadData([],false);
                        }
                     }
                }
              },
              {
                xtype: "grid",
                height: 300,
                title:
                  "Tipos de Intervenciones por Orden de Trabajo Seleccionada",
                selModel: {
                  type: "checkboxmodel",
                  checkOnly: false
                },
                store: "IntervencionByIDOrdenStore",
                columns: [
                  {
                    xtype: "rownumberer",
                    flex: 0.01,
                    text: "#"
                  },
                  {
                    text: "Nombre de Intervención",
                    flex: 1,
                    dataIndex:'nombre_tipointervencion'
                  },
                ],
              },
              {
                xtype: "form",
                title: "Formulario para Orden de Trabajo",
              },
            ],
          },
        ],
      },
    },
  ],
});
