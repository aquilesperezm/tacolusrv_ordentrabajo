Ext.define("MyApp.store.tipointervencion.TipoIntervencionByIDOrdenStore", {
    extend: "Ext.data.Store",
    model: "MyApp.model.tipointervencion.TipoIntervencionModel",
    proxy: {
      headers: {Token:'TacoLuServices2024**'},
      type: "ajax",
      url: "api/3/get_intervencion_by_ordenid",
      extraParams:{
        id_orden:'1'
      },
      reader: {
        type: "json",
        rootProperty: "tiposdeintervenciones",
        totalProperty: 'total'
      },
    },
    autoLoad: false
  });