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


class API_Vehiculo extends ApiController
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
                $vehiculos = (array) $vehiculo->all();
            else {

                $vehiculos = DBQuery::table('vehiculos')->where(
                    [
                        Where::orLike('matricula', $criteria_str),
                        Where::orLike('num_chasis', $criteria_str)
                    ]
                )->get();

                // var_dump($ordenes);
            }
            foreach ($vehiculos as $vehiculo) {
                $item = (array) $vehiculo;

                $item['codigo_centroautorizado'] = $centroauth->get($item['id_centroautorizado'])->codigo_centroautorizado;
                $item['nombre_centroautorizado'] = $centroauth->get($item['id_centroautorizado'])->nombre_centroautorizado;

                if ($item['id_cliente']) {
                    $item['tiene_cliente'] = True;
                    $item['codcliente'] = $cliente->get($item['id_cliente'])->codcliente;
                    $item['nombre_cliente'] = $cliente->get($item['id_cliente'])->nombre;
                    $item['cifnif_cliente'] = $cliente->get($item['id_cliente'])->cifnif;
                    $item['description_cliente'] = $item['cifnif_cliente'] . "/" . $item['nombre_cliente'];

                } else {
                    $item['codcliente'] = Null;
                    $item['tiene_cliente'] = False;
                    $item['nombre_cliente'] = Null;
                    $item['cifnif_cliente'] = Null;
                    $item['description_cliente'] = '<b style="color:red">No Asignado</b>';
                }

                $item['nombre_marca'] = $marca->get($item['id_marca'])->nombre_marca;
                $item['nombre_modelo'] = $modelo->get($item['id_modelo'])->nombre_modelo;

                $item['nombre_categoria'] = $item['id_categoria'] == '1' ? 'Mercancia' : 'Viajeros';


                $tacografos = DbQuery::table('tacografos')->whereEq('id_vehiculo', $item['id'])->get();

                if (count($tacografos) > 0) {
                    $item['tiene_tacografo'] = count($tacografos) > 0;
                    $item['num_serie_tacografo'] = $tacografos[0]['numero_serie'];
                    $item['tiene_tacografo_str'] = 'Si';
                } else {
                    $item['tiene_tacografo_str'] = '<b style="color:red">No Asignado</b>';
                }
                $item['logged_user'] = $_COOKIE['fsNick'];



                array_push($result, $item);
            }


            $start = $_GET['start'];
            $limit = $_GET['limit'];

            $data = ["vehiculos" => array_slice($result, $start, $limit), "total" => count($result)];
            $this->response->setContent(json_encode($data));

           // $data = ["vehiculos" => $result];
           //$this->response->setContent(json_encode($data));
            
        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));
        }
    }
}
