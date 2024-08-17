Ext.define("MyApp.model.cliente.ClienteModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "codcliente", type: "string" },
    { name: "cifnif", type: "string" },
    { name: "email", type: "string" },
    { name: "nombre", type: "string" },
  ],
});
