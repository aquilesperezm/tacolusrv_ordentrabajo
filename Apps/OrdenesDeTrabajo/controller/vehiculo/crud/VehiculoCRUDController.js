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

  onBeforeRender_UpdateVehiculo: function (cmp) {
    var grid_vehiculo = Ext.ComponentQuery.query(
      "create_ordedetrabajo_win > vehiculo_grid"
    )[0];

    selected_record = grid_vehiculo.getSelectionModel().getSelection()[0];
    cmp.loadRecord(selected_record);
    //console.log(selected_record);

   /* Ext.data.StoreManager.lookup("modelo.ModeloStore").load({
      callback: () => {
        // combo.nextSibling("combo").setDisabled(false);
        
      }/*,
      params: {
        id_marca: 12,
      },
    });*/
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
