Ext.define("MyApp.store.cliente.ClienteStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.cliente.ClienteModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/cliente_manager",
    reader: {
      type: "json",
      rootProperty: "clientes",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
