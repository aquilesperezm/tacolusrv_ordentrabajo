Ext.define("MyApp.controller.ordendetrabajo.OrdenDeTrabajoController", {
  extend: "Ext.app.Controller",

  stores: ["ordendetrabajo.OrdenDeTrabajoStore"],
  views: ["ordendetrabajo.OrdenDeTrabajoView_Grid"],

  control: {
    // selector de la cantidad de items en la barra inferior del grid
    'ordendetrabajo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    'ordendetrabajo_grid toolbar[dock="top"] > textfield': {
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    'ordendetrabajo_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },
  },

  onSpecialKeyPress_TextfieldSearch: function (f, e) {
    if (e.getKey() == e.ENTER) {
      this.onClick_ButtonSearch();

    }
  },

  onClick_ButtonSearch: function (cmp, e) {
    var textfield = Ext.ComponentQuery.query(
      'ordendetrabajo_grid toolbar[dock="top"] > textfield'
    )[0];
    var store_ordenes = Ext.ComponentQuery.query(
      "ordendetrabajo_grid"
    )[0].getStore();
    store_ordenes.load({
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
    var store = Ext.ComponentQuery.query("ordendetrabajo_grid")[0].getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  //this method is called before the app boots
  init: function () {
    //console.log('controller orden de trabajo init')
  },
});
