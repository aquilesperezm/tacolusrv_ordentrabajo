Ext.define("MyApp.controller.cliente.ClienteController", {
  extend: "Ext.app.Controller",

  views: ["cliente.ClienteView_Grid"],

  stores: ["cliente.ClienteStore"],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'cliente_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'cliente_grid toolbar[dock="top"] > textfield': {
      keyup: "onSpecialKeyPress_TextfieldSearch",
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    /*'cliente_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },*/
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    var grid_clientes = cmp.up("cliente_grid");
    var store_clientes = grid_clientes.getStore();

    store_clientes.loadPage(1, {
      callback: (r, o, s) => {
        if (r.length > 0) grid_clientes.getSelectionModel().select(0);
      },
      params: {
        criteria: cmp.getValue(),
      },
    });
  },

  onClick_ButtonSearch: function (cmp, e) {
    //var textfield = cmp.pr("textfield");
    var grid_clientes = cmp.up("cliente_grid");
    var store_clientes = grid_clientes.getStore();

    store_clientes.loadPage(1, {
      callback: (r, o, s) => {
        if (r.length > 0) grid_clientes.getSelectionModel().select(0);
      },
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
    var store = cmp.up("cliente_grid").getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  init: function () {},
});
