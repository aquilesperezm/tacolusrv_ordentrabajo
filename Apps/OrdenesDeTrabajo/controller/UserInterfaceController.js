Ext.define("MyApp.controller.UserInterfaceController", {
  extend: "Ext.app.Controller",

  stores: ["OrdenesDeTrabajoStore", "IntervencionByIDOrdenStore",
           "VehiculosStore"
  ],
  views: ["UserInterfaceManager"],

  control: {
    "#Adicionar_Orden": {
      click: "onClick_Adicionar_Orden",
    },
    "#card-0 > grid": {
      select: "onSelectVehiculo_AddOrden"
    },
    '#CardPanel_AddOrden button[text="Siguiente"]': {
      click: "FormAddOrden_Forward"
    },
    '#CardPanel_AddOrden button[text="Anterior"]': {
      click: "FormAddOrden_Backward"
    }

  },


  FormAddOrden_Forward: function(btn,e){
    this.doCardNavigation(1);
  },

  FormAddOrden_Backward: function(btn,e){
    this.doCardNavigation(-1);
  },

  onSelectVehiculo_AddOrden: function(selmodel,record,index){
    var btn = Ext.ComponentQuery.query('#CardPanel_AddOrden button[text="Siguiente"]')[0];
    btn.setDisabled(false)

  },


  init: function () {},

  doCardNavigation: function (addr) {
    var card_panel = Ext.getCmp("CardPanel_AddOrden");

    var l = card_panel.getLayout();
    var i = l.activeItem.id.split("card-")[1];
    next = parseInt(i, 10) + addr;

    l.setActiveItem(next);

    card_panel.down("#card-prev").setDisabled(next === 0);
    card_panel.down("#card-next").setDisabled(next === 1);
  },

  onClick_Adicionar_Orden: function () {
    

    var vehiculos_store = Ext.StoreManager.lookup('VehiculosStore');
    vehiculos_store.load();
  

    Ext.create("Ext.window.Window", {
      title: "Adicionar Orden de Trabajo",
      resizable:false,
      height: "70%",
      width: "70%",
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
              title:'Selección del Vehículo',
              items:[{
                xtype:'grid',
                title:'Vehículos',
                store:'VehiculosStore',
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
                  text:'Matricula',
                  flex:1,
                  dataIndex:'matricula'
                },{
                  text:'Número de Chasis',
                  flex:1,
                  dataIndex:'num_chasis'
                },{
                  text:'Cliente',
                  flex:1,
                  dataIndex:'description_cliente'
                },{
                  text:'Marca',
                  flex:1,
                  dataIndex:'nombre_marca'
                },{
                  text:'Modelo',
                  flex:1,
                  dataIndex:'nombre_modelo'
                },{
                  text:'Tipo de vehículo',
                  flex:1,
                  dataIndex:'nombre_categoria'
                },{
                  text:'¿Tiene Tacógrafo?',
                  flex:1,
                  dataIndex:'tiene_tacografo_str'
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
                  text:'Buscar Vehículo',
                  margin:10
                },{
                  xtype:'button',
                  disabled:true,
                  text:'Vincular Tacógrafo',
                  margin:10
                }]
              },]
            },
            {
              id: "card-1",
              xtype:'panel',
              title:'Selección de los tipos de Intervenciones',
              items:[{
                xtype: "grid",
                padding:10,
                height:250,
                //height: 300,
                title:
                  "Tipos de Intervenciones por Orden de Trabajo Seleccionada",
                selModel: {
                  type: "checkboxmodel",
                  checkOnly: false
                },
                store: Ext.create("MyApp.store.IntervencionByIDOrdenStore",{
                  
                }),
                columns: [
                  {
                    xtype: "rownumberer",
                    flex: 0.01,
                    text: "#"
                  },
                  {
                    text: "Nombre de Intervención",
                    flex: 1,
                    dataIndex:'nombre_tipointervencion'
                  },
                ],
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
                  text:'Buscar Tipo de Intervención',
                  margin:10
                }]
              }]
            }

          ],
          bbar: [
            "->",
            {
              text: "Anterior",
              itemId: "card-prev",
              disabled: true
            },
            {
              text: "Siguiente",
              itemId: "card-next",
              disabled: true
            },
          ],
        },
      ],
    }).show();
  },
});
