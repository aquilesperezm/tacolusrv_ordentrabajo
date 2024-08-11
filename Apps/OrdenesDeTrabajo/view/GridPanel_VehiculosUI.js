Ext.define('MyApp.view.GridPanel_VehiculosUI',{
    extend:'Ext.grid.Panel',
    xtype: "gridpanel_vehiculos_ui",
    title: "Vehículos",
    store: "VehiculosStore",
    padding: 10,
    height: 250,
    selModel: {
      type: "checkboxmodel",
      checkOnly: false,
      mode: "SINGLE",
      allowDeselect: true,
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
  });