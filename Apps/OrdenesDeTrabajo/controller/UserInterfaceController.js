Ext.define("MyApp.controller.UserInterfaceController", {
  extend: "Ext.app.Controller",

  stores: ["OrdenesDeTrabajoStore", "IntervencionByIDOrdenStore"],
  views: ["UserInterfaceManager"],

  control: {
    "#Adicionar_Orden": {
      click: "onClick_Adicionar_Orden",
    },
  },

  init: function () {},

  doCardNavigation: function (addr) {
    var card_panel = Ext.getCmp("CardPanel_AddOrden");

    var l = card_panel.getLayout();
    var i = l.activeItem.id.split("card-")[1];
    next = parseInt(i, 10) + addr;

    l.setActiveItem(next);

    card_panel.down("#card-prev").setDisabled(next === 0);
    card_panel.down("#card-next").setDisabled(next === 5);
  },

  onClick_Adicionar_Orden: function () {
    Ext.create("Ext.window.Window", {
      title: "Adicionar Orden de Trabajo",
      resizable:false,
      height: "50%",
      width: "30%",
      layout: "fit",
      items: [
        {
          xtype: "panel",
          resizable:false,
          layout: "card",
          id: "CardPanel_AddOrden",
          requires: ["Ext.layout.container.Card"],
          items: [
            {
              id: "card-0",
              xtype:'panel',
              title:'Selección del Centro Autorizado',
              items:[{
                xtype:'grid',
                title:'Centros Autorizados',
                padding:10,
                height:250,
                selModel: {
                  type: "checkboxmodel",
                  checkOnly: false,
                  mode:'SINGLE'
                },
                columns:[{
                  xtype: "rownumberer",
                  flex: 0.01,
                  text: "#"
                },{
                  text:'Código',
                  flex:1
                },{
                  text:'Nombre',
                  flex:5
                }]
              },{
                xtype:'form',
                title:'Buscar',
                layout:'hbox',
                padding:10,
                items:[{
                  xtype:'textfield',
                  fieldLabel:'Criterio',
                  padding:10
                },{
                  xtype:'button',
                  text:'Buscar',
                  margin:10
                }]
              },]
            },
            {
              id: "card-1",
              xtype:'panel',
              title:'Selección del Cliente',
              items:[{
                xtype:'grid',
                title:'Clientes',
                padding:10,
                height:250,
                selModel: {
                  type: "checkboxmodel",
                  checkOnly: false,
                  mode:'SINGLE'
                },
                columns:[{
                  xtype: "rownumberer",
                  flex: 0.01,
                  text: "#"
                },{
                  text:'CIF / NIF',
                  flex:1
                },{
                  text:'Nombre',
                  flex:1
                },{
                  text:'E-Mail',
                  flex:1
                }]
              },{
                xtype:'form',
                title:'Buscar',
                layout:'hbox',
                padding:10,
                items:[{
                  xtype:'textfield',
                  fieldLabel:'Criterio',
                  padding:10
                },{
                  xtype:'button',
                  text:'Buscar',
                  margin:10
                }]
              },]
            },
            {
              id: "card-2",
              xtype:'panel',
              title:'Selección del Vehículo',
              items:[{
                xtype:'grid',
                title:'Vehículos',
                padding:10,
                height:250,
                selModel: {
                  type: "checkboxmodel",
                  checkOnly: false,
                  mode:'SINGLE'
                },
                columns:[{
                  xtype: "rownumberer",
                  flex: 0.01,
                  text: "#"
                },{
                  text:'CIF / NIF',
                  flex:1
                },{
                  text:'Nombre',
                  flex:1
                },{
                  text:'E-Mail',
                  flex:1
                }]
              },{
                xtype:'form',
                title:'Buscar',
                layout:'hbox',
                padding:10,
                items:[{
                  xtype:'textfield',
                  fieldLabel:'Criterio',
                  padding:10
                },{
                  xtype:'button',
                  text:'Buscar',
                  margin:10
                }]
              },]
            },
            {
              id: "card-3",
              xtype:'panel',
              title:'Selección del Tacógrafo'
            },
            {
              id: "card-4",
              xtype:'panel',
              title:'Selección de los Tipos de Intervenciones'
            },
            {
              id: "card-5",
              xtype:'panel',
              title:'Resumen'
            }

          ],
          bbar: [
            "->",
            {
              text: "Anterior",
              itemId: "card-prev",
              disabled: true,
              listeners: {
                click: (e) => {
                  this.doCardNavigation(-1);
                },
              },
            },
            {
              text: "Siguiente",
              itemId: "card-next",
              listeners: {
                click: (e) => {
                  this.doCardNavigation(1);
                },
              },
            },
          ],
        },
      ],
    }).show();
  },
});
