Ext.define("MyApp.view.CardPanel_CreateOrdenTrabajoUI", {
  extend: "Ext.panel.Panel",
  xtype: "cardpanel_createordentrabajo_ui",
  resizable: false,
  layout: "card",
  id: "CardPanel_AddOrden",
  requires: ["Ext.layout.container.Card"],
  items: [
    {
      id: "card-0",
      xtype: "panel",
      title: "Selección del Vehículo",
      items: [
        {
          xtype: "gridpanel_vehiculos_ui",
        },
        {
          xtype: "form",
          title: "Buscar",
          layout: "hbox",
          padding: 10,
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Criterio",
              padding: 10,
            },
            {
              xtype: "button",
              text: "Buscar Vehículo",
              margin: 10,
            },
            {
              xtype: "button",
              disabled: true,
              text: "Vincular Tacógrafo",
              margin: 10,
            },
          ],
        },
      ],
    },
    {
      id: "card-1",
      xtype: "panel",
      title: "Selección de los tipos de Intervenciones",
      items: [
        {
          xtype: "gridpanel_tipointervencion_ui",
          store: "TipoIntervencionStore",
          title: "Tipos de Intervenciones por Orden de Trabajo Seleccionada",
          padding: 10,
          height: 250,
          columns: [
            {
              xtype: "rownumberer",
              flex: 0.01,
              text: "#",
            },
            {
              text: "Nombre de Intervención",
              flex: 1,
              dataIndex: "nombre",
            },
          ]
        },
        {
          xtype: "form",
          title: "Buscar",
          layout: "hbox",
          padding: 10,
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Criterio",
              padding: 10,
            },
            {
              xtype: "button",
              text: "Buscar Tipo de Intervención",
              margin: 10,
            },
          ],
        },
      ],
    },
    {
      id: "card-2",
      xtype: "panel",
      title: "Resumen de Orden de Trabajo",
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
            },
          ],
        },
      ],
    },
  ],
  bbar: [
    "->",
    {
      text: "Anterior",
      itemId: "card-prev",
      disabled: true,
    },
    {
      text: "Siguiente",
      itemId: "card-next",
      disabled: true,
    },
  ],
});
