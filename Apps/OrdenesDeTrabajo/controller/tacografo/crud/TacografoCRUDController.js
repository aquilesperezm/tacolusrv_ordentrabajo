Ext.define("MyApp.controller.tacografo.crud.TacografoCRUDController", {
  extend: "Ext.app.Controller",

  views: ["tacografo.form.CreateTacografoView_Window"],

  stores: [
    "tacografo.categoria.CategoriaTacografoStore",
    "tacografo.modelo.ModeloTacografoStore",
  ],

  control: {
    "#AddNew_Tacografo": {
      click: "Create_NewTacografo",
    },
  },

  Create_NewTacografo: function (btn, e) {


    var form = btn.up("form");
    var grid = Ext.ComponentQuery.query('tacografo_grid')[0];
   // grid.getStore().load();
    

    /*Ext.data.StoreManager.lookup("tacografo.TacografoStore").load({
      proxy: {
        extraParams: {
          tacografos_disponibles: true,
        },
      },
    });*/

    if (form.isValid()) {
      form.submit({
        headers: { Token: "TacoLuServices2024**" },
        method: "POST",
        clientValidation: true,
        url: "api/3/tacografo_manager",
        params: {
          action: "create",
        },
        success: function (form, action) {
         
          grid.getStore().loadPage(1,{
            callback:function(){
              btn.up("window").close();
            }
          });
         

          //Ext.Msg.alert('Success', action.result.msg);
        },
        failure: function (form, action) {
          Ext.Msg.alert("Failed", action.result.success);
        },
      });
    }
  },

  init: function () {},
});
