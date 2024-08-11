Ext.define("MyApp.view.CenterPanelUI", {
  extend: "Ext.container.Container",
  region: "center",
  xtype: "centerpanel_ui",
  scrollable: true, // TabPanel itself has no title
  //activeTab: 0, // First tab active by default
  items: {
    // title: "Ordenes de Trabajo",
    items: [
      {
        xtype: "panel",
        scrollable: true,
        tbar: [
          {
            text: "Adicionar Orden de Trabajo",
            id: "Adicionar_Orden",
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
            xtype:'gridpanel_ordenesdetrabajo_ui'
          },
          {
            xtype:'gridpanel_tipointervencion_ui'
          },
          {
            xtype: "form",
            title: "Formulario para Orden de Trabajo",
          },
        ],
      },
    ],
  },
});
