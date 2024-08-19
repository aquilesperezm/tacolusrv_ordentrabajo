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
use FacturaScripts\Core\Where;


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

        $criteria_str = "";
        $criteria_exits = isset($_GET['criteria']);
        if ($criteria_exits)
            $criteria_str = $_GET['criteria'];


        if ($this->request->isMethod('GET')) {

            $result = [];
            //$u = new OrdenDeTrabajo();
            if (!$criteria_exits && empty($criteria_str))
                $clientes = (array) $cliente->all();
            else {

                $clientes = DBQuery::table('clientes')->where(
                    [
                        Where::orLike('cifnif', $criteria_str),
                        Where::orLike('nombre', $criteria_str),
                        Where::orLike('email', $criteria_str),
                        Where::orLike('codcliente', $criteria_str)
                    ]
                )->get();

                // var_dump($ordenes);
            }

            foreach ($clientes as $cliente) {
                $item = (array) $cliente;

                array_push($result, $item);
            }

            $all_rows = Null;

            if (isset($_GET['query']))
                $all_rows = $_GET['query'];

            if ($all_rows == Null) {

                $start = $_GET['start'];
                $limit = $_GET['limit'];

                $data = ["clientes" => array_slice($result, $start, $limit), "total" => count($result)];
                $this->response->setContent(json_encode($data));

            } else if ($all_rows == "all_data") {

                $clientes = $cliente->all();
                $this->response->setContent(json_encode($clientes));
            }




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
