Ext.define("MyApp.store.TipoIntervencionStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.TipoIntervencionModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "/facturas/api/3/get_tiposdeintervenciones",
    reader: {
      type: "json",
      rootProperty: "tiposdeintervenciones",
    },
  },
  autoLoad: true,
});
