Ext.define("MyApp.store.TacografosStore", {
  extend: "Ext.data.Store",
  model: "MyApp.model.TacografoModel",
  proxy: {
    headers: {Token:'TacoLuServices2024**'},
    type: "ajax",
    url: "/facturascripts/api/3/tacografo_manager",
    reader: {
      type: "json",
      rootProperty: "tacografos"
    },
  },
  autoLoad: true,
});
