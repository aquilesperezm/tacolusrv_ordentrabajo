Ext.define("MyApp.view.dashboard.DashBoardView", {
  extend: "Ext.container.Viewport",
  layout: "border",
  items: [
    {
      region: "north",
      html: '<h1 class="x-panel-header">Ordenes de Trabajo</h1>',
      border: false,
      margin: "0 0 5 0",
    },{
      xtype:'centerpanel_view'
    }
  ],
});
