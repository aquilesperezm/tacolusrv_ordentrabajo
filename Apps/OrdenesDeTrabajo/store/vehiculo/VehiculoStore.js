Ext.define("MyApp.store.vehiculo.VehiculoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.vehiculo.VehiculoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/get_vehiculos",
    reader: {
      type: "json",
      rootProperty: "vehiculos",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
