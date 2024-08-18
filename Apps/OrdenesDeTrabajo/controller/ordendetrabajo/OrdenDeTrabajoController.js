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
    //---------------------------------------------- Vinculate Client and Tachograph -------------------------------
    // Vinculate Client
    'window[title="Adicionar una nueva Orden de Trabajo"] > grid > toolbar[dock="bottom"] > button[text="Vincular Cliente"]':
      {
        click: "OnClickButton_VincularCliente",
      },

    'window[title="Vincular un Cliente a un Vehículo"] > grid': {
      selectionchange: "onSelectionChange_GridVincularCliente",
    },

    'window[title="Vincular un Cliente a un Vehículo"] button[text="Vincular Cliente"]':
      {
        click: "onClick_VincularCliente",
      },

    // Vinculate Tachograph
    'window[title="Adicionar una nueva Orden de Trabajo"] > grid > toolbar[dock="bottom"] > button[text="Vincular Tacógrafo"]':
      {
        click: "OnClickButton_VincularTacografo",
      },

    'window[title="Vincular un Tacógrafo a un Vehículo"] > grid': {
      selectionchange: "onSelectionChange_GridVincularTacografo",
    },

    'window[title="Vincular un Tacógrafo a un Vehículo"] button[text="Vincular Tacógrafo"]':
      {
        click: "onClick_VincularTacografo",
      },

    //---------------------------------------------- End Vinculate Client and Tachograph -------------------------------

    //------------------------------------------- CRUD Functions ---------------------------------------------

    //----------------------------------------- CRUD Functions -----------------------------------------------------

    //--------------------------- Navigation from Form "Adicionar Orden" -------------------------------------------
      'window[title="Adicionar una nueva Orden de Trabajo"] button[text="Siguiente"]':{
        click: function(btn,e){
          this.showNext(btn);
        }
      },
      'window[title="Adicionar una nueva Orden de Trabajo"] button[text="Anterior"]':{
        click: function(btn,e){
          this.showPrevious(btn)
        }
      }
   
    // ------------------------------------------------ End Navigation --------------------------------------------------------
  },

  //-------------------------------------- Nav Methods -----------------------------------------------------------------
  showNext: function () {
    this.doCardNavigation(1);
  },

  showPrevious: function (btn) {
    this.doCardNavigation(-1);
  },

  doCardNavigation: function (incr) {
    var win = Ext.ComponentQuery.query(
      'window[title="Adicionar una nueva Orden de Trabajo"]'
    )[0];

    //var me = this,
      l = win.getLayout(),
      i = l.activeItem.id.split("createordenform_card-")[1],
      next = parseInt(i, 10) + incr;

    l.setActiveItem(next);

    win.down('button[text="Anterior"]').setDisabled(next === 0);
    win.down('button[text="Siguiente"]').setDisabled(next === 1);
  },

