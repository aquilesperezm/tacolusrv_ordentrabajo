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
      keyup: "onSpecialKeyPress_TextfieldSearch",
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'tipointervencion_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    var grid_tipointervencion = cmp.up('tipointervencion_grid');
    var store_tipointervencion = grid_tipointervencion.getStore();

   store_tipointervencion.loadPage(1,{
    callback: (r,o,s)=>{
      if(r.length > 0)
      grid_tipointervencion.getSelectionModel().select(0);
    },
    params: {
        criteria: cmp.getValue(),
      },
    });
  },

  onClick_ButtonSearch: function (cmp, e) {
    
    var textfield = cmp.previousSibling('textfield');
    var store_ordenes = cmp.up('tipointervencion_grid').getStore();

   store_ordenes.loadPage(1,{
    callback: (r,o,s)=>{
      if(r.length > 0)
      cmp.up("tipointervencion_grid").getSelectionModel().select(0);
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
    var store = cmp.up('tipointervencion_grid').getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  init: function () {},
});
