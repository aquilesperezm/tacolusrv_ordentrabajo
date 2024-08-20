Ext.define("MyApp.view.vehiculo.form.CreateVehiculoView_Window", {
  extend: "Ext.window.Window",
  title: "Adicionar un nuevo vehiculo",
  modal: true,
  layout: "fit",
  resizable: false,
  draggable: false,
  height:
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ) /
      2 +
    200,
  width:
    Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    ) / 4,

  items: [
    {
      xtype: "form",
      // layout:'fit',
      defaults: {
        padding: "15 30 10 50",
      },
      items: [
        {
          xtype: "textfield",
          fieldLabel: "Matrícula",
          allowBlank: false,
          name: "matricula",
        },
        {
          xtype: "textfield",
          fieldLabel: "No. Chasis",
          allowBlank: false,
          name: "num_chasis",
        },
        {
          xtype: "combobox",
          fieldLabel: "Centro de Autorización",
          store: "centroautorizado.CentroAutorizadoStore",
          displayField: "nombre_centroautorizado",
          valueField: "id",
          scrollable: true,
          allQuery: "all_data",
          allowBlank: false,
          name: "id_centroautorizado",
        },
        {
          xtype: "combobox",
          fieldLabel: "Cliente",
          store: "cliente.ClienteStore",
          displayField: "nombre",
          valueField: "codcliente",
          scrollable: true,
          allQuery: "all_data",
          // allowBlank:false,
          name: "codcliente",
        },
        {
          xtype: "combobox",
          fieldLabel: "Marca",
          store: "marca.MarcaStore",
          displayField: "nombre_marca",
          valueField: "id",
          allowBlank: false,
          name: "id_marca",

          listeners: {
            select: function (combo, record) {
              // console.log(record);
              Ext.data.StoreManager.lookup("modelo.ModeloStore").load({
                callback: (records) => {
                  combo.nextSibling("combo").setDisabled(false);
                  if (records.length > 0)
                    combo.nextSibling("combo").select(records[0]);
                },
                params: {
                  id_marca: record.id,
                },
              });
            },
          },
        },
        {
          xtype: "combobox",
          fieldLabel: "Modelo",
          store: "modelo.ModeloStore",
          displayField: "nombre_modelo",
          valueField: "id",
          queryMode: "local",
          disabled: true,
          allowBlank: false,
          name: "id_modelo",
        },
        {
          xtype: "combobox",
          name: "id_categoria",
          fieldLabel: "Tipo de Vehículo",
          displayField: "nombre",
          valueField: "id",
          store: Ext.create("Ext.data.Store", {
            fields: ["id", "nombre"],
            data: [
              { id: "1", nombre: "Mercancía" },
              { id: "2", nombre: "Viajeros" },
            ],
          }),
          allowBlank: false,
        },
        {
          xtype: "datefield",
          fieldLabel: "Fecha de Matrícula",
          allowBlank: false,
          name: "fecha_matriculacion",
        },
        {
          xtype: "textarea",
          fieldLabel: "Comentarios",
          name: "comentarios",
        },
      ],
      buttons: [
        {
          text: "Crear Nuevo Vehículo",
          id: "AddNew_Vehiculo",
          style: {
            textDecoration: "none",
          },
        },
      ],
    },
  ],
});
