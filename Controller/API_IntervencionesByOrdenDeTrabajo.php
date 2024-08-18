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

        $criteria_str = "";
        $criteria_exits = isset($_GET['criteria']);
        if ($criteria_exits)
            $criteria_str = $_GET['criteria'];

        if ($this->request->isMethod('GET')) {

            $id_orden = $_GET['id_orden'];

            $result = [];

            $orden = new OrdenDeTrabajo();
            $tipo_intervecion = new TipoIntervencion();

            $intervenciones_hechas = DbQuery::table('rel_tipodeintervencion_ordenesdetrabajo')->whereEq('id_ordendetrabajo', $id_orden)->get();

            foreach ($intervenciones_hechas as $intervencion) {
                $data = [];

                // var_dump($intervencion);

                $data['id_rel_int_ord'] = $intervencion['id'];

                //$data['test'] = $this->request->getPathInfo();

                $data['id'] = $intervencion['id_tipodeintervencion'];
                $data['nombre'] =  $tipo_intervecion->get($intervencion['id_tipodeintervencion'])->nombre;

                if ($criteria_str) {
                    if (str_contains(strtolower($data['nombre']), strtolower($criteria_str))) {
                        array_push($result, $data);
                    } else {
                        continue;
                    }
                } else
                    array_push($result, $data);
            }

            $page = $_GET['page'];
            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $data = ["tiposdeintervenciones" => array_slice($result, $start, $limit), "total" => count($result)];
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
