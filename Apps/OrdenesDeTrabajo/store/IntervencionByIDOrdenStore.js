Ext.define("MyApp.store.IntervencionByIDOrdenStore", {
    extend: "Ext.data.Store",
    model: "MyApp.model.IntervencionByIDOrdenModel",
    proxy: {
      headers: {Token:'TacoLuServices2024**'},
      type: "ajax",
      url: "/facturascripts/api/3/get_intervencion_by_ordenid",
      reader: {
        type: "json",
        rootProperty: "intervenciones",
      },
    },
    autoLoad: false
  });