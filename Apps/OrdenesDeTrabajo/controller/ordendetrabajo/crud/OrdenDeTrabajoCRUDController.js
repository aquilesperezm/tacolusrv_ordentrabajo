Ext.define(
  "MyApp.controller.ordendetrabajo.crud.OrdenDeTrabajoCRUDController",
  {
    extend: "Ext.app.Controller",

    stores: [],
    views: ["ordendetrabajo.form.CreateOrdenDeTrabajoView_Window"],

    control: {
      

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
      //-------------------------------------------- Controlling Cards ------------------------------------------------
      "#createordenform_card-1": {
        selectionchange: "OnSelectionChange_SelectTiposDeIntervenciones_Card2",
      },

      //-------------------------------------------- Controlling Cards ------------------------------------------------

      //------------------------------------------- CRUD Functions ---------------------------------------------
      "#Create_NewOrdenTrabajo": {
        click: "CRUD_CreateNewOrdenDeTrabajo",
      },
      //----------------------------------------- CRUD Functions -----------------------------------------------------

      //--------------------------- Navigation Control from Form "Adicionar Orden" -------------------------------------------
      'window[title="Adicionar una nueva Orden de Trabajo"] button[text="Siguiente"]':
        {
          click: "showNext",
        },
      'window[title="Adicionar una nueva Orden de Trabajo"] button[text="Anterior"]':
        {
          click: "showPrevious",
        },
    },
    //CRUD Create Orden de Trabajo
    CRUD_CreateNewOrdenDeTrabajo: function (btn, e) {
      var grid_vehiculo = Ext.getCmp("createordenform_card-0");
      var grid_tipointervencion = Ext.getCmp("createordenform_card-1");
      var sm_vehiculo = grid_vehiculo.getSelectionModel();
      var sm_tipointervencion = grid_tipointervencion.getSelectionModel();
      var record_vehiculo = sm_vehiculo.getSelection();
      var records_tipointervencion = sm_tipointervencion.getSelection();

      var ids = [];
      records_tipointervencion.forEach((e, i, a) => {
        ids.push(e.data.id);
      });

      Ext.Ajax.request({
        headers: { Token: "TacoLuServices2024**" },
        url: "api/3/get_ordenesdetrabajo",
        method: "POST",
        params: {
          no_orden: Ext.getCmp("resumen_numero_orden").getValue(),
          fecha_orden: Ext.getCmp("resumen_fecha").getValue(),
          id_vehiculo: record_vehiculo[0].data.id,
          tipos_intervenciones: Ext.encode(ids),
        },
        success: function (response, opts) {
          let response_server = Ext.decode(response.responseText);
          if (response_server.success) {
            Ext.StoreManager.lookup(
              "ordendetrabajo.OrdenDeTrabajoStore"
            ).load();
            Ext.StoreManager.lookup("vehiculo.VehiculoStore").load();

            btn.up("window").close();
            // Ext.getCmp("CardPanel_AddOrden").up("window").close();
          } else {
            Ext.Msg.alert(
              "Error",
              "Ha existido un problema al crear la orden, contacte al administrador del sistema"
            );
          }
        },

        failure: function (response, opts) {
          console.log(
            "server-side failure with status code " + response.status
          );
        },
      });
    },

    //---------------------------------- Controlling Cards Methods ----------------------------------------------------------
    OnSelectionChange_SelectTiposDeIntervenciones_Card2: function (
      sm,
      records
    ) {
      var btn_siguiente = Ext.getCmp("createordenform_card-1")
        .up("window")
        .down('button[text="Siguiente"]');
      var btn_anterior = Ext.getCmp("createordenform_card-1")
        .up("window")
        .down('button[text="Anterior"]');

      if (records.length > 0) btn_siguiente.setDisabled(false);
      else btn_siguiente.setDisabled(true);
    },

    //---------------------------------- Controlling Cards Methods ----------------------------------------------------------

    //-------------------------------------- Nav Methods -----------------------------------------------------------------
    showNext: function (btn) {
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
      (l = win.getLayout()),
        (i = l.activeItem.id.split("createordenform_card-")[1]),
        (next = parseInt(i, 10) + incr);

      l.setActiveItem(next);

      var btn_anterior = win.down('button[text="Anterior"]');
      if (next == 0) btn_anterior.setDisabled(true);
      var btn_siguiente = win.down('button[text="Siguiente"]');
      if (next == 2) btn_siguiente.setDisabled(true);
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
            /*listeners: {
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
          },*/
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
          id_tacografo: grid_tacografo.getSelectionModel().getSelection()[0]
            .data.id,
        },
        success: function (response, opts) {
          Ext.StoreManager.lookup("ordendetrabajo.OrdenDeTrabajoStore").load();
          Ext.StoreManager.lookup("vehiculo.VehiculoStore").load();
          Ext.StoreManager.lookup("cliente.ClienteStore").load();
          Ext.StoreManager.lookup("tacografo.TacografoStore").load();
          btn.up("window").close();
          grid_vehiculo.down('toolbar[dock="bottom"] button[text="Vincular Tacógrafo"]').setDisabled(true)
        },

        failure: function (response, opts) {
          console.log(
            "server-side failure with status code " + response.status
          );
        },
      });
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
          console.log(
            "server-side failure with status code " + response.status
          );
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
            /*listeners: {
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
          },*/
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

    
    init: function () {},
  }
);
