Ext.define("MyApp.controller.ordendetrabajo.OrdenDeTrabajoController", {
  extend: "Ext.app.Controller",

  stores: ["ordendetrabajo.OrdenDeTrabajoStore"],
  views: ["ordendetrabajo.OrdenDeTrabajoView_Grid"],

  control: { 
    'ordendetrabajo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]': {
     keyup: 'onKeyUp_CounterPages'
  } },

  onKeyUp_CounterPages: function(cmp){
    var store = Ext.ComponentQuery.query('ordendetrabajo_grid')[0].getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  //this method is called before the app boots
  init: function () {
    //console.log('controller orden de trabajo init')
  },
});
