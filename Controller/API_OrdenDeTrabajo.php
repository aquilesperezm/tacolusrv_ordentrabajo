<?php
namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Core\Model\Cliente;

class API_OrdenDeTrabajo extends ApiController
{
    protected function runResource(): void
    {
        // tu código aquí
        //$this->response->setContent(json_encode(['hola' => 'mundo']));
        
        $centroauth = new CentroAutorizado();
        $cliente = new Cliente();

        if($this->request->isMethod('GET')){
            
            $result = [];
            $u = new OrdenDeTrabajo();
            $ordenes = (array) $u->all();

                foreach ($ordenes as $orden){
                    $orden = (array) $orden;
                    $orden["codigo_centroautorizado"] = ($centroauth->get($orden['id_centroautorizado']))->codigo_centroautorizado;
                    $orden["nombre_centroautorizado"] = ($centroauth->get($orden['id_centroautorizado']))->nombre_centroautorizado;
                    $orden["nombre_cliente"] = ($cliente->get($orden['codcliente']))->nombre;
                    $orden["cifnif_cliente"] = ($cliente->get($orden['codcliente']))->cifnif;

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