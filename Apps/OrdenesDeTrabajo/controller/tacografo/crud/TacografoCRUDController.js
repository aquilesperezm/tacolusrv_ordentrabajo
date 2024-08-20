Ext.define("MyApp.controller.tacografo.crud.TacografoCRUDController", {
  extend: "Ext.app.Controller",

  views: ['tacografo.form.CreateTacografoView_Window'],

  stores: ["tacografo.categoria.CategoriaTacografoStore","tacografo.modelo.ModeloTacografoStore"],

  control: {},

  init: function () {},
});
