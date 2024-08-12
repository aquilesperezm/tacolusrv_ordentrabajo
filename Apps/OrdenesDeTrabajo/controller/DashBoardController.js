Ext.define("MyApp.controller.DashBoardController", {
  extend: "Ext.app.Controller",

  stores: [
    "OrdenesDeTrabajoStore",
    "IntervencionByIDOrdenStore",
    "VehiculosStore",
    "TipoIntervencionStore",
  ],
  views: ["DashBoardUI", "CenterPanelUI"],

  control: {
    "#Adicionar_Orden": {
      click: "onClick_Adicionar_Orden",
    },
    '#Imprimir_Orden': {
      click: 'onClick_Imprimir_Orden'
    }
  },

  onClick_Adicionar_Orden: function () {
    if (Ext.getCmp("Window_CreateOrdenTrabajo") == undefined) {
      var vehiculos_store = Ext.StoreManager.lookup("VehiculosStore");
      vehiculos_store.load();

      Ext.create("Ext.window.Window", {
        id: "Window_CreateOrdenTrabajo",
        title: "Adicionar Orden de Trabajo",
        modal:true,
        resizable: false,
        height: "70%",
        width: "70%",
        layout: "fit",
        items: [
          {
            xtype: "cardpanel_createordentrabajo_ui",
          },
        ],
      }).show();
    } else {
      var vehiculos_store = Ext.StoreManager.lookup("VehiculosStore");
      vehiculos_store.load();
    }
  },
  onClick_Imprimir_Orden: function(btn,e){
    
    var grid_ordenes = Ext.getCmp('ID_Grid_OrdenesDeTrabajo');
    var selected_record = grid_ordenes.getSelectionModel().getSelection();
    var id_selected_record = selected_record[0].data.id

    Ext.getCmp('Print_Form_OrdenTrabajo').getForm().submit({
      target:'_blank',
      params:{
        id:id_selected_record
      }
    });

  }
  
});
