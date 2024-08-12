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
});
