Ext.define("MyApp.store.tacografo.TacografoStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.tacografo.TacografoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "api/3/tacografo_manager",
    reader: {
      type: "json",
      rootProperty: "tacografos",
      totalProperty: "total"
    },
  },
  autoLoad: true,
});
