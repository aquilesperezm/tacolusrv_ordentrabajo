Ext.define("MyApp.store.marca.MarcaStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.marca.MarcaModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/marca_manager",
    reader: {
      type: "json",
      rootProperty: "marcas",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
