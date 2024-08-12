Ext.define("MyApp.store.ClientesStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.ClienteModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "/facturascripts/api/3/cliente_manager",
    reader: {
      type: "json",
      rootProperty: "clientes"
    },
  },
  autoLoad: true,
});
