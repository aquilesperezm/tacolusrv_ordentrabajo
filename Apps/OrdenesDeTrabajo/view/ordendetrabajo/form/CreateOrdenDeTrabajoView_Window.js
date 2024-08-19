Ext.define("MyApp.view.ordendetrabajo.form.CreateOrdenDeTrabajoView_Window", {
  extend: "Ext.window.Window",
  xtype: "create_ordedetrabajo_win",
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
            style: {
              textDecoration: "none",
            },
          },
        ],
      },
      //height: 350,
    },
    {
      id: "createordenform_card-1",
      xtype: "tipointervencion_grid",
      selModel: {
        type: "checkboxmodel",
        checkOnly: false,
        mode: "MULTI",
        allowDeselect: true,
      },
      listeners: {
        activate: function (grid) {
          if (grid.getSelectionModel().getSelection().length > 0)
            grid
              .up("window")
              .down('button[text="Siguiente"]')
              .setDisabled(false);
          else
            grid
              .up("window")
              .down('button[text="Siguiente"]')
              .setDisabled(true);

          grid.up("window").down('button[text="Anterior"]').setDisabled(false);
        },

        beforerender: function (cmp) {
          // console.log('beforerender');

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
    {
      id: "createordenform_card-2",
      title: "Resumen de Orden de Trabajo",
      listeners: {
        activate: function (panel) {
          var grid_vehiculo = Ext.getCmp("createordenform_card-0");
          var grid_tipointervencion = Ext.getCmp("createordenform_card-1");

          var sm_vehiculo = grid_vehiculo.getSelectionModel();
          var sm_tipointervencion = grid_tipointervencion.getSelectionModel();

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
        },
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
              id: "resumen_centroautorizado",
            },
            {
              xtype: "displayfield",
              fieldLabel: "Número de Orden de Trabajo",
              labelWidth: 200,
              id: "resumen_numero_orden",
            },
            {
              xtype: "displayfield",
              fieldLabel: "Fecha:",
              labelWidth: 200,
              id: "resumen_fecha",
            },
            {
              xtype: "displayfield",
              fieldLabel: "Cliente:",
              labelWidth: 200,
              id: "resumen_cliente",
            },
            {
              xtype: "displayfield",
              fieldLabel: "Vehículo:",
              labelWidth: 200,
              id: "resumen_vehiculo",
            },
            {
              xtype: "displayfield",
              fieldLabel: "Número de Serie del Tacógrafo:",
              labelWidth: 200,
              id: "resumen_no_serie_tacografo",
            },
            {
              xtype: "displayfield",
              fieldLabel: "Intervenciones Solicitadas:",
              labelWidth: 200,
              id: "resumen_intervenciones_solicitadas",
            },
          ],
          buttons: [
            {
              text: "Guardar Nueva Orden",
              id: "Create_NewOrdenTrabajo",
              style: {
                textDecoration: "none",
              },
            },
          ],
        },
      ],
    },
  ],
  buttons: [
    {
      text: "Anterior",
      disabled: true,
      style: {
        textDecoration: "none",
      },
    },
    {
      text: "Siguiente",
      disabled: true,
      style: {
        textDecoration: "none",
      },
    },
  ],
});
