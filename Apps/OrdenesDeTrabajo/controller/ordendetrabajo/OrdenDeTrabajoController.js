Ext.define("MyApp.controller.ordendetrabajo.OrdenDeTrabajoController", {
  extend: "Ext.app.Controller",

  stores: [
    "ordendetrabajo.OrdenDeTrabajoStore",
    "tipointervencion.TipoIntervencionByIDOrdenStore",
  ],
  views: [
    "ordendetrabajo.OrdenDeTrabajoView_Grid"
  ],

  control: {
    // cuando cambiamos el valor del selector de cantidad de items que se muestran en la tabla
    'ordendetrabajo_grid toolbar[dock="bottom"] > numberfield[fieldLabel="Items por Página"]':
      {
        keyup: "onKeyUp_CounterPages",
      },
    // cuando damos ENTER en el campo de texto de la busqueda
    'ordendetrabajo_grid toolbar[dock="top"] > textfield': {
      specialkey: "onSpecialKeyPress_TextfieldSearch",
    },
    // cuando presionamos buscar, el boton que sigue al campo de texto
    'ordendetrabajo_grid toolbar[dock="top"] > button[text="Buscar"]': {
      click: "onClick_ButtonSearch",
    },

    // cuando damos click en adicionar orden
    'ordendetrabajo_grid toolbar[dock="top"] > button[text="Adicionar"]': {
      click: "onClick_ButtonAdd",
    },

    
    //cuando seleccionamos una orden de trabajo, se actualizara la tabla de los tipos de intervenciones que se
    //encuentra debajo
    ordendetrabajo_grid: {
      selectionchange: "OnSelectionChange_OrdenesDeTrabajo",
    },

    

    // ------------------------------------------------ End Navigation --------------------------------------------------------
  }, //end event selector - control -  by controllers

   //-------------------------------------------------------------------------------------------------------------------------------------
  /**
   * @description Encarga de realizar la interaccion entre la tabla ordenes
   * y tipo de intervencion, al pinchar un elemento de la tabla ordenes de trabajo
   * nos mostrara los tipos de intervenciones que esta posea.
   *
   * @param sm - Selection Model perteneciente al grid ordenes de trabajo
   * @param records - Los campos seleccionados
   */
  OnSelectionChange_OrdenesDeTrabajo: function (sm, records) {
    var store = Ext.data.StoreManager.lookup(
      "tipointervencion.TipoIntervencionByIDOrdenStore"
    );

    if (records.length > 0) {
      store.getProxy().setConfig({
        extraParams: {
          id_orden: records[0].data.id,
        },
      });

      store.loadPage(1, {
        params: {
          id_orden: records[0].data.id,
        },
      });
    }
    //var imprimir_btn = Ext.getCmp("Imprimir_Orden");
    //var form_imprimir_btn = Ext.getCmp('Print_Form_OrdenTrabajo');

    /*if (records.length == 1) {

        
        imprimir_btn.setDisabled(false);
       
        //form_imprimir_btn.setConfig('baseParams',{id:561});
        //console.log(form_imprimir_btn);

        store.load({
          params: { id_orden: records[0].id },
        });
      } else {
        imprimir_btn.setDisabled(true);

        store.loadData([], false);
      }*/
  },

  onClick_ButtonAdd: function (btn, e) {
    Ext.create(
      "MyApp.view.ordendetrabajo.form.CreateOrdenDeTrabajoView_Window"
    ).show();
  },

  onSpecialKeyPress_TextfieldSearch: function (cmp, e) {
    if (e.getKey() == e.ENTER) {
      this.onClick_ButtonSearch(cmp.nextSibling("button"));
    }
  },

  onClick_ButtonSearch: function (cmp, e) {
    var textfield = cmp.previousSibling("textfield");
    var store_ordenes = cmp.up("ordendetrabajo_grid").getStore();

    store_ordenes.loadPage(1, {
      params: {
        criteria: textfield.getValue(),
      },
    });
  },
  /**
   * @abstract Funcion encargada de controlar el contador de la cantidad de items a mostrar
   *           el componente se encuentra despues del paginado.
   *
   * @event keyup
   */
  onKeyUp_CounterPages: function (cmp) {
    var store = cmp.up("ordendetrabajo_grid").getStore();
    store.setPageSize(cmp.getValue());
    store.loadPage(1);
  },

  //this method is called before the app boots
  init: function () {
    //console.log('controller orden de trabajo init')
  },
});
