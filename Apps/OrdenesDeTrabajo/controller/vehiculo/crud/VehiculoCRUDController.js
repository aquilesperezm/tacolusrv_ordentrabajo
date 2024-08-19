Ext.define("MyApp.controller.vehiculo.crud.VehiculoCRUDController", {
  extend: "Ext.app.Controller",

  control: {
    "#AddNew_Vehiculo": {
      click: "Create_NewVehiculo",
    },
  },

  views: ["vehiculo.form.CreateVehiculoView_Window"],

  stores: [
    "centroautorizado.CentroAutorizadoStore",
    "modelo.ModeloStore",
    "marca.MarcaStore",
  ],

  Create_NewVehiculo: function(btn,e){
    //console.log(btn.up('form'))
    var form = btn.up('form').getForm();
    if (form.isValid()) {
      form.submit({
          headers: {Token:'TacoLuServices2024**'},
          method:'POST',
          clientValidation:true,
          url:'api/3/get_vehiculos',
          success: function(form, action) {
             
            Ext.data.StoreManager.lookup('vehiculo.VehiculoStore').loadPage(1);
            btn.up('window').close();

            //Ext.Msg.alert('Success', action.result.msg);
          },
          failure: function(form, action) {
            
              Ext.Msg.alert('Failed', action.result.success);
          }
      });
  }

  },

  init: function () {},
});
