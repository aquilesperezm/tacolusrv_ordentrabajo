Ext.define("MyApp.store.tacografo.modelo.ModeloTacografoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.tacografo.modelo.ModeloTacografoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/tacografo_manager",
    extraParams:{
      action:'get-all-modelos'
    },
    reader: {
      type: "json",
      rootProperty: "tacografos",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
