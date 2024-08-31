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
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar[dock="top"] > textfield':
      {
        keyup: "onSpecialKeyPress_TextfieldSearch",
        specialkey: "onSpecialKeyPress_TextfieldSearch",
      },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar[dock="top"] > button[text="Buscar"]':
      {
        click: "onClick_ButtonSearch",
      },
    //Mostrar el formulario para adicionar un vehiculo
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar button[text="Adicionar"]':
      {
        click: "onClickAddVehiculo_AddOrdenTrabajo",
      },
    //Mostrar el formulario para actualizar un vehiculo
    'window[title="Adicionar una nueva Orden de Trabajo"] vehiculo_grid toolbar button[text="Actualizar"]':
      {
        click: "onClickUpdateVehiculo_AddOrdenTrabajo",
      },
    //cuando seleccionamos un vehiculo para crear una orden de trabajo
    'window[title="Adicionar una nueva Orden de Trabajo"] > vehiculo_grid': {
      selectionchange: "onSelectChange_CreateOrden_Vehiculo",
    },
  },

  onSelectChange_CreateOrden_Vehiculo: function (sm, record) {
    var win = Ext.ComponentQuery.query(
      'window[title="Adicionar una nueva Orden de Trabajo"]'
    )[0];
    var grid = win.query("grid")[0];
    var toolbar_bottom_grid = grid.query('toolbar[dock="bottom"]')[0];
    var btn_vincular_cliente = toolbar_bottom_grid.query(
      'button[text="Vincular Cliente"]'
    )[0];

    var btn_vincular_tacografo = Ext.getCmp('btn_vincular_tacografo');

    //vehiculos_sm = cmp.getSelectionModel();

    let selected_record = sm.getSelection()[0];

    if (sm.getSelection().length > 0) {
      btn_siguiente = win.query('button[text="Siguiente"]')[0];
      btn_siguiente.setDisabled(
        !(
          selected_record.data.tiene_cliente &&
          selected_record.data.tiene_tacografo
        )
      );

      btn_vincular_cliente.setDisabled(selected_record.data.tiene_cliente);
      if (selected_record.data.tiene_tacografo)
        btn_vincular_tacografo.setText("Actualizar Tacógrafo");
      else btn_vincular_tacografo.setText("Vincular Tacógrafo");
      //btn_vincular_tacografo.setDisabled(selected_record.data.tiene_tacografo);

      //enable update and delete in toolbar
      var top_toolbar = grid.query('toolbar[dock="top"]')[0];
      var update_btn = top_toolbar.down('button[text="Actualizar"]');
      var delete_btn = top_toolbar.down('button[text="Eliminar"]');

      update_btn.setDisabled(false);
      delete_btn.setDisabled(false);
    }
  },

  onClickAddVehiculo_AddOrdenTrabajo: function (cmp, e) {
    var win = Ext.create("MyApp.view.vehiculo.form.CreateVehiculoView_Window");
    win.show();
  },

  onClickUpdateVehiculo_AddOrdenTrabajo: function (cmp, e) {
    var win = Ext.create("MyApp.view.vehiculo.form.UpdateVehiculoView_Window");
    win.show();
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    //var textfield = cmp.previousSibling("textfield");
    var grid_vehiculo = cmp.up("vehiculo_grid");
    var store_vehiculo = grid_vehiculo.getStore();

    store_vehiculo.loadPage(1, {
      callback: (r, o, s) => {
        if (r.length > 0) grid_vehiculo.getSelectionModel().select(0);
      },
      params: {
        criteria: cmp.getValue(),
      },
    });
  },

  onClick_ButtonSearch: function (cmp, e) {
    var textfield = cmp.previousSibling("textfield");
    var store_ordenes = cmp.up("vehiculo_grid").getStore();

    store_ordenes.loadPage(1, {
      callback: (r, o, s) => {
        if (r.length > 0) cmp.up("vehiculo_grid").getSelectionModel().select(0);
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
    var store = cmp.up("vehiculo_grid").getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  init: function () {},
});
