Ext.define("MyApp.controller.tacografo.TacografoController", {
  extend: "Ext.app.Controller",

  views: ["tacografo.TacografoView_Grid"],

  stores: ["tacografo.TacografoStore"],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'tacografo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'tacografo_grid toolbar[dock="top"] > textfield': {
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'tacografo_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    if (e.getKey() == e.ENTER) {
      this.onClick_ButtonSearch(cmp.nextSibling('button'));
    }
  },

  onClick_ButtonSearch: function (cmp, e) {
    var textfield = cmp.previousSibling('textfield');
    var store_ordenes = cmp.up('tacografo_grid').getStore();

    store_ordenes.loadPage(1,{
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
    var store = cmp.up("tacografo_grid").getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  init: function () {},
});
