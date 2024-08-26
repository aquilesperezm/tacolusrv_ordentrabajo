Ext.define("MyApp.view.ordendetrabajo.form.UpdateOrdenDeTrabajoView_Window", {
  extend: "Ext.window.Window",
  xtype: "update_ordedetrabajo_win",
  title: "Actualizar una Orden de Trabajo",
  modal: true,
  draggable: false,
  resizable: false,
  width:
    Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    ) / 1.5,
  items: [
    {
      xtype: "tipointervencion_grid",
      height: 450,
      listeners: {
        beforerender: (cmp) => {
          var t = cmp.down("toolbar");
          var i = t.query("button");
          var s = t.query("tbspacer");
          var p = t.query("tbseparator");

          i[0].setVisible(false);
          i[1].setVisible(false);
          i[2].setVisible(false);
          i[3].setVisible(false);

          s[0].setVisible(false);
          s[1].setVisible(false);
          s[2].setVisible(false);
          s[3].setVisible(false);
          s[4].setVisible(false);
          s[5].setVisible(false);
          s[6].setVisible(false);
          // s[7].setVisible(false)

          p[0].setVisible(false);
          p[1].setVisible(false);
          p[2].setVisible(false);
          p[3].setVisible(false);

          //select all
          var grid_orders = Ext.ComponentQuery.query('ordendetrabajo_grid[title="Ordenes de Trabajo"]')[0]
          //console.log(grid_orders.getSelectionModel().getSelection());

         /* var grid = Ext.ComponentQuery.query(
            'tipointervencion_grid[title="Tipos de Intervenciones por Orden de Trabajo Selecionada"]'
          )[0];*/

          var store = Ext.data.StoreManager.lookup(
            "tipointervencion.TipoIntervencionByIDOrdenStore"
          );
          var records = store.getData();


          var records_toSelect = cmp.getStore().getData();
          var records_selected = [];
          records.each((e1, i1, l1) => {
            records_toSelect.each((e, i, l) => {
              if (e1.id == e.id) records_selected.push(e);
            });
          });

          //console.log(records_selected);

          //ids.forEach((e, i, a) => {
          cmp.getSelectionModel().select(records_selected);
          // });
        },
      },
    },
  ],
  buttons: [
    {
      text: "Actualizar Orden de Trabajo",
      id:'Update_OrdeDeTrabajo',
      style: {
        textDecoration: "none",
      },
    },
  ],
});
