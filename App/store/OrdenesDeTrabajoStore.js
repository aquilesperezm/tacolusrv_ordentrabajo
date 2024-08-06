Ext.define("MyApp.store.OrdenesDeTrabajoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.OrdenesDeTrabajoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "/facturascripts/api/3/getusers",
    reader: {
      type: "json",
      rootProperty: "ordenes",
    },
  },
  autoLoad: true,
});
