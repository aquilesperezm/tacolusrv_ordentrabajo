Ext.define("MyApp.controller.Create_OrdenTrabajo", {
  extend: "Ext.app.Controller",

  stores: ["ClientesStore", "TacografosStore"],

  views: [
    "GridPanel_OrdenesDeTrabajoUI",
    "GridPanel_TipoIntervencionUI",
    "CardPanel_CreateOrdenTrabajoUI",
    "GridPanel_VehiculosUI",
    "Window_VincularCliente",
    "Window_VincularTacografo",
  ],

  control: {
    "#Create_NewOrdenTrabajo": {
      click: "onCreateNewOrdenTrabajo",
    },
    "#card-0 > grid": {
      selectionchange: "onSelectVehiculo_AddOrden",
    },
    "#card-1 > grid": {
      selectionchange: "onSelectTipoDeIntervencion_AddOrden",
    },
    '#CardPanel_AddOrden button[text="Siguiente"]': {
      click: "FormAddOrden_Forward",
    },
    '#CardPanel_AddOrden button[text="Anterior"]': {
      click: "FormAddOrden_Backward",
    },
    "#CreateOrdenTrabajo_VincularCliente": {
      click: "onClick_VincularCliente",
    },
    "#Select_VincularCliente": {
      selectionchange: "onSelectChange_VincularCliente",
    },
    "#Aceptar_VincularClientes": {
      click: "onClick_Aceptar_VincularClientes",
    },
    "#CreateOrdenTrabajo_VincularTacografo": {
      click: "onClick_VincularTacografo",
    },
    "#Select_VincularTacografo": {
      selectionchange: "onSelectChange_VincularTacografo",
    },
    "#Aceptar_VincularTacografo": {
      click: "onClick_Aceptar_VincularTacografo",
    },
  },

  //---------------------------------------- Vincular Cliente y Tacografo -----------------------------------
  //vincular un cliente a un vehiculo
  onClick_VincularCliente: function (btn, e) {
    Ext.StoreManager.lookup("ClientesStore").load();
    Ext.create("MyApp.view.Window_VincularCliente").show();
  },

  onSelectChange_VincularCliente: function (sm, records, index) {
    if (sm.getSelection().length > 0) {
      Ext.getCmp("Aceptar_VincularClientes").setDisabled(false);
    } else Ext.getCmp("Aceptar_VincularClientes").setDisabled(true);
  },

  onClick_Aceptar_VincularClientes: function (btn, e) {
    var grid_vehiculo = Ext.ComponentQuery.query("#card-0 > grid")[0];
    var grid_vehiculo_sm = grid_vehiculo.getSelectionModel();

    var grid_cliente_vincular = Ext.getCmp("Select_VincularCliente");
    var grid_cliente_vincular_sm = grid_cliente_vincular.getSelectionModel();

    //console.log(grid_cliente_vincular_sm.getSelection())

    Ext.Ajax.request({
      headers: { Token: "TacoLuServices2024**" },
      url: "/facturas/api/3/cliente_manager",
      method: "POST",
      params: {
        id_vehiculo: grid_vehiculo_sm.getSelection()[0].data.id,
        id_cliente: grid_cliente_vincular_sm.getSelection()[0].data.codcliente,
      },
      success: function (response, opts) {
        Ext.StoreManager.lookup("OrdenesDeTrabajoStore").load();
        Ext.StoreManager.lookup("VehiculosStore").load();
        Ext.StoreManager.lookup("ClientesStore").load();
        Ext.StoreManager.lookup("TacografosStore").load();
        btn.up("window").close();
      },

      failure: function (response, opts) {
        console.log("server-side failure with status code " + response.status);
      },
    });
  },

  //vincular un tacografo a un vehiculo
  onClick_VincularTacografo: function (btn, e) {
    Ext.StoreManager.lookup("TacografosStore").load();
    Ext.create("MyApp.view.Window_VincularTacografo").show();
  },

  onSelectChange_VincularTacografo: function (sm, records, index) {
    if (sm.getSelection().length > 0) {
      Ext.getCmp("Aceptar_VincularTacografo").setDisabled(false);
    } else Ext.getCmp("Aceptar_VincularTacografo").setDisabled(true);
  },
  onClick_Aceptar_VincularTacografo: function (btn, e) {
    var grid_vehiculo = Ext.ComponentQuery.query("#card-0 > grid")[0];
    var grid_vehiculo_sm = grid_vehiculo.getSelectionModel();

    var grid_tacografo_vincular = Ext.getCmp("Select_VincularTacografo");
    var grid_tacografo_vincular_sm =
      grid_tacografo_vincular.getSelectionModel();

    //console.log(grid_cliente_vincular_sm.getSelection())

    Ext.Ajax.request({
      headers: { Token: "TacoLuServices2024**" },
      url: "/facturas/api/3/tacografo_manager",
      method: "POST",
      params: {
        id_vehiculo: grid_vehiculo_sm.getSelection()[0].data.id,
        id_tacografo: grid_tacografo_vincular_sm.getSelection()[0].data.id,
      },
      success: function (response, opts) {
        Ext.StoreManager.lookup("OrdenesDeTrabajoStore").load();
        Ext.StoreManager.lookup("VehiculosStore").load();
        Ext.StoreManager.lookup("ClientesStore").load();
        Ext.StoreManager.lookup("TacografosStore").load();
        btn.up("window").close();
      },

      failure: function (response, opts) {
        console.log("server-side failure with status code " + response.status);
      },
    });
  },

  //------------------------------------- Fin Vincular Cliente y Tacografo ---------------------------------------

  //Constructor
  init: function () {
    
  },

  FormAddOrden_Forward: function (btn, e) {
    this.doCardNavigation(1);
  },

  FormAddOrden_Backward: function (btn, e) {
    this.doCardNavigation(-1);
  },

  onSelectVehiculo_AddOrden: function (selmodel, records, index) {
    var btn = Ext.ComponentQuery.query(
      '#CardPanel_AddOrden button[text="Siguiente"]'
    )[0];

    let selected_row = selmodel.getSelection();

    Ext.StoreManager.lookup("TipoIntervencionStore").load();

    if (selmodel.getSelection().length > 0) {
      btn.setDisabled(
        !selected_row[0].data.tiene_tacografo ||
          !selected_row[0].data.tiene_cliente
      );
      Ext.getCmp("CreateOrdenTrabajo_VincularTacografo").setDisabled(
        selected_row[0].data.tiene_tacografo
      );
      Ext.getCmp("CreateOrdenTrabajo_VincularCliente").setDisabled(
        selected_row[0].data.tiene_cliente
      );
    } else {
      btn.setDisabled(true);
      Ext.getCmp("CreateOrdenTrabajo_VincularTacografo").setDisabled(true);
      Ext.getCmp("CreateOrdenTrabajo_VincularCliente").setDisabled(true);
    }
  },

  onSelectTipoDeIntervencion_AddOrden: function (selmodel, records, index) {
    var btn = Ext.ComponentQuery.query(
      '#CardPanel_AddOrden button[text="Siguiente"]'
    )[0];
    // console.log(selmodel.getSelection().length);
    if (selmodel.getSelection().length > 0) btn.setDisabled(false);
    else btn.setDisabled(true);
  },
  onCreateNewOrdenTrabajo: function (btn, e) {
    var grid_vehiculo = Ext.ComponentQuery.query("#card-0 > grid")[0];
    var grid_vehiculo_sm = grid_vehiculo.getSelectionModel().getSelection();

    var grid_tipointervenciones = Ext.ComponentQuery.query("#card-1 > grid")[0];
    var grid_tipointervenciones_sm = grid_tipointervenciones
      .getSelectionModel()
      .getSelection();

    var ids = [];
    grid_tipointervenciones_sm.forEach((e, i, a) => {
      ids.push(e.data.id);
    });

    Ext.Ajax.request({
      headers: { Token: "TacoLuServices2024**" },
      url: "/facturas/api/3/get_ordenesdetrabajo",
      method: "POST",
      params: {
        no_orden: Ext.getCmp("resumen_numero_orden").getValue(),
        fecha_orden: Ext.getCmp("resumen_fecha").getValue(),
        id_vehiculo: grid_vehiculo_sm[0].data.id,
        tipos_intervenciones: Ext.encode(ids),
      },
      success: function (response, opts) {
        
        let response_server = Ext.decode(response.responseText);
        if (response_server.success) {
          Ext.StoreManager.lookup("OrdenesDeTrabajoStore").load();
          Ext.StoreManager.lookup("VehiculosStore").load();
          Ext.getCmp("CardPanel_AddOrden").up("window").close();
        } else {
          Ext.Msg.alert(
            "Error",
            "Ha existido un problema al crear la orden, contacte al administrador del sistema"
          );
        }
      },

      failure: function (response, opts) {
        console.log("server-side failure with status code " + response.status);
      },
    });
  },
  doCardNavigation: function (addr) {
    var card_panel = Ext.getCmp("CardPanel_AddOrden");

    var l = card_panel.getLayout();
    var i = l.activeItem.id.split("card-")[1];
    next = parseInt(i, 10) + addr;

    l.setActiveItem(next);

    card_panel.down("#card-prev").setDisabled(next === 0);
    card_panel.down("#card-next").setDisabled(next === 2);

    if (next == 2) {
      //Estamos en la pagina de guardar
      //card_panel.down("#card-next").setText("Guardar");
      //card_panel.down("#card-next").setDisabled(false);

      var grid_vehiculo_selection = Ext.ComponentQuery.query(
        "#card-0 > grid"
      )[0]
        .getSelectionModel()
        .getSelection();

      var grid_tipointervenciones_selection = Ext.ComponentQuery.query(
        "#card-1 > grid"
      )[0]
        .getSelectionModel()
        .getSelection();

      //Relleno de los campos Resumen
      Ext.getCmp("resumen_centroautorizado").setValue(
        " " +
          grid_vehiculo_selection[0].data.codigo_centroautorizado +
          " / " +
          grid_vehiculo_selection[0].data.nombre_centroautorizado
      );

      var dt = new Date(Date.now());
      var fecha = Ext.Date.format(dt, "d-m-Y");
      var day = Ext.Date.format(dt, "d");

      var month = new Number(dt.getMonth() + 1);
      if (month < 10) month = "0" + month;
      //if(day < 10) day = '0' + day;

      // estructura del campo Year+Mes+Dia+(L - Lucas o V - Vanessa) + No. Matricula
      var numero_orden =
        dt.getFullYear() +
        month +
        day +
        "-" +
        grid_vehiculo_selection[0].data.logged_user_initial +
        "-" +
        grid_vehiculo_selection[0].data.matricula;
      Ext.getCmp("resumen_numero_orden").setValue(numero_orden);

      Ext.getCmp("resumen_fecha").setValue(fecha);

      Ext.getCmp("resumen_cliente").setValue(
        " " +
          grid_vehiculo_selection[0].data.cifnif_cliente +
          " / " +
          grid_vehiculo_selection[0].data.nombre_cliente
      );

      Ext.getCmp("resumen_vehiculo").setValue(
        " " +
          grid_vehiculo_selection[0].data.num_chasis +
          " / " +
          grid_vehiculo_selection[0].data.matricula
      );

      Ext.getCmp("resumen_no_serie_tacografo").setValue(
        " " + grid_vehiculo_selection[0].data.num_serie_tacografo
      );

      var html = "<ul>";
      grid_tipointervenciones_selection.forEach((e, i, a) => {
        html += "<li>" + e.data.nombre;
        +"</li>";
      });

      html +=
        "<li>y las operaciones necesarias para asegurar el correcto funcionamiento del tacógrafo.</li>";

      html += "</ul>";

      Ext.getCmp("resumen_intervenciones_solicitadas").setValue(html);
    } else {
      card_panel.down("#card-next").setText("Siguiente");

      var grid_vehiculo_selection = Ext.ComponentQuery.query(
        "#card-0 > grid"
      )[0]
        .getSelectionModel()
        .getSelection();
      var grid_tipointervenciones_selection = Ext.ComponentQuery.query(
        "#card-1 > grid"
      )[0]
        .getSelectionModel()
        .getSelection();

      if (next == 0 && grid_vehiculo_selection.length == 0)
        card_panel.down("#card-next").setDisabled(true);

      if (next == 1 && grid_tipointervenciones_selection.length == 0)
        card_panel.down("#card-next").setDisabled(true);
    }
  },
});
