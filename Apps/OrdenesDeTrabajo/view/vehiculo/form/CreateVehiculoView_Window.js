Ext.define("MyApp.view.vehiculo.form.CreateVehiculoView_Window", {
  extend: "Ext.window.Window",
  title: "Adicionar un nuevo vehiculo",
  modal: true,
  layout: "fit",
  resizable: false,
  draggable: false,
  //height:'auto',
  width:
    Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    ) /
      4 +
    100,

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
          xtype: "container",
          layout: "column",
          defaults: {},
          items: [
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
              columnWidth: 0.7,
            },
            {
              xtype: "container",
              columnWidth: 0.1,
            },
            {
              xtype: "button",
              text: "<b>+</b>",
              height: 30,
              columnWidth: 0.1,
              margin: "0 0 0 10",
              href: "EditCliente",
              tooltip: {
                text: "Adicionar un nuevo Cliente",
              },
              style: {
                textDecoration: "none",
              },
            },
          ],
        },
        {
          xtype: "container",
          layout: "column",
          defaults: {},
          items: [
            {
              xtype: "combobox",
              fieldLabel: "Marca",
              store: "marca.MarcaStore",
              displayField: "nombre_marca",
              valueField: "id",
              allowBlank: false,
              name: "id_marca",
              columnWidth: 0.7,

              listeners: {
                select: function (combo, record) {
                  // console.log(record);
                  Ext.data.StoreManager.lookup("modelo.ModeloStore").load({
                    callback: (records) => {
                      combo
                        .up("container")
                        .nextSibling("container").down('combo')
                        .setDisabled(false);
                      if (records.length > 0)
                        combo
                          .up("container")
                          .nextSibling("container").down('combo')
                          .select(records[0]);
                    },
                    params: {
                      id_marca: record.id,
                    },
                  });
                },
              },
            },
            {
              xtype: "container",
              columnWidth: 0.1,
            },
            {
              xtype: "button",
              text: "<b>+</b>",
              witdth: 30,
              height: 30,
              columnWidth: 0.1,
              margin: "0 0 0 10",
              href: "EditMarcaVehiculo",
              tooltip: {
                text: "Adicionar una nueva Marca",
              },
              style: {
                textDecoration: "none",
              },
            },
          ],
        },
        {
          xtype: "container",
          layout: "column",
          defaults: {},
          items: [
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
              columnWidth: 0.7,
            },
            {
              xtype: "container",
              columnWidth: 0.1,
            },
            {
              xtype: "button",
              text: "<b>+</b>",
              witdth: 30,
              height: 30,
              columnWidth: 0.1,
              margin: "0 0 0 10",
              href: "EditModeloVehiculo",
              tooltip: {
                text: "Adicionar un nuevo Modelo",
              },
              style: {
                textDecoration: "none",
              },
            },
          ],
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
