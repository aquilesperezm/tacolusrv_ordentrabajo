Ext.define("MyApp.controller.tacografo.crud.TacografoCRUDController", {
  extend: "Ext.app.Controller",

  views: [
    "tacografo.form.CreateTacografoView_Window",
    "tacografo.form.UpdateTacografoView_Window",
  ],

  stores: [
    "tacografo.categoria.CategoriaTacografoStore",
    "tacografo.modelo.ModeloTacografoStore",
  ],

  control: {
    "#AddNew_Tacografo": {
      click: "Create_NewTacografo",
    },
    '#Update_Tacografo':{
      click: 'Update_Tacografo'
    },
    '#Delete_Tacografo':{
      click: 'Delete_Tacografo'
    },
    tacografo_grid: {
      selectionchange: "onSelectionChange_GridTacografo",
    },
  },

  Delete_Tacografo: function(btn){
    var grid = Ext.ComponentQuery.query(
      'window[title="Vincular un Tacógrafo a un Vehículo"] > tacografo_grid'
    )[0];
    var records = btn.up('grid').getSelectionModel().getSelection();
    var ids = [];
      records.forEach((v,i,a)=>{
        ids.push(v.id);
      });
    
      Ext.Msg.show({
        title:'Aviso',
        message: 'Se eliminaran los elementos seleccionados, ¿Usted esta seguro?',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function(btn) {
            if (btn === 'yes') {
              
              Ext.Ajax.request({
                headers: {Token:'TacoLuServices2024**'},
                method:'POST',
                url: 'api/3/tacografo_manager',
                params:{
                  action:'delete',
                  ids:Ext.encode(ids)
                },    
                success: function(response, opts) {
                  //  var obj = Ext.decode(response.responseText);
                  //  console.dir(obj);
                  grid.getStore().loadPage(1);
                },
           
                failure: function(response, opts) {
                   // console.log('server-side failure with status code ' + response.status);
                }
            });
              
            }
            Ext.data.StoreManager.lookup('vehiculo.VehiculoStore').loadPage(1);
        }
    });

  },

  onSelectionChange_GridTacografo: function (sm, records) {
    Ext.ComponentQuery.query(
      'tacografo_grid toolbar[dock="top"] button[text="Actualizar"]'
    )[0].setDisabled(false);
    Ext.ComponentQuery.query(
      'tacografo_grid toolbar[dock="top"] button[text="Eliminar"]'
    )[0].setDisabled(false);
  },

  Update_Tacografo: function(btn,e){

    var form = btn.up("form");
   // var grid = Ext.ComponentQuery.query("tacografo_grid")[0];

    var grid = Ext.ComponentQuery.query(
      'window[title="Vincular un Tacógrafo a un Vehículo"] > tacografo_grid'
    )[0];
    var selected_record = grid.getSelectionModel().getSelection()[0];

    if (form.isValid()) {
      form.submit({
        headers: { Token: "TacoLuServices2024**" },
        method: "POST",
        clientValidation: true,
        url: "api/3/tacografo_manager",
        params: {
          action: "update",
          id_tacografo: selected_record.id
        },
        success: function (form, action) {
          grid.getStore().loadPage(1, {
            callback: function () {
              btn.up("window").close();
            },
          });

          //Ext.Msg.alert('Success', action.result.msg);
        },
        failure: function (form, action) {
          Ext.Msg.alert("Failed", action.result.success);
        },
      });
    }

  },

  Create_NewTacografo: function (btn, e) {
    var form = btn.up("form");
    var grid = Ext.ComponentQuery.query(
      'window[title="Vincular un Tacógrafo a un Vehículo"] > tacografo_grid'
    )[0];

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
          grid.getStore().loadPage(1, {
            callback: function () {
              btn.up("window").close();
            },
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
