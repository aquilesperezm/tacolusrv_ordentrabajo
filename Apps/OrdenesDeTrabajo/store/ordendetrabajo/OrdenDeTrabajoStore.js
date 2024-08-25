Ext.define("MyApp.store.ordendetrabajo.OrdenDeTrabajoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.ordendetrabajo.OrdenDeTrabajoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/get_ordenesdetrabajo",
    reader: {
      type: "json",
      rootProperty: "ordenes",
      totalProperty: "total"
    },
  },
  pageSize:50,
  autoLoad: true,
});
