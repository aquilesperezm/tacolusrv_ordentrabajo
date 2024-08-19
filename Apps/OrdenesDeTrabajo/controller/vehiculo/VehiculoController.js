Ext.define("MyApp.controller.vehiculo.VehiculoController", {
  extend: "Ext.app.Controller",

  views: ["vehiculo.VehiculoView_Grid"],

  stores: ["vehiculo.VehiculoStore"],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar[dock="top"] > textfield': {
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },

    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar button[text="Adicionar"]':{
      click: 'onClickAddVehiculo_inAddOrdenTrabajo'
    }
  },

  onClickAddVehiculo_inAddOrdenTrabajo: function(cmp,e){
    var win = Ext.create('MyApp.view.vehiculo.form.CreateVehiculoView_Window');
    win.show();
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    if (e.getKey() == e.ENTER) {
      this.onClick_ButtonSearch(cmp.nextSibling("button"));
    }
  },

  onClick_ButtonSearch: function (cmp, e) {
    var textfield = cmp.previousSibling("textfield");
    var store_ordenes = cmp.up("vehiculo_grid").getStore();
    
    store_ordenes.loadPage(1, {
      params: {
        criteria: textfield.getValue(),
      },
    });
  },

  /**
   * @abstract Funcion encargada de controlar el contador de la cantidad de items a mostrar
   *           el componente se encuentra despues del paginado.
   *
   * @event keyup
   */
  onKeyUp_CounterPages: function (cmp) {
    var store = cmp.up("vehiculo_grid").getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  init: function () {},
});
