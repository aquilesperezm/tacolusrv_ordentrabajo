<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Plugins\Nomencladores\Model\MarcaVehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\ModeloVehiculo;

use FacturaScripts\Plugins\Nomencladores\Model\ModeloTacografo;
use FacturaScripts\Plugins\Nomencladores\Model\CategoriaTacografo;

use FacturaScripts\Core\Model\Cliente;

use FacturaScripts\Core\DbQuery;
use FacturaScripts\Core\Where;


class API_TacografoManager extends ApiController
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

        $modelo = new ModeloTacografo();
        $categoria = new CategoriaTacografo();


        $criteria_str = "";
        $criteria_exits = isset($_GET['criteria']);
        if ($criteria_exits)
            $criteria_str = $_GET['criteria'];


        if ($this->request->isMethod('GET')) {

            $result = [];
            //$u = new OrdenDeTrabajo();
            if (!$criteria_exits && empty($criteria_str))
                $tacografos = (array) $tacografo->all();
            else {

                $tacografos = DBQuery::table('tacografos')->where(
                    [
                        Where::orLike('numero_serie', $criteria_str)
                        //Where::orLike('num_chasis', $criteria_str)
                    ]
                )->get();

                // var_dump($ordenes);
            }

            //$tacografos = DbQuery::table('tacografos')->whereEq('id_vehiculo', Null)->get();

            foreach ($tacografos as $tacografo) {
                $item = (array) $tacografo;

                $item['modelo'] = $modelo->get($item['id_modelo'])->modelo_tacografo;
                $item['categoria'] = $categoria->get($item['id_categoria'])->nombre_categoriatacografo;
                
                array_push($result, $item);
            }

            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $data = ["tacografos" => array_slice($result, $start, $limit), "total" => count($result)];
            $this->response->setContent(json_encode($data));

            //$data = ["tacografos" => $result];
            //$this->response->setContent(json_encode($data));

        } elseif ($this->request->isMethod('POST')) {


            $id_tacografo = $_POST['id_tacografo'];
            $id_vehiculo = $_POST['id_vehiculo'];

            $tacografo = new Tacografo();
            $tacografo = $tacografo->get($id_tacografo);

            $tacografo->id_vehiculo = $id_vehiculo;
            $tacografo->save();

            $this->response->setStatusCode(200);
            $this->response->setContent(json_encode(['success' => True]));
        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));
        }
    }
}
