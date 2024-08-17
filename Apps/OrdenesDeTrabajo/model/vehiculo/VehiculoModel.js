Ext.define("MyApp.model.vehiculo.VehiculoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "matricula", type: "string" },
    { name: "num_chasis", type: "string" },

    { name: "id_cliente", type: "int" },
    { name: "tiene_cliente", type: "bool" },
    { name: "codcliente", type: "string" },
    { name: "nombre_cliente", type: "string" },
    { name: "cifnif_cliente", type: "string" },
    { name: "description_cliente", type: "string" },

    { name: "id_centroautorizado", type: "int" },
    { name: "codigo_centroautorizado", type: "string" },
    { name: "nombre_centroautorizado", type: "string" },

    { name: "id_marca", type: "int" },
    { name: "nombre_marca", type: "string" },

    { name: "id_modelo", type: "int" },
    { name: "nombre_modelo", type: "string" },

    { name: "id_categoria", type: "int" },
    { name: "nombre_categoria", type: "string" },

    { name: "tiene_tacografo", type: "bool" },
    { name: "tiene_tacografo_str", type: "string" },

    { name: "logged_user", type: "string" },
    {
      name: "logged_user_initial",
      type: "string",
      calculate: (data) => {
        return new String(data.logged_user[0]).toLocaleUpperCase();
      },
    },
  ],
});
