Ext.define("MyApp.controller.tipointervencion.TipoIntervencionController", {
  extend: "Ext.app.Controller",

  views: ["tipointervencion.TipoIntervencionView_Grid"],

  stores: ["tipointervencion.TipoIntervencionStore"],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'tipointervencion_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'tipointervencion_grid toolbar[dock="top"] > textfield': {
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'tipointervencion_grid toolbar[dock="top"] > button[text="Buscar"]': {
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
      'tipointervencion_grid toolbar[dock="top"] > textfield'
    )[0];
    var store_ordenes = Ext.ComponentQuery.query(
      "tipointervencion_grid"
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
    var store = Ext.ComponentQuery.query("tipointervencion_grid")[0].getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  init: function () {},
});
