Ext.define("MyApp.store.VehiculosStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.VehiculoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/get_vehiculos",
    reader: {
      type: "json",
      rootProperty: "vehiculos"
    },
  },
  autoLoad: true,
});
