Ext.define("MyApp.store.centroautorizado.CentroAutorizadoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.centroautorizado.CentroAutorizadoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/centroautorizo_manager",
    reader: {
      type: "json",
      rootProperty: "centros",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