//------------------------------------------------------- End Nav Methods ----------------------------------------------

  OnClickButton_VincularTacografo: function (btn, e) {
    Ext.create("Ext.window.Window", {
      title: "Vincular un Tacógrafo a un Vehículo",
      width: "70%",
      height: "50%",
      layout: "fit",
      resizable: false,
      draggable: false,
      modal: true,
      items: [
        {
          xtype: "tacografo_grid",
          store: Ext.create("MyApp.store.tacografo.TacografoStore", {
            proxy: {
              extraParams: {
                tacografos_disponibles: true,
              },
            },
          }),
          selModel: {
            type: "checkboxmodel",
            checkOnly: false,
            mode: "SINGLE",
            allowDeselect: false,
          },
          listeners: {
            beforerender: function (cmp) {
              var t = cmp.down("toolbar");
              var i = t.query("button");
              var s = t.query("tbspacer");
              var p = t.query("tbseparator");

              i[0].setVisible(false);
              i[1].setVisible(false);
              i[2].setVisible(false);
              i[3].setVisible(false);

              s[0].setVisible(false);
              s[1].setVisible(false);
              s[2].setVisible(false);
              s[3].setVisible(false);
              s[4].setVisible(false);
              s[5].setVisible(false);
              s[6].setVisible(false);
              // s[7].setVisible(false)

              p[0].setVisible(false);
              p[1].setVisible(false);
              p[2].setVisible(false);
              p[3].setVisible(false);
            },
          },
        },
      ],
      buttons: [
        {
          text: "Vincular Tacógrafo",
          disabled: true,
          style: {
            textDecoration: "none",
          },
        },
      ],
    }).show();
  },

  onSelectionChange_GridVincularTacografo: function (sm, record) {
    var btn_vincular_cliente = Ext.ComponentQuery.query(
      'window[title="Vincular un Tacógrafo a un Vehículo"] button[text="Vincular Tacógrafo"]'
    )[0];
    if (sm.getSelection().length > 0) btn_vincular_cliente.setDisabled(false);
  },

  onClick_VincularTacografo: function (btn, e) {
    var grid_vehiculo = Ext.ComponentQuery.query(
      'window[title="Adicionar una nueva Orden de Trabajo"] > vehiculo_grid'
    )[0];
    var grid_tacografo = Ext.ComponentQuery.query(
      'window[title="Vincular un Tacógrafo a un Vehículo"] > tacografo_grid'
    )[0];

    Ext.Ajax.request({
      headers: { Token: "TacoLuServices2024**" },
      url: "api/3/tacografo_manager",
      method: "POST",
      params: {
        id_vehiculo: grid_vehiculo.getSelectionModel().getSelection()[0].data
          .id,
        id_tacografo: grid_tacografo.getSelectionModel().getSelection()[0].data
          .id,
      },
      success: function (response, opts) {
        Ext.StoreManager.lookup("ordendetrabajo.OrdenDeTrabajoStore").load();
        Ext.StoreManager.lookup("vehiculo.VehiculoStore").load();
        Ext.StoreManager.lookup("cliente.ClienteStore").load();
        Ext.StoreManager.lookup("tacografo.TacografoStore").load();
        btn.up("window").close();
      },

      failure: function (response, opts) {
        console.log("server-side failure with status code " + response.status);
      },
    });

    /* var grid_vehiculo = Ext.ComponentQuery.query(
      'window[title="Adicionar una nueva Orden de Trabajo"] > vehiculo_grid'
    )[0];
    var grid_cliente = Ext.ComponentQuery.query(
      'window[title="Vincular un Cliente a un Vehículo"] > cliente_grid'
    )[0];

    Ext.Ajax.request({
      headers: { Token: "TacoLuServices2024**" },
      url: "api/3/cliente_manager",
      method: "POST",
      params: {
        id_vehiculo: grid_vehiculo.getSelectionModel().getSelection()[0].data
          .id,
        id_cliente: grid_cliente.getSelectionModel().getSelection()[0].data
          .codcliente,
      },
      success: function (response, opts) {
        Ext.StoreManager.lookup("ordendetrabajo.OrdenDeTrabajoStore").load();
        Ext.StoreManager.lookup("vehiculo.VehiculoStore").load();
        Ext.StoreManager.lookup("cliente.ClienteStore").load();
        Ext.StoreManager.lookup("tacografo.TacografoStore").load();
        btn.up("window").close();
      },

      failure: function (response, opts) {
        console.log("server-side failure with status code " + response.status);
      },
    });*/
  },

  //----------------------

  onClick_VincularCliente: function (btn, e) {
    var grid_vehiculo = Ext.ComponentQuery.query(
      'window[title="Adicionar una nueva Orden de Trabajo"] > vehiculo_grid'
    )[0];
    var grid_cliente = Ext.ComponentQuery.query(
      'window[title="Vincular un Cliente a un Vehículo"] > cliente_grid'
    )[0];

    Ext.Ajax.request({
      headers: { Token: "TacoLuServices2024**" },
      url: "api/3/cliente_manager",
      method: "POST",
      params: {
        id_vehiculo: grid_vehiculo.getSelectionModel().getSelection()[0].data
          .id,
        id_cliente: grid_cliente.getSelectionModel().getSelection()[0].data
          .codcliente,
      },
      success: function (response, opts) {
        Ext.StoreManager.lookup("ordendetrabajo.OrdenDeTrabajoStore").load();
        Ext.StoreManager.lookup("vehiculo.VehiculoStore").load();
        Ext.StoreManager.lookup("cliente.ClienteStore").load();
        Ext.StoreManager.lookup("tacografo.TacografoStore").load();
        btn.up("window").close();
      },

      failure: function (response, opts) {
        console.log("server-side failure with status code " + response.status);
      },
    });
  },

  onSelectionChange_GridVincularCliente: function (sm, record) {
    var btn_vincular_cliente = Ext.ComponentQuery.query(
      'window[title="Vincular un Cliente a un Vehículo"] button[text="Vincular Cliente"]'
    )[0];
    if (sm.getSelection().length > 0) btn_vincular_cliente.setDisabled(false);
  },

  OnClickButton_VincularCliente: function (btn, e) {
    Ext.create("Ext.window.Window", {
      title: "Vincular un Cliente a un Vehículo",
      width: "70%",
      height: "50%",
      layout: "fit",
      resizable: false,
      draggable: false,
      modal: true,
      items: [
        {
          xtype: "cliente_grid",
          selModel: {
            type: "checkboxmodel",
            checkOnly: false,
            mode: "SINGLE",
            allowDeselect: false,
          },
          listeners: {
            beforerender: function (cmp) {
              var t = cmp.down("toolbar");
              var i = t.query("button");
              var s = t.query("tbspacer");
              var p = t.query("tbseparator");

              i[0].setVisible(false);
              i[1].setVisible(false);
              i[2].setVisible(false);
              i[3].setVisible(false);

              s[0].setVisible(false);
              s[1].setVisible(false);
              s[2].setVisible(false);
              s[3].setVisible(false);
              s[4].setVisible(false);
              s[5].setVisible(false);
              s[6].setVisible(false);
              // s[7].setVisible(false)

              p[0].setVisible(false);
              p[1].setVisible(false);
              p[2].setVisible(false);
              p[3].setVisible(false);
            },
          },
        },
      ],
      buttons: [
        {
          text: "Vincular Cliente",
          disabled: true,
          style: {
            textDecoration: "none",
          },
        },
      ],
    }).show();
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

    if (sm.getSelection().length > 0) {
      btn_siguiente = win.query('button[text="Siguiente"]')[0];
      btn_siguiente.setDisabled(
        !(record[0].data.tiene_cliente && record[0].data.tiene_tacografo)
      );

      btn_vincular_cliente.setDisabled(record[0].data.tiene_cliente);
      btn_vincular_tacografo.setDisabled(record[0].data.tiene_tacografo);
    }
  },

  onClick_ButtonAdd: function (btn, e) {
    Ext.create("Ext.window.Window", {
      title: "Adicionar una nueva Orden de Trabajo",
      width: "90%",
      height: "90%",
      layout: "card",
      requires: ["Ext.layout.container.Card"],
      resizable: false,
      draggable: false,
      modal: true,
      items: [
        {
          xtype: "vehiculo_grid",
          id: "createordenform_card-0",
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
        },
        {
          id: "createordenform_card-1",
          title: "temp",
        }
      ],
      buttons: [
        {
          text: "Anterior",
          disabled: true
        },
        {
          text: "Siguiente",
          disabled: true
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
