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

class API_OrdenDeTrabajo extends ApiController
{
    protected function runResource(): void
    {
        // tu código aquí
        //$this->response->setContent(json_encode(['hola' => 'mundo']));

        $centroauth = new CentroAutorizado();
        $cliente = new Cliente();
        $vehiculo = new Vehiculo();
        $tacografo = new Tacografo();
        $ordenTrabajo = new OrdenDeTrabajo();

        //get ordenes de trabajo
        if ($this->request->isMethod('GET')) {

            $result = [];
          
            $ordenes = (array) $ordenTrabajo->all();

            foreach ($ordenes as $orden) {
                $orden = (array) $orden;
             
                // se obtiene por el id_vehiculo (vehiculo) -> id_centro_autorizado (centroautorizado)
                $orden["codigo_centroautorizado"] = $centroauth->get(($vehiculo->get($orden['id_vehiculo']))->id_centroautorizado)->codigo_centroautorizado;
                $orden["nombre_centroautorizado"] = $centroauth->get(($vehiculo->get($orden['id_vehiculo']))->id_centroautorizado)->nombre_centroautorizado;

                // se obtiene por el id_vehiculo (vehiculo) -> id_cliente (cliente)
                $orden["nombre_cliente"] = $cliente->get(($vehiculo->get($orden['id_vehiculo']))->id_cliente)->nombre;
                $orden["cifnif_cliente"] = $cliente->get(($vehiculo->get($orden['id_vehiculo']))->id_cliente)->cifnif;


                $orden["no_chasis"] = ($vehiculo->get($orden['id_vehiculo']))->num_chasis;
                $orden["matricula"] = ($vehiculo->get($orden['id_vehiculo']))->matricula;
                $orden["no_serie_tacografo"] = ($tacografo->get($orden['id_tacografo']))->numero_serie;

                $orden['logged_user'] = $_COOKIE['fsNick'];
                array_push($result, $orden);
            }

            $page = $_GET['page'];
            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $data = ["ordenes" => array_slice($result,$start,$limit),"total" => count($result)];
            

            $this->response->setContent(json_encode($data));
        }
        //create orden de trabajo
        elseif ($this->request->isMethod('POST')) {

            $no_orden = $_POST['no_orden'];
            $fecha_orden = DateTime::createFromFormat('d-m-Y',$_POST['fecha_orden']);  

            $id_vehiculo = $_POST['id_vehiculo'];
        
              
            $tacografos = DbQuery::table('tacografos')->whereEq('id_vehiculo', $id_vehiculo)->get();
            $tipos_intervenciones = json_decode($_POST['tipos_intervenciones']);
         
            $ordenTrabajo = new OrdenDeTrabajo();
            $ordenTrabajo->numero_orden = $no_orden;
            $ordenTrabajo->fecha_orden = $fecha_orden->format('Y-m-d');
            $ordenTrabajo->id_vehiculo = $id_vehiculo;
            $ordenTrabajo->id_tacografo = $tacografos[0]['id'];
            
            $save_ordentrabajo = $ordenTrabajo->save();

            foreach($tipos_intervenciones as $ti){
                $ixt = new IntervencionXOrdenDeTrabajo();
                $ixt->id_ordendetrabajo = $ordenTrabajo->id;
                $ixt->id_tipodeintervencion = $ti;
                $ixt->save();
            }

            if($save_ordentrabajo)
            $this->response->setContent(json_encode(['success'=>true]));
            else $this->response->setContent(json_encode(['success'=>false]));
        }
        //update orden de trabajo   
        elseif ($this->request->isMethod('PATCH')) {
        }
        //borrar orden de trabajo
        elseif ($this->request->isMethod('DELETE')) {
        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));
        }
    }
}
