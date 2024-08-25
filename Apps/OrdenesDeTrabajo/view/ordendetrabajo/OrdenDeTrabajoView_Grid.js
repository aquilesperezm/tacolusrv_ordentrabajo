Ext.define("MyApp.view.ordendetrabajo.OrdenDeTrabajoView_Grid", {
  extend: "Ext.grid.Panel",
  xtype: "ordendetrabajo_grid",
  title: "Ordenes de Trabajo",
  //id: "IdGridOrdenDeTrabajo",
  store: "ordendetrabajo.OrdenDeTrabajoStore",
  scrollable: true,
  height:'100%',
  selModel: {
    type: "checkboxmodel",
    checkOnly: false,
    mode: "SINGLE",
    //allowDeselect: true,
  },
  columns: [
    {
      xtype: "rownumberer",
      flex: 0.1,
      text: "#",
    },
    {
      text: "No. Orden de Trabajo",
      flex: 1,
      dataIndex: "numero_orden",
    },
    {
      text: "Fecha",
      flex: 0.5,
      dataIndex: "fecha_orden",
      // xtype: "datecolumn",
      // format: "d-m-Y",
    },
    {
      text: "Centro Autorizado",
      flex: 1,
      dataIndex: "full_centroautorizado",
    },
    {
      text: "Cliente",
      flex: 1,
      dataIndex: "full_cliente",
    },
    {
      text: "Vehículo",
      flex: 1.5,
      dataIndex: "full_vehiculo",
    },
    {
      text: "No. Serie Tacografo",
      flex: 1.5,
      dataIndex: "no_serie_tacografo",
    },
  ],
  tbar: [
    {
      text: "Adicionar",
      xtype: "button",
      scale: "medium",
      style: {
        textDecoration: "none",
      },
      icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/add-file.ico",
      // iconCls: "tbar-add",
    }, // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
    { xtype: "tbspacer" },
    { xtype: "tbseparator" },
    { xtype: "tbspacer" }, // same as ' ' to create Ext.toolbar.Spacer
    {
      text: "Actualizar",
      xtype: "button",
      scale: "medium",
      disabled: true,
      style: {
        textDecoration: "none",
      },
      handler: function (btn, e) {
        Ext.create(
          "MyApp.view.ordendetrabajo.form.UpdateOrdenDeTrabajoView_Window"
        ).show();
      },
      icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/written-paper.ico",
      // iconCls: "tbar-update",
    },
    { xtype: "tbspacer" },
    { xtype: "tbseparator" },
    { xtype: "tbspacer" }, // add a 50px space
    {
      text: "Eliminar",
      xtype: "button",
      scale: "medium",
      disabled: true,
      style: {
        textDecoration: "none",
      },
      icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/delete.ico",
      handler: (btn, e) => {
        var records = btn.up("grid").getSelectionModel().getSelection();
        var ids = [];
        records.forEach((v, i, a) => {
          ids.push(v.id);
        });

        Ext.Msg.show({
          title: "Aviso",
          message:
            "Se eliminaran los elementos seleccionados, ¿Usted esta seguro?",
          buttons: Ext.Msg.YESNO,
          icon: Ext.Msg.WARNING,
          fn: function (btn) {
            if (btn === "yes") {
              Ext.Ajax.request({
                headers: { Token: "TacoLuServices2024**" },
                method: "POST",
                url: "api/3/get_ordenesdetrabajo",
                params: {
                  action: "delete",
                  ids: Ext.encode(ids),
                },
                success: function (response, opts) {
                  //  var obj = Ext.decode(response.responseText);
                  //  console.dir(obj);
                  Ext.data.StoreManager.lookup(
                    "ordendetrabajo.OrdenDeTrabajoStore"
                  ).loadPage(1, {
                    callback: (records, operation, success) => {
                      if (records.length > 0)
                        Ext.ComponentQuery.query("ordendetrabajo_grid")[0]
                          .getSelectionModel()
                          .select(0);
                    },
                  });
                },

                failure: function (response, opts) {
                  // console.log('server-side failure with status code ' + response.status);
                },
              });
            }
            /*Ext.data.StoreManager.lookup(
              "ordendetrabajo.OrdenDeTrabajoStore"
            ).loadPage(1);*/
          },
        });
      },
    },
    { xtype: "tbspacer" },
    { xtype: "tbseparator" },
    { xtype: "tbspacer" },
    {
      text: "Imprimir",
      xtype: "button",
      scale: "medium",
      id: "Imprimir_Orden",
      disabled: true,
      style: {
        textDecoration: "none",
      },
      icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/print.ico",
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
    { xtype: "tbspacer" },
    { xtype: "tbseparator" },
    { xtype: "tbspacer" },
    {
      xtype: "textfield",
      fieldLabel: "<b>Buscar</b>",
      labelPad: 0,
      labelWidth: 70,
      width:700,
      enableKeyEvents: true,
      emptyText: "Número de Orden, CIFNIF Cliente, Matrícula, Número de Chasis, Número de Serie del Tacógrafo",
    }, // add a 50px space
    {
      text: "Buscar",
      xtype: "button",
      hidden:true,
      scale: "medium",
      style: {
        textDecoration: "none",
      },
      icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/search.ico",
    },
  ],

  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    emptyMsg: "No existen Ordenes para mostrar",
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
        width: 170,

        //pagesize
        value: 50,
        //maxValue: 99,
        minValue: 5,
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,
       // maxLength: 2,
        enforceMaxLength: true,
      },
    ],
  },
});
