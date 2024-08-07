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
                text: "Adicionar Orden de Trabajo",
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
                  checkOnly: true,
                },
                columns: [
                  {
                    xtype: "rownumberer",
                    flex:0.1,
                    text:'#'
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
                    dataIndex: "no_serie_tacografo",
                  },
                ],
              },
              {
                xtype: "grid",
                title:
                  "Tipos de Intervenciones por Orden de Trabajo Seleccionada",
                columns: [
                  {
                    text: "Nombre de Intervención",
                    flex: 1,
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
