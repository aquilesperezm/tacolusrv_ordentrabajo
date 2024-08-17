Ext.define("MyApp.model.tacografo.TacografoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "numero_serie", type: "string" },
    { name: "modelo", type: "string" },
    { name: "categoria", type: "string" },
    { name: "escala_velocidad", type: "string" },
    { name: "homologacion", type: "string" },
    { name: "fecha_fin_garantia", type: "string" }

  ],
});
