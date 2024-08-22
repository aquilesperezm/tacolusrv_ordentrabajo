<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use DateTime;
use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Core\Model\Cliente;

use FacturaScripts\Plugins\OrdenDeTrabajo\Model\IntervencionXOrdenDeTrabajo;

use FacturaScripts\Core\DbQuery;
use FacturaScripts\Core\Where;

class API_OrdenDeTrabajo extends ApiController
{
    protected function runResource(): void
    {
        // tu código aquí
        //$this->response->setContent(json_encode(['hola' => 'mundo']));

        $action = Null;
        if (isset($_POST['action']))
            $action = $_POST['action'];

        $centroauth = new CentroAutorizado();
        $cliente = new Cliente();
        $vehiculo = new Vehiculo();
        $tacografo = new Tacografo();
        $ordenTrabajo = new OrdenDeTrabajo();

        $criteria_str = "";
        $criteria_exits = isset($_GET['criteria']);
        if ($criteria_exits)
            $criteria_str = $_GET['criteria'];

        //get ordenes de trabajo
        if ($this->request->isMethod('GET')) {

            $result = [];

            if (!$criteria_exits && empty($criteria_str))
                $ordenes = (array) $ordenTrabajo->all();
            else {

                $ordenes = DBQuery::table('ordenesdetrabajo')->where(
                    [
                        Where::orLike('numero_orden', $criteria_str)
                        // Where::orLike('numero_orden', $criteria_str)
                    ]
                )->get();

                // var_dump($ordenes);
            }

            foreach ($ordenes as $orden) {
                $orden = (array) $orden;

                //  $fecha_orden = DateTime::createFromFormat('Y-m-d', $orden['fecha_orden']);
                //  $orden['fecha_orden'] = $fecha_orden->format('d-m-Y');

                // se obtiene por el id_vehiculo (vehiculo) -> id_centro_autorizado (centroautorizado)
                $orden["codigo_centroautorizado"] = $centroauth->get(($vehiculo->get($orden['id_vehiculo']))->id_centroautorizado)->codigo_centroautorizado;
                $orden["nombre_centroautorizado"] = $centroauth->get(($vehiculo->get($orden['id_vehiculo']))->id_centroautorizado)->nombre_centroautorizado;

                // se obtiene por el id_vehiculo (vehiculo) -> id_cliente (cliente)

                //var_dump($vehiculo->get($orden['id_vehiculo']));

                // Clientes 
                if ($vehiculo->get($orden['id_vehiculo'])->id_cliente) {
                    $orden["nombre_cliente"] = $cliente->get(($vehiculo->get($orden['id_vehiculo']))->id_cliente)->nombre;
                    $orden["cifnif_cliente"] = $cliente->get(($vehiculo->get($orden['id_vehiculo']))->id_cliente)->cifnif;
                } else {
                    $orden["nombre_cliente"] = "No Asignado";
                    $orden["cifnif_cliente"] = "No Asignado";
                }

                $orden["no_chasis"] = ($vehiculo->get($orden['id_vehiculo']))->num_chasis;
                $orden["matricula"] = ($vehiculo->get($orden['id_vehiculo']))->matricula;


                //tacografos
                $orden["no_serie_tacografo"] = ($tacografo->get($orden['id_tacografo']))->numero_serie;


                $orden['logged_user'] = $_COOKIE['fsNick'];
                array_push($result, $orden);
            }

            $page = $_GET['page'];
            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $data = ["ordenes" => array_slice($result, $start, $limit), "total" => count($result)];
            $this->response->setContent(json_encode($data));
        } /*elseif (isset($_GET["criteria"])) {

            $page = $_GET['page'];
            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $criteria = $_GET['criteria'];

           

            // var_dump($results);

            $data = ["ordenes" => array_slice($results, $start, $limit), "total" => count($results)];
            $this->response->setContent(json_encode($data));
        }*/
        //create orden de trabajo
        elseif ($this->request->isMethod('POST')) {

            //create
            if ($action == 'create') {
                $no_orden = $_POST['no_orden'];
                $fecha_orden = DateTime::createFromFormat('d-m-Y', $_POST['fecha_orden']);

                $id_vehiculo = $_POST['id_vehiculo'];


                $tacografos = DbQuery::table('tacografos')->whereEq('id_vehiculo', $id_vehiculo)->get();
                $tipos_intervenciones_ids = json_decode($_POST['tipos_intervenciones']);

                $ordenTrabajo = new OrdenDeTrabajo();
                $ordenTrabajo->numero_orden = $no_orden;
                $ordenTrabajo->fecha_orden = $fecha_orden->format('Y-m-d');
                $ordenTrabajo->id_vehiculo = $id_vehiculo;
                $ordenTrabajo->id_tacografo = $tacografos[0]['id'];

                $save_ordentrabajo = $ordenTrabajo->save();

                foreach ($tipos_intervenciones_ids as $ti) {
                    $ixt = new IntervencionXOrdenDeTrabajo();
                    $ixt->id_ordendetrabajo = $ordenTrabajo->id;
                    $ixt->id_tipodeintervencion = $ti;
                    $ixt->save();
                }

                if ($save_ordentrabajo) {
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode(['success' => true, 'action' => 'create']));
                } else $this->response->setContent(json_encode(['success' => false]));

                //update 
            } else if ($action == 'update') {

                $tipos_intervenciones_ids = json_decode($_POST['tipos_intervenciones']);
                $id_orden = $_POST['id_orden'];

                //delete all prev tipos de intervenciones related with this id
                $tipos_intervenciones_old = DBQuery::table('rel_tipodeintervencion_ordenesdetrabajo')->where(
                    [
                        Where::orLike('id_ordendetrabajo', $id_orden)
                        // Where::orLike('numero_orden', $criteria_str)
                    ]
                )->get();

                foreach ($tipos_intervenciones_old as $old) {
                    $ixt = new IntervencionXOrdenDeTrabajo();
                    $ixt = $ixt->get($old['id']);
                    $ixt->delete();
                }

                //create relations        
                foreach ($tipos_intervenciones_ids as $ti) {
                    $ixt = new IntervencionXOrdenDeTrabajo();
                    $ixt->id_ordendetrabajo = $id_orden;
                    $ixt->id_tipodeintervencion = $ti;
                    $ixt->save();
                }

                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode(['success' => true, 'action' => 'update']));
            }
            //delete
            else if ($action == 'delete') {

                $ids_ordenes = json_decode($_POST['ids']);

                foreach ($ids_ordenes as $id_orden) {

                    $tipos_intervenciones_old = DBQuery::table('rel_tipodeintervencion_ordenesdetrabajo')->where(
                        [
                            Where::orLike('id_ordendetrabajo', $id_orden)
                            // Where::orLike('numero_orden', $criteria_str)
                        ]
                    )->get();

                    foreach ($tipos_intervenciones_old as $old) {
                        $ixt = new IntervencionXOrdenDeTrabajo();
                        $ixt = $ixt->get($old['id']);
                        $ixt->delete();
                    }

                    $ordenTrabajo = new OrdenDeTrabajo();
                    $ordenTrabajo = $ordenTrabajo->get($id_orden);
                    $ordenTrabajo->delete();
                    
                }

                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode(['success' => true, 'action' => 'delete']));

            }
        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));
        }
    }
}
