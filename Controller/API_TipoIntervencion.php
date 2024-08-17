<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Plugins\Nomencladores\Model\MarcaVehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\ModeloVehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\TipoIntervencion;

use FacturaScripts\Core\Model\Cliente;

use FacturaScripts\Core\DbQuery;
use FacturaScripts\Core\Where;


class API_TipoIntervencion extends ApiController
{
    protected function runResource(): void
    {

        $tiposintervenciones = new TipoIntervencion();

        $criteria_str = "";
        $criteria_exits = isset($_GET['criteria']);
        if ($criteria_exits)
            $criteria_str = $_GET['criteria'];

        if ($this->request->isMethod('GET')) {

            $result = [];

            if (!$criteria_exits && empty($criteria_str))
                $tiposintervenciones = (array) $tiposintervenciones->all();
            else {

                $tiposintervenciones = DBQuery::table('tiposintervenciones')->where(
                    [
                        Where::orLike('nombre', $criteria_str)
                    ]
                )->get();

                // var_dump($ordenes);
            }

            foreach ($tiposintervenciones as $item) {
                $item_ar = (array) $item; 

                array_push($result, $item_ar);
            }

            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $data = ["tiposdeintervenciones" => array_slice($result, $start, $limit), "total" => count($result)];
            $this->response->setContent(json_encode($data));

        }
    }
}
