Ext.define("MyApp.controller.ordendetrabajo.OrdenDeTrabajoController", {
  extend: "Ext.app.Controller",

  stores: [
    "ordendetrabajo.OrdenDeTrabajoStore",
    "tipointervencion.TipoIntervencionByIDOrdenStore",
  ],
  views: ["ordendetrabajo.OrdenDeTrabajoView_Grid"],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'ordendetrabajo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'ordendetrabajo_grid toolbar[dock="top"] > textfield': {
      // specialkey: "onSpecialKeyPress_TextfieldSearch",
      keyup: "onSpecialKeyPress_TextfieldSearch",
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
    "#Imprimir_Orden": {
      click: "onClick_Imprimir_Orden",
    },

    //Cuando seleccionamos detalles de la orden de trabajo

    "#ShowDetailsFromOrderOfWork": {
      click: "onClickShowDetails_OrderOfWork",
    },

    //cuando seleccionamos una orden de trabajo, se actualizara la tabla de los tipos de intervenciones que se
    //encuentra debajo
    ordendetrabajo_grid: {
      selectionchange: "OnSelectionChange_OrdenesDeTrabajo",
    },

    // ------------------------------------------------ End Navigation --------------------------------------------------------
  }, //end event selector - control -  by controllers

  onClickShowDetails_OrderOfWork: function (btn, e) {
    Ext.create({
      xtype: "window",
      title: "Detalles",
      modal: true,
      layout: "fit",
      resizable: false,
      draggable: false,
      width:
        Math.max(
          document.body.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.clientWidth,
          document.documentElement.scrollWidth,
          document.documentElement.offsetWidth
        ) / 2,
      items: [
        {
          xtype: "container",
          //id: "createordenform_card-2",
          //title: "Detalles de la Orden",
          listeners: {
            beforerender: (cmp) => {
              var grid_orden = Ext.ComponentQuery.query(
                "ordendetrabajo_grid"
              )[0];
              var selected_record = grid_orden
                .getSelectionModel()
                .getSelection()[0];

              console.log(selected_record);

              Ext.StoreManager.lookup(
                "tipointervencion.TipoIntervencionByIDOrdenStore"
              ).load({
                callback: (records,opertion,success) => {
                  Ext.getCmp("detalle_centroautorizado").setValue(
                    selected_record.data.full_centroautorizado
                  );
                  Ext.getCmp("detalle_numero_orden").setValue(
                    selected_record.data.numero_orden
                  );
                  Ext.getCmp("detalle_fecha").setValue(
                    selected_record.data.fecha_orden
                  );
                  Ext.getCmp("detalle_cliente").setValue(
                    selected_record.data.full_cliente
                  );
                  Ext.getCmp("detalle_vehiculo").setValue(
                    selected_record.data.full_vehiculo
                  );
                  Ext.getCmp("detalle_no_serie_tacografo").setValue(
                    selected_record.data.no_serie_tacografo
                  );

                  var html = "<ul>";
                  records.forEach((e, i, a) => {
                    html += "<li>" + e.data.nombre;
                    +"</li>";
                  });
    
                  html +=
                    "<li>y las operaciones necesarias para asegurar el correcto funcionamiento del tacógrafo.</li>";
    
                  html += "</ul>";
    
                  Ext.getCmp("detalle_intervenciones_solicitadas").setValue(html);

                },
              });
            },

            /*beforerender: function (panel) {
              var grid_vehiculo = Ext.getCmp("createordenform_card-0");
              var grid_tipointervencion = Ext.getCmp("createordenform_card-1");

              var sm_vehiculo = grid_vehiculo.getSelectionModel();
              var sm_tipointervencion =
                grid_tipointervencion.getSelectionModel();

              var record_vehiculo = sm_vehiculo.getSelection();
              var records_tipointervencion = sm_tipointervencion.getSelection();

              // Resumen Centro autorizado
              Ext.getCmp("resumen_centroautorizado").setValue(
                record_vehiculo[0].data.codigo_centroautorizado +
                  " / " +
                  record_vehiculo[0].data.nombre_centroautorizado
              );

              //Resumen numero de orden
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
                record_vehiculo[0].data.logged_user_initial +
                "-" +
                record_vehiculo[0].data.matricula;

              Ext.getCmp("resumen_numero_orden").setValue(numero_orden);

              //Resumen para la fecha
              Ext.getCmp("resumen_fecha").setValue(fecha);

              //Resumen para el cliente
              Ext.getCmp("resumen_cliente").setValue(
                " " +
                  record_vehiculo[0].data.cifnif_cliente +
                  " / " +
                  record_vehiculo[0].data.nombre_cliente
              );

              //Resumen para el vehiculo
              Ext.getCmp("resumen_vehiculo").setValue(
                " " +
                  record_vehiculo[0].data.num_chasis +
                  " / " +
                  record_vehiculo[0].data.matricula
              );

              //Resumen para el tacografo
              Ext.getCmp("resumen_no_serie_tacografo").setValue(
                " " + record_vehiculo[0].data.num_serie_tacografo
              );

              //Tipos de Intervenciones
              var html = "<ul>";
              records_tipointervencion.forEach((e, i, a) => {
                html += "<li>" + e.data.nombre;
                +"</li>";
              });

              html +=
                "<li>y las operaciones necesarias para asegurar el correcto funcionamiento del tacógrafo.</li>";

              html += "</ul>";

              Ext.getCmp("resumen_intervenciones_solicitadas").setValue(html);
            }*/
          },
          items: [
            {
              xtype: "form",
              padding: 20,
              height: 380,
              scrollable: true,
              items: [
                {
                  xtype: "displayfield",
                  fieldLabel: "Centro de Autorización",
                  labelWidth: 200,
                  id: "detalle_centroautorizado",
                },
                {
                  xtype: "displayfield",
                  fieldLabel: "Número de Orden de Trabajo",
                  labelWidth: 200,
                  id: "detalle_numero_orden",
                },
                {
                  xtype: "displayfield",
                  fieldLabel: "Fecha:",
                  labelWidth: 200,
                  id: "detalle_fecha",
                },
                {
                  xtype: "displayfield",
                  fieldLabel: "Cliente:",
                  labelWidth: 200,
                  id: "detalle_cliente",
                },
                {
                  xtype: "displayfield",
                  fieldLabel: "Vehículo:",
                  labelWidth: 200,
                  id: "detalle_vehiculo",
                },
                {
                  xtype: "displayfield",
                  fieldLabel: "Número de Serie del Tacógrafo:",
                  labelWidth: 200,
                  id: "detalle_no_serie_tacografo",
                },
                {
                  xtype: "displayfield",
                  fieldLabel: "Intervenciones Solicitadas:",
                  labelWidth: 200,
                  id: "detalle_intervenciones_solicitadas",
                },
              ] /*,
            buttons: [
              {
                text: "Guardar Nueva Orden",
                id: "Create_NewOrdenTrabajo",
                style: {
                  textDecoration: "none",
                },
              },
            ],*/,
            },
          ],
        },
      ],
    }).show();
  },

  onClick_Imprimir_Orden: function (btn, e) {
    var grid_ordenes = btn.up("grid");
    var selected_record = grid_ordenes.getSelectionModel().getSelection();
    var id_selected_record = selected_record[0].data.id;

    Ext.getCmp("Print_Form_OrdenTrabajo")
      .getForm()
      .submit({
        target: "_blank",
        params: {
          id_orden: id_selected_record,
        },
      });
  },

  //-------------------------------------------------------------------------------------------------------------------------------------
  /**
   * @description Encarga de realizar la interaccion entre la tabla ordenes
   * y tipo de intervencion, al pinchar un elemento de la tabla ordenes de trabajo
   * nos mostrara los tipos de intervenciones que esta posea.
   *
   * @param sm - Selection Model perteneciente al grid ordenes de trabajo
   * @param records - Los campos seleccionados
   */
  OnSelectionChange_OrdenesDeTrabajo: function (sm, records) {
    var store = Ext.data.StoreManager.lookup(
      "tipointervencion.TipoIntervencionByIDOrdenStore"
    );

    if (records.length > 0) {
      store.getProxy().setConfig({
        extraParams: {
          id_orden: records[0].data.id,
        },
      });

      store.loadPage(1, {
        params: {
          id_orden: records[0].data.id,
        },
      });

      //activate Update, Delete and Print Button
      /* let buttons = Ext.ComponentQuery.query(
        'ordendetrabajo_grid toolbar[dock="top"] button'
      );
      buttons.forEach((e, i, a) => {
        e.setDisabled(false);
      });*/
    }
    var details_btn = Ext.getCmp("ShowDetailsFromOrderOfWork");
    details_btn.setDisabled(false);

    var print_btn = Ext.getCmp("ShowDetailsFromOrderOfWork").nextSibling(
      "button"
    );
    print_btn.setDisabled(false);

    var delete_btn = details_btn.previousSibling("button");
    delete_btn.setDisabled(false);

    var update_btn = delete_btn.previousSibling("button");
    update_btn.setDisabled(false);
  },

  onClick_ButtonAdd: function (btn, e) {
    Ext.create(
      "MyApp.view.ordendetrabajo.form.CreateOrdenDeTrabajoView_Window"
    ).show();
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    var store_ordenes = cmp.up("ordendetrabajo_grid").getStore();

    store_ordenes.loadPage(1, {
      callback: (r, o, s) => {
        if (r.length > 0)
          cmp.up("ordendetrabajo_grid").getSelectionModel().select(0);
      },
      params: {
        criteria: cmp.getValue(),
      },
    });
  },

  onClick_ButtonSearch: function (cmp, e) {
    var textfield = cmp.previousSibling("textfield");
    var store_ordenes = cmp.up("ordendetrabajo_grid").getStore();

    store_ordenes.loadPage(1, {
      callback: (r, o, s) => {
        if (r.length > 0)
          cmp.up("ordendetrabajo_grid").getSelectionModel().select(0);
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
    var store = cmp.up("ordendetrabajo_grid").getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  //this method is called before the app boots
  init: function () {
    //console.log('controller orden de trabajo init')
  },
});
