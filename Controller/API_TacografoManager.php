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



        $flag_tacografos_disponibles = null;
        if (isset($_GET['tacografos_disponibles']))
            $flag_tacografos_disponibles = $_GET['tacografos_disponibles'];

        $criteria_str = "";
        $criteria_exits = isset($_GET['criteria']);
        if ($criteria_exits)
            $criteria_str = $_GET['criteria'];


        if ($this->request->isMethod('GET') && !isset($_GET['action'])) {

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

            if ($flag_tacografos_disponibles && empty($criteria_str))
                $tacografos = DbQuery::table('tacografos')->whereEq('id_vehiculo', Null)->get();
            else {
                //$tacografos = DbQuery::table('tacografos')->whereEq('id_vehiculo', Null)->get();
                $tacografos = DBQuery::table('tacografos')->where(
                    [
                        Where::orLike('numero_serie', $criteria_str),
                        Where::eq('id_vehiculo', Null)
                    ]
                )->get();
            }

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

            //vincular un tacografo con un vehiculo
        } elseif ($this->request->isMethod('POST')) {

            if (isset($_POST['action'])) $action = $_POST['action'];

            // Vinculate or Update Tacografo relationship with vehicle
            if ($action == 'vinculate') {

                $id_tacografo = $_POST['id_tacografo'];
                $id_vehiculo = $_POST['id_vehiculo'];


                //verificamos que el tacografo que entra no tiene ninguna relacion con algun vehiculo
                $tacografos_activos = DbQuery::table('tacografos')->whereEq('id_vehiculo', $id_vehiculo)->get();
                //var_dump($tacografos);
                foreach ($tacografos_activos as $taco) {
                    
                    $tacografo = new Tacografo();
                    $tacografo = $tacografo->get($taco['id']);
                    $tacografo->id_vehiculo = Null;
                    $tacografo->save();
                }
                
                $tacografo = new Tacografo();
                $tacografo = $tacografo->get($id_tacografo);

                $tacografo->id_vehiculo = $id_vehiculo;
                $tacografo->save();

                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode(['success' => True, 'action' => 'vinculate']));
            } else if ($action == 'create' || $action == 'update') {

                $tacografo = new Tacografo();
                if ($action == 'create') $tacografo = new Tacografo();
                else
                if ($action == 'update') $tacografo = $tacografo->get($_POST['id_tacografo']);

                $numero_serie = $_POST['numero_serie'];
                $id_modelo = $_POST['id_modelo'];
                $id_categoria = $_POST['id_categoria'];

                $id_vehiculo_matricula = (strlen($_POST['id_vehiculo']) == 0) ? Null : $_POST['id_vehiculo'];

                $escala_velocidad = $_POST['escala_velocidad'];

                $fecha_fabricacion = (strlen($_POST['fecha_fabricacion']) == 0) ? Null : $_POST['fecha_fabricacion'];
                $fecha_instalacion = (strlen($_POST['fecha_instalacion']) == 0) ? Null : $_POST['fecha_instalacion'];
                $fecha_ultima_revision = (strlen($_POST['fecha_ultima_revision']) == 0) ? Null : $_POST['fecha_ultima_revision'];
                $fecha_fin_garantia = (strlen($_POST['fecha_fin_garantia']) == 0) ? Null : $_POST['fecha_fin_garantia'];

                $homologacion = $_POST['homologacion'];
                $comentarios = $_POST['comentarios'];

                $tacografo->numero_serie = $numero_serie;
                $tacografo->id_categoria = $id_categoria;
                $tacografo->id_modelo = $id_modelo;
                $tacografo->id_vehiculo = $id_vehiculo_matricula;
                $tacografo->escala_velocidad = $escala_velocidad;

                $tacografo->fecha_fabricacion = $fecha_fabricacion;
                $tacografo->fecha_instalacion = $fecha_instalacion;
                $tacografo->fecha_fin_garantia = $fecha_fin_garantia;
                $tacografo->fecha_ultima_revision = $fecha_ultima_revision;

                $tacografo->homologacion = $homologacion;
                $tacografo->comentarios = $comentarios;

                $success = $tacografo->save();
                if ($success) {
                    $this->response->setStatusCode(200);
                    if ($action == 'create')
                        $this->response->setContent(json_encode(['success' => True, 'action' => 'create']));
                    else if ($action == 'update') $this->response->setContent(json_encode(['success' => True, 'action' => 'update']));
                } else {
                    $this->response->setStatusCode(400);
                    $this->response->setContent(json_encode(['success' => False]));
                }
            } else if ($action == 'delete') {

                $tacografo = new Tacografo();
                $ids = json_decode($_POST['ids']);
                foreach ($ids as $id) {
                    $tacografo = $tacografo->get($id);
                    $tacografo->delete();
                }

                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode(['success' => True, 'action' => 'delete']));
            }
        } else if (isset($_GET['action'])) {
            if ($_GET['action'] == 'get-all-modelos') {

                $modelo_tacografo = new ModeloTacografo();

                $data = ["tacografos" => $modelo_tacografo->all()];

                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($data));
            } else  if ($_GET['action'] == 'get-all-categorias') {
                $cat_tacografo = new CategoriaTacografo();

                $data = ["tacografos" => $cat_tacografo->all()];

                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($data));
            }
        } else {
            $this->response->setStatusCode(403);
            $this->response->setContent(json_encode(['error' => 'mundo']));
        }
    }
}
