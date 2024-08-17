Ext.define("MyApp.store.tipointervencion.TipoIntervencionStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.tipointervencion.TipoIntervencionModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/get_tiposdeintervenciones",
    reader: {
      type: "json",
      rootProperty: "tiposdeintervenciones",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
