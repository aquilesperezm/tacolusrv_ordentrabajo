Ext.define("MyApp.view.dashboard.centerpanel.CenterPanelView", {
  extend: "Ext.container.Container",
  region: "center",
  xtype: "centerpanel_view",
  layout:'fit',
  padding: 15,

  items: [
    {
      xtype: "ordendetrabajo_grid",
    }/*,
    {
      xtype: "tipointervencion_grid",
      title: "Tipos de Intervenciones por Orden de Trabajo Selecionada",
      store: "tipointervencion.TipoIntervencionByIDOrdenStore",
      margin: "10 0 0 0",
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        emptyMsg: "No existen Tipos de Revision para mostrar",
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
        ],
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

          var orden_grid = Ext.ComponentQuery.query("ordendetrabajo_grid")[0];
        
          cmp
            .getStore()
            .getProxy()
            .setConfig({
              extraParams: {
                id_orden: '1'
              },
            });
        },
      },
    },*/
  ],

  //activeTab: 0, // First tab active by default
  /* items: {
    // title: "Ordenes de Trabajo",
    items: [
      {
        xtype: "panel",
        scrollable: true,
        tbar: [
          {
            text: "Adicionar Orden de Trabajo",
            id: "Adicionar_Orden",
          },
          {
            text: "Actualizar Orden de Trabajo",
          },
          {
            text: "Eliminar Orden de Trabajo",
          },
          {
            text: "Imprimir Orden de Trabajo",
            id: "Imprimir_Orden",
            disabled: true,
            /*href:"/OrdenDeTrabajoReporte",
            params:{
                ordendetrabajo:1
            }
          },
          {
            xtype: "form",
            id: "Print_Form_OrdenTrabajo",
            hidden: true,
            standardSubmit: true,
            method: "POST",
            url: "OrdenDeTrabajoReporte",
            target: "_blank",
            baseParams: {
              // id:561
            },
          },
        ],
        items: [
          {
           // xtype: "gridpanel_ordenesdetrabajo_ui",
          },
          {
           // xtype: "gridpanel_tipointervencion_ui",
          }/*,
          {
            xtype: "form",
            title: "Formulario para Orden de Trabajo",
          },
        ],
      },
    ],
  },*/
});
