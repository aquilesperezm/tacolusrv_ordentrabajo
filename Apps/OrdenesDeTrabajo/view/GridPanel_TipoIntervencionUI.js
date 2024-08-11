Ext.define("MyApp.view.GridPanel_TipoIntervencionUI", {
  extend: "Ext.grid.Panel",
  xtype: "gridpanel_tipointervencion_ui",
  height: 300,
  title: "Tipos de Intervenciones por Orden de Trabajo Seleccionada",
  selModel: {
    type: "checkboxmodel",
    checkOnly: false,
  },
  store: "IntervencionByIDOrdenStore",
  columns: [
    {
      xtype: "rownumberer",
      flex: 0.01,
      text: "#",
    },
    {
      text: "Nombre de Intervención",
      flex: 1,
      dataIndex: "nombre_tipointervencion",
    },
  ],
});
