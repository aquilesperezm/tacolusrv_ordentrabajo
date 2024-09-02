Ext.define("MyApp.view.vehiculo.VehiculoView_Grid", {
  extend: "Ext.grid.Panel",
  xtype: "vehiculo_grid",
  title: "Vehiculos",
  //id: "IdGridOrdenDeTrabajo",
  store: "vehiculo.VehiculoStore",
  scrollable: true,
  height:
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ) /
      2 -
    30,
  selModel: {
    type: "checkboxmodel",
    checkOnly: false,
  },
  columns: [
    {
      xtype: "rownumberer",
      flex: 0.01,
      text: "#",
    },
    {
      text: "Matricula",
      flex: 1,
      dataIndex: "matricula",
    },
    {
      text: "Número de Chasis",
      flex: 1,
      dataIndex: "num_chasis",
    },
    {
      text: "Cliente",
      flex: 1,
      dataIndex: "description_cliente",
    },
    {
      text: "Marca",
      flex: 1,
      dataIndex: "nombre_marca",
    },
    {
      text: "Modelo",
      flex: 1,
      dataIndex: "nombre_modelo",
    },
    {
      text: "Tipo de vehículo",
      flex: 1,
      dataIndex: "nombre_categoria",
    },
    {
      text: "¿Tiene Tacógrafo?",
      flex: 1,
      dataIndex: "tiene_tacografo_str",
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
      icon:'Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/add-file.ico'
     // iconCls: "tbar-add",
    }, // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
    { xtype: "tbspacer" },{xtype:'tbseparator'},{ xtype: "tbspacer" }, // same as ' ' to create Ext.toolbar.Spacer
    {
      text: "Actualizar",
      xtype: "button",
      scale: "medium",
      disabled:true,
      style: {
        textDecoration: "none",
      },
      icon:'Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/written-paper.ico'
     // iconCls: "tbar-update",
    },
    { xtype: "tbspacer" },{xtype:'tbseparator'},{ xtype: "tbspacer" }, // add a 50px space
    {
      text: "Eliminar",
      xtype: "button",
      scale: "medium",
      disabled:true,
      style: {
        textDecoration: "none",
      },
      icon:'Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/delete.ico',
    },{ xtype: "tbspacer" },{xtype:'tbseparator'},{ xtype: "tbspacer" },{
      text: "Detalles",
      id:'ShowDetails_Vehicle',
      xtype: "button",
      //hidden:true,
      scale: "medium",
      disabled:true,
      style: {
        textDecoration: "none",
      },
      icon: "Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/search.ico",
    },{ xtype: "tbspacer" },{xtype:'tbseparator'},{ xtype: "tbspacer" },
    {
      text: "Imprimir",
      xtype: "button",
      scale: "medium",
      disabled:true,
      style: {
        textDecoration: "none",
      },
      icon:'Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/print.ico',
    },{ xtype: "tbspacer" },{xtype:'tbseparator'},{ xtype: "tbspacer" },
    {
      xtype: 'textfield',
      fieldLabel:'<b>Criterio</b>',
      width:300,
      labelPad:0,
      labelWidth:50,
      enableKeyEvents:true,
      emptyText:'Matrícula o Número de Chasis ' 
    }, // add a 50px space
    /*{
      text: "Buscar",
      xtype: "button",
      scale: "medium",
      style: {
        textDecoration: "none",
      },
      icon:'Plugins/OrdenDeTrabajo/Assets/CSS/Extjs/icons/search.ico',
    }*/
  ],

  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    emptyMsg: "No existen Ordenes para mostrar",
    plugins: {
      "ux-progressbarpager": true,
    },
    items: [  
      {xtype:'tbseparator'},{
        enableKeyEvents:true,
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
  /*listeners: {
    selectionchange: function (grid, records) {
      var store = Ext.data.StoreManager.lookup("IntervencionByIDOrdenStore");
      var imprimir_btn = Ext.getCmp("Imprimir_Orden");
      var form_imprimir_btn = Ext.getCmp('Print_Form_OrdenTrabajo');
    
      if (records.length == 1) {

        
        imprimir_btn.setDisabled(false);
       
        //form_imprimir_btn.setConfig('baseParams',{id:561});
        //console.log(form_imprimir_btn);

        store.load({
          params: { id_orden: records[0].id },
        });
      } else {
        imprimir_btn.setDisabled(true);

        store.loadData([], false);
      }
    },
  },*/
});
