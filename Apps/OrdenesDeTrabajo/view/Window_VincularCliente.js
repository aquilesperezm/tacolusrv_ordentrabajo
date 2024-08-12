Ext.define("MyApp.view.Window_VincularCliente", {
  extend: "Ext.window.Window",
  modal: true,
  title: "Clientes",
  height: "50%",
  width: "50%",
  layout: "fit",
  items: {
    xtype: "grid",
    id:'Select_VincularCliente',
    selModel: {
      type: "checkboxmodel",
      checkOnly: false,
      mode: "SINGLE",
      allowDeselect: true,
    },
    title: "Seleccione un Cliente",
    border: false,
    columns: [{
        xtype: "rownumberer",
        flex: 0.01,
        text: "#",
      },
      {
        text: "Código",
        dataIndex: "codcliente",
        flex:1
      },
      {
        text: "CIF/NIF",
        dataIndex: "cifnif",
        flex:1
      },
      {
        text: "Nombre",
        dataIndex: "nombre",
        flex:1
      },
      {
        text: "E-Mail",
        dataIndex: "email",
        flex:1
      },
    ],
    store: "ClientesStore",
  },
  buttons: [
    {
      text: "Aceptar",
      disabled: true,
      id:'Aceptar_VincularClientes'
    },
  ],
});
