<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Plugins\Nomencladores\Model\MarcaVehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\ModeloVehiculo;

use FacturaScripts\Core\Model\Cliente;
use FacturaScripts\Core\DbQuery;


class API_ClienteManager extends ApiController
{
    protected function runResource(): void
    {
        // tu código aquí
        //$this->response->setContent(json_encode(['hola' => 'mundo']));

        $centroauth = new CentroAutorizado();
        $cliente = new Cliente();
        $vehiculo = new Vehiculo();
        $tacografo = new Tacografo();
        $marca = new MarcaVehiculo();
        $modelo = new ModeloVehiculo();

        if ($this->request->isMethod('GET')) {

            $result = [];
            //$u = new OrdenDeTrabajo();
            $clientes = (array) $cliente->all();

            foreach ($clientes as $cliente) {
                $item = (array) $cliente;

                array_push($result, $item);
            }

            $data = ["clientes" => $result];

            $this->response->setContent(json_encode($data));

            //vincular un vehiculo
        } elseif ($this->request->isMethod('POST')) {


            $id_cliente = $_POST['id_cliente'];
            $id_vehiculo = $_POST['id_vehiculo'];

            $vehiculo = new Vehiculo();
            $vehiculo = $vehiculo->get($id_vehiculo);

            $vehiculo->id_cliente = $id_cliente;
            $vehiculo->save();

            $this->response->setStatusCode(200);
            $this->response->setContent(json_encode(['success' => True]));
        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));
        }
    }
}
