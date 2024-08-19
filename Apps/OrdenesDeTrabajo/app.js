Ext.application({
  name: "MyApp",
  appFolder: "Plugins/OrdenDeTrabajo/Apps/OrdenesDeTrabajo",
  // The name of the initial view to create. With the classic toolkit this class
  // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
  // modern toolkit, the main view will be added to the Viewport.
  //
  //mainView: 'Main.view.main.Main'

  controllers: [
    "dashboard.DashBoardController",
    "dashboard.centerpanel.CenterPanelController",
    "ordendetrabajo.OrdenDeTrabajoController",
    "ordendetrabajo.crud.OrdenDeTrabajoCRUDController",

    "vehiculo.VehiculoController",
    "vehiculo.crud.VehiculoCRUDController",

    "tipointervencion.TipoIntervencionController",
    "tacografo.TacografoController",
    "cliente.ClienteController",
  ],

  launch: () => {
    Ext.create("MyApp.view.dashboard.DashBoardView");
  },
});
