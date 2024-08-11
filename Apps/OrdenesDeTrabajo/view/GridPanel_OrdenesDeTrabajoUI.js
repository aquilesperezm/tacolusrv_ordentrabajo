Ext.define("MyApp.view.GridPanel_OrdenesDeTrabajoUI", {
  extend: "Ext.grid.Panel",
  xtype: "gridpanel_ordenesdetrabajo_ui",
  title: "Ordenes de Trabajo",
  store: "OrdenesDeTrabajoStore",
  scrollable: true,
  height: 350,
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
      text: "Fecha",
      flex: 0.5,
      dataIndex: "fecha_orden",
      xtype: "datecolumn",
      format: "d-m-Y",
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
      flex: 1.5,
      dataIndex: "full_vehiculo",
    },
    {
      text: "No. Serie Tacografo",
      flex: 1.5,
      dataIndex: "no_serie_tacografo",
    },
  ],
  listeners: {
    selectionchange: function (grid, records) {
      var store = Ext.data.StoreManager.lookup("IntervencionByIDOrdenStore");

      if (records.length == 1) {
        store.load({
          params: { id_orden: records[0].id },
        });
      } else {
        store.loadData([], false);
      }
    },
  },
});
