Ext.define("MyApp.view.tacografo.form.CreateTacografoView_Window", {
  extend: "Ext.window.Window",
  title: "Adicionar un nuevo Tacógrafo",
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
              name:'numero_serie'
            },
            {
              xtype: "combobox",
              fieldLabel: "Model<span style='color:red'><b> *</b></span>",
              allowBlank: false,
              store: "tacografo.modelo.ModeloTacografoStore",
              displayField: "modelo_tacografo",
              valueField: "id",
              name:'id_modelo'
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
                maxWidth:800,
                minWidth:350
              },
              name:'id_categoria'
            },
            {
              xtype: "combobox",
              fieldLabel: "Matrícula",
              store: "vehiculo.VehiculoStore",
              displayField: "matricula",
              valueField: "id",
              typeAhead: true,
              listConfig: {
                width: 800,
                maxWidth:800,
                minWidth:350
              },
              pageSize: 1,
              name:'id_vehiculo'
            },
            {
              xtype: "combobox",
              fieldLabel:
                "Escala de Velocidad<span style='color:red'><b> *</b></span>",
              allowBlank: false,
              displayField: "nombre",
              valueField: "id",
              store:Ext.create("Ext.data.Store", {
                fields: ["id", "nombre"],
                data: [
                  { id: "100", nombre: "100 Km/h" },
                  { id: "125", nombre: "125 Km/h" },
                  { id: "140", nombre: "140 Km/h" },
                  { id: "180", nombre: "180 Km/h" },
                ],
              }),
              name:'escala_velocidad'
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Fabricación",
              format:'d-m-Y',
              name:'fecha_fabricacion'
            },
          ],
        },
        {
          items: [
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Instalación",
              format:'d-m-Y',
              name:'fecha_instalacion'
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de la última revisión",
              format:'d-m-Y',
              name:'fecha_ultima_revision'
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Fin de Garantía",
              format:'d-m-Y',
              name:'fecha_fin_garantia'
            },
            {
              xtype: "textarea",
              fieldLabel: "Homologación",
              name:'homologacion'
            },
            {
              xtype: "textarea",
              fieldLabel: "Comentarios",
              name:'comentarios'
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Crear Nuevo Tacógrafo",
          id:'AddNew_Tacografo',
          style: {
            textDecoration: "none",
          },
        },
      ],
    },
  ],
});
