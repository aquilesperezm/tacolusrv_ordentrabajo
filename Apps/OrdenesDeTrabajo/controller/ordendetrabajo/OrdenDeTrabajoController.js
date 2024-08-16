Ext.define("MyApp.controller.ordendetrabajo.OrdenDeTrabajoController", {
  extend: "Ext.app.Controller",

  stores: ["ordendetrabajo.OrdenDeTrabajoStore"],
  views: ["ordendetrabajo.OrdenDeTrabajoView_Grid"],

  control: { 
    'ordendetrabajo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]': {
     keyup: 'onKeyUp_CounterPages'
  } },

  onKeyUp_CounterPages: function(cmp){
    console.log('render numberfield',cmp)
  },

  //this method is called before the app boots
  init: function () {
    //console.log('controller orden de trabajo init')
  },
});
