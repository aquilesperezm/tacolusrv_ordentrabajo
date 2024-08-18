Ext.define('MyApp.model.tipointervencion.TipoIntervencionByIDOrdenModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',  type: 'int'},
        {name: 'numero_orden',   type: 'string'},
        {name: 'fecha_orden', type: 'date'},
        {name: 'id_centroautorizado',   type: 'int'},
        {name: 'codigo_centroautorizado', type: 'string'},
        {name: 'nombre_centroautorizado', type: 'string'},
        {name: 'nombre_cliente', type: 'string'},
        {name: 'codcliente', type: 'string'},
        {name: 'cifnif_cliente', type: 'string'},
        {name: 'full_cliente', type: 'string', calculate: (data)=>{return data.cifnif_cliente
            + " / " + data.nombre_cliente}},
        {name: 'full_centroautorizado', type: 'string', calculate: (data)=>{return data.codigo_centroautorizado
             + " - " + data.nombre_centroautorizado}},
        {name: 'no_chasis', type: 'string'},
        {name: 'matricula', type: 'string'},
        {name: 'full_vehiculo', type: 'string', calculate: (data)=>{return data.no_chasis
            + " / " + data.matricula}},
        {name: 'no_serie_tacografo', type: 'string'},    
  
    ]
});