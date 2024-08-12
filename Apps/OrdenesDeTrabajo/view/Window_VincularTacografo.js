Ext.define("MyApp.view.Window_VincularTacografo", {
  extend: "Ext.window.Window",
  modal: true,
  title: "Tacografos",
  height: "50%",
  width: "50%",
  layout: "fit",
  scrollable:true,
  resizable:false,
  items: {
    xtype: "grid",
    scrollable:true,
    resizable:false,
    id: "Select_VincularTacografo",
    selModel: {
      type: "checkboxmodel",
      checkOnly: false,
      mode: "SINGLE",
      allowDeselect: true,
    },
    title: "Seleccione un Tacografo",
    border: false,
    columns: [
      {
        xtype: "rownumberer",
        flex: 0.01,
        text: "#",
      },
      {
        text: "Número de Serie",
        dataIndex: "numero_serie",
        flex: 1,
      },
      {
        text: "Modelo",
        dataIndex: "modelo",
        flex: 1,
      },
      {
        text: "Categoría",
        dataIndex: "categoria",
        flex: 1,
      },
      {
        text: "Escala de Velocidad",
        dataIndex: "escala_velocidad",
        flex: 1,
      },
      {
        text: "Homologación",
        dataIndex: "homologacion",
        flex: 1,
      },
      {
        text: "Fecha Fin de Garantía",
        dataIndex: "fecha_fin_garantia",
        flex: 1,
      }
    ],
    store: "TacografosStore",
  },
  buttons: [
    {
      text: "Aceptar",
      disabled: true,
      id: "Aceptar_VincularTacografo",
    },
  ],
});
