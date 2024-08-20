Ext.define("MyApp.store.tacografo.categoria.CategoriaTacografoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.tacografo.categoria.CategoriaTacografoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/tacografo_manager",
    extraParams:{
      action:'get-all-categorias'
    },
    reader: {
      type: "json",
      rootProperty: "tacografos",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
