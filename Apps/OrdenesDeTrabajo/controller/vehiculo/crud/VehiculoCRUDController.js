Ext.define("MyApp.controller.vehiculo.crud.VehiculoCRUDController", {
  extend: "Ext.app.Controller",

  control: {
    "#AddNew_Vehiculo": {
      click: "Create_NewVehiculo",
    },
    'window[title="Actualizar un vehiculo existente"] form': {
      beforerender: "onBeforeRender_UpdateVehiculo",
    },
    "#UpdateNew_Vehiculo": {
      click: "Update_NewVehiculo",
    },
    'create_ordedetrabajo_win > vehiculo_grid toolbar[dock="top"] button[text="Eliminar"]':
      {
        click: "Delete_Vehiculo",
      },
  },

  views: [
    "vehiculo.form.CreateVehiculoView_Window",
    "vehiculo.form.UpdateVehiculoView_Window",
  ],

  stores: [
    "centroautorizado.CentroAutorizadoStore",
    "modelo.ModeloStore",
    "marca.MarcaStore",
  ],

  Delete_Vehiculo: function(btn){
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
                url: 'api/3/get_vehiculos',
                params:{
                  action:'delete',
                  ids:ids
                },    
                success: function(response, opts) {
                  //  var obj = Ext.decode(response.responseText);
                  //  console.dir(obj);
                  Ext.data.StoreManager.lookup('vehiculo.VehiculoStore').loadPage(1);
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

  onBeforeRender_UpdateVehiculo: function (cmp) {
    var grid_vehiculo = Ext.ComponentQuery.query(
      "create_ordedetrabajo_win > vehiculo_grid"
    )[0];

    selected_record = grid_vehiculo.getSelectionModel().getSelection()[0];
    cmp.loadRecord(selected_record);
  },

  Create_NewVehiculo: function (btn, e) {
    //console.log(btn.up('form'))
    var form = btn.up("form").getForm();
    if (form.isValid()) {
      form.submit({
        headers: { Token: "TacoLuServices2024**" },
        method: "POST",
        clientValidation: true,
        url: "api/3/get_vehiculos",
        params: {
          action: "create",
        },
        success: function (form, action) {
          Ext.data.StoreManager.lookup("vehiculo.VehiculoStore").loadPage(1);
          btn.up("window").close();

          //Ext.Msg.alert('Success', action.result.msg);
        },
        failure: function (form, action) {
          Ext.Msg.alert("Failed", action.result.success);
        },
      });
    }
  },

  Update_NewVehiculo: function (btn, e) {
    //console.log(btn.up('form'))
    var grid_vehiculo = Ext.ComponentQuery.query(
      "create_ordedetrabajo_win > vehiculo_grid"
    )[0];

    var selected_record = grid_vehiculo.getSelectionModel().getSelection()[0];

    var form = btn.up("form").getForm();
    if (form.isValid()) {
      form.submit({
        headers: { Token: "TacoLuServices2024**" },
        method: "POST",
        clientValidation: true,
        url: "api/3/get_vehiculos",
        params: {
          action: "update",
          id_vehiculo: selected_record.id,
        },
        success: function (form, action) {
          Ext.data.StoreManager.lookup("vehiculo.VehiculoStore").loadPage(1);
          btn.up("window").close();

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