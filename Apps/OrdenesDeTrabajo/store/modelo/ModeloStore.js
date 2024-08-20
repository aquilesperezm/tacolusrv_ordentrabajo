Ext.define("MyApp.store.modelo.ModeloStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.modelo.ModeloModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/modelo_manager",
    reader: {
      type: "json",
      rootProperty: "modelos",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
