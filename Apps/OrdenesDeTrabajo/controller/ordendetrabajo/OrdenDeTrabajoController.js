Ext.define("MyApp.controller.ordendetrabajo.OrdenDeTrabajoController", {
  extend: "Ext.app.Controller",

  stores: ["ordendetrabajo.OrdenDeTrabajoStore"],
  views: ["ordendetrabajo.OrdenDeTrabajoView_Grid"],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'ordendetrabajo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'ordendetrabajo_grid toolbar[dock="top"] > textfield': {
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'ordendetrabajo_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },

    // cuando damos click en adicionar orden
    'ordendetrabajo_grid toolbar[dock="top"] > button[text="Adicionar"]': {
      click: "onClick_ButtonAdd",
    },

    //cuando seleccionamos un vehiculo para crear una orden de trabajo
    'window[title="Adicionar una nueva Orden de Trabajo"] > grid': {
      selectionchange: "onSelectChange_CreateOrden_Vehiculo",
    },
    //------------------------------------------- CRUD Functions ---------------------------------------------

    //----------------------------------------- CRUD Functions -----------------------------------------------------
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
    var btn_vincular_tacografo = toolbar_bottom_grid.query(
      'button[text="Vincular Tacógrafo"]'
    )[0];

    //vehiculos_sm = cmp.getSelectionModel();

    if (
      sm.getSelection().length > 0 &&
      record[0].data.tiene_tacografo &&
      record[0].data.tiene_cliente
    ) {
      btn_siguiente = win.query('button[text="Siguiente"]')[0];
      btn_siguiente.setDisabled(false);
    } else {
      btn_vincular_cliente.setDisabled(record[0].data.tiene_cliente);
      btn_vincular_tacografo.setDisabled(record[0].data.tiene_tacografo);
    }
  },

  onClick_ButtonAdd: function (btn, e) {
    Ext.create("Ext.window.Window", {
      title: "Adicionar una nueva Orden de Trabajo",
      width: "90%",
      height: "90%",
      layout: "fit",
      resizable: false,
      draggable: false,
      modal: true,
      items: [
        {
          xtype: "vehiculo_grid",
          selModel: {
            type: "checkboxmodel",
            checkOnly: false,
            mode: "SINGLE",
            allowDeselect: false,
          },
          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            emptyMsg: "No existen Vehículos para mostrar",
            plugins: {
              "ux-progressbarpager": true,
            },
            items: [
              { xtype: "tbseparator" },
              {
                enableKeyEvents: true,
                xtype: "numberfield",
                fieldLabel: "Items por Página",
                labelWidth: 120,
                labelPad: 2,
                width: 160,
                value: 15,
                maxValue: 99,
                minValue: 5,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                maxLength: 2,
                enforceMaxLength: true,
              },
              { xtype: "tbseparator" },
              {
                xtype: "button",
                text: "Vincular Cliente",
                scale: "medium",
                style: {
                  textDecoration: "none",
                },
                icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/add-user.ico",
                disabled: true,
              },
              { xtype: "tbseparator" },
              {
                xtype: "button",
                scale: "medium",
                style: {
                  textDecoration: "none",
                },
                icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/add-location.ico",
                text: "Vincular Tacógrafo",
                disabled: true,
              },
            ],
          },
          //height: 350,
        } /*,
        {
          xtype: "panel",
          title: "Pasos",
          defaults: { padding: '5 20 5 20' },
          items: [
            {
              xtype: "displayfield",
              fieldLabel: "<b>Paso #1</b>",
              value: "Seleccione un vehículo en la tabla superior, en caso de no existir, adicione uno nuevo",
            },{
              xtype: "displayfield",
              fieldLabel: "<b>Paso #2</b>",
              value: "Si el vehículo no esta vinculado a un Cliente, presione <b>Vincular Cliente</b>",
            },{
              xtype: "displayfield",
              fieldLabel: "<b>Paso #3</b>",
              value: "Si el vehículo no esta vinculado a un Tacógrafo, presione <b>Vincular Tacógrafo</b>",
            },{
              xtype: "displayfield",
              fieldLabel: "<b>Paso #4</b>",
              value: "Si el vehículo esta en listo, presione <b>Siguiente</b> en la parte inferior derecha de la ventana",
            }
          ],
        },*/,
      ],
      buttons: [
        {
          text: "Anterior",
          disabled: true,
        },
        {
          text: "Siguiente",
          disabled: true,
        },
      ],
    }).show();
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
