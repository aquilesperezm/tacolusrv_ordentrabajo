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
              fieldLabel: "Número de Serie<span style='color:red'><b> *</b></span>",
              allowBlank:false
            },
            {
              xtype: "combobox",
              fieldLabel: "Model<span style='color:red'><b> *</b></span>",
              allowBlank:false,
              store:'tacografo.modelo.ModeloTacografoStore',
              displayField:'modelo_tacografo',
              valueField:'id'
            },
            {
              xtype: "combobox",
              fieldLabel: "Categoría<span style='color:red'><b> *</b></span>",
              allowBlank:false
            },
            {
              xtype: "combobox",
              fieldLabel: "Matrícula",
            },
            {
              xtype: "combobox",
              fieldLabel: "Escala de Velocidad<span style='color:red'><b> *</b></span>",
              allowBlank:false
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Fabricación",
            },
          ],
        },
        {
          items: [
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Instalación",
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de la última revisión",
            },
            {
              xtype: "datefield",
              fieldLabel: "Fecha de Fin de Garantía",
            },
            {
              xtype: "textarea",
              fieldLabel: "Homologación",
            },
            {
              xtype: "textarea",
              fieldLabel: "Comentarios",
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Crear Nuevo Tacógrafo",
          style: {
            textDecoration: "none",
          },
        },
      ],
    },
  ],
});
