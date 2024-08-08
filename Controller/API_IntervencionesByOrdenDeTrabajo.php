<?php
namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Plugins\Nomencladores\Model\TipoIntervencion;

use FacturaScripts\Core\Model\Cliente;

use FacturaScripts\Core\DbQuery;


class API_IntervencionesByOrdenDeTrabajo extends ApiController
{
    protected function runResource(): void
    {
        // tu código aquí
        //$this->response->setContent(json_encode(['hola' => 'mundo']));
        
        $centroauth = new CentroAutorizado();
        $cliente = new Cliente();
        $vehiculo = new Vehiculo();
        $tacografo = new Tacografo();

        if($this->request->isMethod('GET')){
            
            $id_orden = $_GET['id_orden'];

            $result = [];

            $orden = new OrdenDeTrabajo();
            $tipo_intervecion = new TipoIntervencion();

            $intervenciones_hechas = DbQuery::table('rel_tipodeintervencion_ordenesdetrabajo')->whereEq('id_ordendetrabajo', $id_orden)->get();
            
            foreach($intervenciones_hechas as $intervencion){
                $data = [];
                
               // var_dump($intervencion);
               
                $data['id_rel_int_ord'] = $intervencion['id'];
                $data['id_tipointervencion'] = $intervencion['id_tipodeintervencion'];
                $data['nombre_tipointervencion'] =  $tipo_intervecion->get($intervencion['id_tipodeintervencion'])->nombre;
                array_push($result,$data);
            }
           
            $data = ["intervenciones"=> $result];
            $this->response->setContent(json_encode($data));

            /*$u = new OrdenDeTrabajo();
            $ordenes = (array) $u->all();

                foreach ($ordenes as $orden){
                    $orden = (array) $orden;
                    $orden["codigo_centroautorizado"] = ($centroauth->get($orden['id_centroautorizado']))->codigo_centroautorizado;
                    $orden["nombre_centroautorizado"] = ($centroauth->get($orden['id_centroautorizado']))->nombre_centroautorizado;
                    $orden["nombre_cliente"] = ($cliente->get($orden['codcliente']))->nombre;
                    $orden["cifnif_cliente"] = ($cliente->get($orden['codcliente']))->cifnif;
                    $orden["no_chasis"] = ($vehiculo->get($orden['id_vehiculo']))->num_chasis;
                    $orden["matricula"] = ($vehiculo->get($orden['id_vehiculo']))->matricula;  
                    $orden["no_serie_tacografo"] = ($tacografo->get($orden['id_tacografo']))->numero_serie;  
                    array_push($result,$orden);
                }

              $data = ["intervenciones"=> $result];*/

           // $this->response->setContent(json_encode($data));

        } else {
           // $this->response->setStatusCode(403);
          //  $this->response->setContent(json_encode(['error' => 'mundo']));

        }
        
    }
}