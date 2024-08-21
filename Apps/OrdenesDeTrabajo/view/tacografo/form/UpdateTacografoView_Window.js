Ext.define("MyApp.view.tacografo.form.UpdateTacografoView_Window", {
  extend: "Ext.window.Window",
  title: "Actualizar un Tacógrafo existente",
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
    ) / 2,
  items: [
    {
      xtype: "form",
      layout: "column",
      listeners: {
        beforerender: function (cmp) {
          
          var grid_tacografos = Ext.ComponentQuery.query(
            'window[title="Vincular un Tacógrafo a un Vehículo"] > tacografo_grid'
          )[0];

          var selected_record = grid_tacografos.getSelectionModel().getSelection()[0];

          cmp.loadRecord(selected_record);

        },
      },

      defaults: {
        layout: "form",
        xtype: "container",
        defaultType: "textfield",
        style: "width: 50%",
        padding: 10,
      },
      items: [
        {
          items: [
            {
              xtype: "textfield",
              fieldLabel:
                "Número de Serie<span style='color:red'><b> *</b></span>",
              allowBlank: false,
              name: "numero_serie",
            },
            {
              xtype: "combobox",
              fieldLabel: "Model<span style='color:red'><b> *</b></span>",
              allowBlank: false,
              store: "tacografo.modelo.ModeloTacografoStore",
              displayField: "modelo_tacografo",
              valueField: "id",
              name: "id_modelo",
            },
            {
              xtype: "combobox",
              fieldLabel: "Categoría<span style='color:red'><b> *</b></span>",
              store: "tacografo.categoria.CategoriaTacografoStore",
              allowBlank: false,
              displayField: "nombre_categoriatacografo",
              valueField: "id",
              listConfig: {
                width: 800,
                maxWidth: 800,
                minWidth: 350,
              },
              name: "id_categoria",
            },
            {
              xtype: "combobox",
              fieldLabel: "Matrícula",
              store: "vehiculo.VehiculoStore",
              displayField: "matricula",
              valueField: "id",
              //disabled:true,
              typeAhead: true,
              listConfig: {
                width: 800,
                maxWidth: 800,
                minWidth: 350,
              },
              pageSize: 1,
              name: "id_vehiculo",
            },
            {
              xtype: "combobox",
              fieldLabel:
                "Escala de Velocidad<span style='color:red'><b> *</b></span>",
              allowBlank: false,
              displayField: "nombre",
              valueField: "id",
              store: Ext.create("Ext.data.Store", {
                fields: ["id", "nombre"],
                data: [
                  { id: "100", nombre: "100 Km/h" },
                  { id: "125", nombre: "125 Km/h" },
                  { id: "140", nombre: "140 Km/h" },
                  { id: "180", nombre: "180 Km/h" },
                ],
              }),
              name: "escala_velocidad",
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Fabricación",
              format: "d-m-Y",
              name: "fecha_fabricacion",
            },
          ],
        },
        {
          items: [
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Instalación",
              format: "d-m-Y",
              name: "fecha_instalacion",
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de la última revisión",
              format: "d-m-Y",
              name: "fecha_ultima_revision",
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Fin de Garantía",
              format: "d-m-Y",
              name: "fecha_fin_garantia",
            },
            {
              xtype: "textarea",
              fieldLabel: "Homologación",
              name: "homologacion",
            },
            {
              xtype: "textarea",
              fieldLabel: "Comentarios",
              name: "comentarios",
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Actualizar Tacógrafo Existente",
          id: "Update_Tacografo",
          style: {
            textDecoration: "none",
          },
        },
      ],
    },
  ],
});
