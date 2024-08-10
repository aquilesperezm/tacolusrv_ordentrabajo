<?php
namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Core\Model\Cliente;

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

        if($this->request->isMethod('GET')){
            
            $result = [];
            $u = new OrdenDeTrabajo();
            $ordenes = (array) $u->all();

                foreach ($ordenes as $orden){
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
                    array_push($result,$orden);
                }

              $data = ["ordenes"=> $result];

            $this->response->setContent(json_encode($data));

        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));

        }
        
    }
}