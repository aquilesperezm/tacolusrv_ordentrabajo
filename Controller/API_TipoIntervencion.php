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


class API_TipoIntervencion extends ApiController
{
    protected function runResource(): void
    {
        if ($this->request->isMethod('GET')) {

            $result = [];
            $tipoIntervenciones = new TipoIntervencion();
            $items = (array) $tipoIntervenciones->all();

            foreach ($items as $item) {
                $item_ar = (array) $item; 

                array_push($result, $item_ar);
            }

            $data = ["tiposdeintervenciones" => $result];
            $this->response->setContent(json_encode($data));
        }
    }
}
