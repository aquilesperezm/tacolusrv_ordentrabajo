Ext.define("MyApp.store.tipointervencion.TipoIntervencionByIDOrdenStore", {
    extend: "Ext.data.Store",
    model: "MyApp.model.tipointervencion.TipoIntervencionByIDOrdenModel",
    proxy: {
      headers: {Token:'TacoLuServices2024**'},
      type: "ajax",
      url: "api/3/get_intervencion_by_ordenid",
      reader: {
        type: "json",
        rootProperty: "intervenciones",
        totalProperty: 'total'
      },
    },
    autoLoad: false
  });