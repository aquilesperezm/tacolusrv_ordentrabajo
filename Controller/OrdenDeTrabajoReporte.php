<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Base\Controller;
use FacturaScripts\Plugins\OrdenDeTrabajo\Controller\OrdenDeTrabajoPDF;

use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\IntervencionXOrdenDeTrabajo;
use FacturaScripts\Plugins\Nomencladores\Model\Vehiculo;
use FacturaScripts\Plugins\Nomencladores\Model\CentroAutorizado;
use FacturaScripts\Plugins\Nomencladores\Model\Tacografo;
use FacturaScripts\Plugins\Nomencladores\Model\TipoIntervencion;
use FacturaScripts\Core\Model\Cliente;
use FacturaScripts\Core\DbQuery;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class OrdenDeTrabajoReporte extends Controller
{
    public function getPageData(): array
    {
        /* $pageData = parent::getPageData();
        $pageData["menu"] = "admin";
        $pageData["title"] = "OrdenDeTrabajoReporte";
        $pageData["icon"] = "fas fa-file";
        return $pageData;*/
        return [];
    }

    /**
     * Ejecuta la lógica privada del controlador.
     */
    public function privateCore(&$response, $user, $permissions): void
    {
        parent::privateCore($response, $user, $permissions);

        $datos = [];


        $id_orden = $_POST['id_orden'];
        $orden_trabajo = new OrdenDeTrabajo();
        $orden_trabajo = $orden_trabajo->get($id_orden);

        $datos['numero_orden'] = $orden_trabajo->numero_orden;
        $datos['fecha_orden'] = $orden_trabajo->fecha_orden;

        $vehiculo = new Vehiculo();
        $vehiculo = $vehiculo->get($orden_trabajo->id_vehiculo);

        $tacografo = new Tacografo();
        $tacografo = $tacografo->get($orden_trabajo->id_tacografo);

        $cliente = new Cliente();
        $cliente = $cliente->get($vehiculo->id_cliente);

        //$datos['matricula_vehiculo'] = $vehiculo->matricula;
        //$datos['numero_chasis_vehiculo'] = $vehiculo->num_chasis;

        $datos['vehiculo'] = $vehiculo->num_chasis . " / " . $vehiculo->matricula;
        $datos['cliente'] = $cliente->cifnif . " / " . $cliente->nombre;

        $centro_autorizado = new CentroAutorizado();
        $centro_autorizado = $centro_autorizado->get($vehiculo->id_centroautorizado);

        $datos['centro_autorizado'] = $centro_autorizado->codigo_centroautorizado . " - " . $centro_autorizado->nombre_centroautorizado;

        $datos['noserie_tacografo'] = $tacografo->numero_serie;

        // $descripciones_familias = DbQuery::table('rel_tipodeintervencion_ordenesdetrabajo')->select('id_ordendetrabajo')->get();
        $tipos_intervenciones = DbQuery::table('rel_tipodeintervencion_ordenesdetrabajo')->whereEq('id_ordendetrabajo', $id_orden)->get();

        $tipointervencion = new TipoIntervencion();

        $result = [];
        foreach ($tipos_intervenciones as $ti) {
            array_push($result, $tipointervencion->get($ti['id_tipodeintervencion'])->nombre);
        }

        $datos['tipos_intervenciones'] = $result;

        //var_dump($datos);

        $pdf = new OrdenDeTrabajoPDF();
        $pdf->AliasNbPages();
        $pdf->AddPage('P', 'Letter');
        $pdf->Image("Plugins/OrdenDeTrabajo/Assets/Images/Logo.png", 10, 10, 40, 40, 'PNG');

        $pdf->SetXY(20, 20);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell($pdf->GetPageWidth() - 30, 10, 'ORDEN DE TRABAJO', 0, 0, 'R');

        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();

        $pdf->SetLineWidth(0.6);
        $pdf->SetDrawColor(234, 234, 234);
        $pdf->Cell(0, 30, '', 1, 1);
        /*$pdf->SetFillColor(234, 234, 234);
        $pdf->Cell(0, count($tipos_intervenciones) * 7, '', 1, 0, '', true);*/

        $pdf->SetXY(10, 60);

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50, 5, 'Centro Autorizado: ', 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50, 5, $datos['centro_autorizado'], 0, 1, '', false, '');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50, 5, utf8_decode('N°. de Orden de Trabajo: '), 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50, 5, $datos['numero_orden'], 0, 1, '', false, '');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50, 5, 'Fecha: ', 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50, 5, $datos['fecha_orden'], 0, 1, '', false, '');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50, 5, 'Cliente: ', 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50, 5, $datos['cliente'], 0, 1, '', false, '');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50, 5, utf8_decode('Vehículo:'), 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50, 5, $datos['vehiculo'], 0, 1, '', false, '');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50, 5, utf8_decode('N°. de Serie del Tacógrafo: '), 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50, 5, $datos['noserie_tacografo'], 0, 1, '', false, '');

        $pdf->SetFillColor(234, 234, 234);
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(0, 5, utf8_decode('Intervenciones Solicitadas: '), 1, 1, '', true, '');


        //hacemos un for con los tipos de intervenciones
        foreach ($datos['tipos_intervenciones'] as $item) {
            $pdf->SetFillColor(234, 234, 234);
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(0, 5, utf8_decode($item), 1, 1, '', true, '');
        }

        //y las operaciones necesarias para asegurar el correcto funcionamiento del tacógrafo
        $pdf->SetFillColor(234, 234, 234);
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(0, 5, utf8_decode('y las operaciones necesarias para asegurar el correcto funcionamiento del tacógrafo'), 1, 1, '', true, '');

        $pdf->Ln();

        //tickets section
        $pdf->SetLineWidth(0.3);
        $pdf->SetDrawColor(255, 0, 0);
        $pdf->Cell(0, 25, utf8_decode(''), 1, 0, '', false, '');

        $pdf->SetXY($pdf->GetX() - 190, $pdf->getY() + 5);
        $pdf->SetDrawColor(0, 0, 0);
        $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');
        // $pdf->SetXY(30,115);
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 3, utf8_decode(' TICKET 1:'), 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(30, 3, utf8_decode(' DATOS TÉCNICOS'), 0, 1, '', false, '');

        $pdf->SetXY($pdf->GetX() - 210, $pdf->getY() + 2);
        $pdf->SetDrawColor(0, 0, 0);
        $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');
        // $pdf->SetXY(30,115);
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 3, utf8_decode(' TICKET 2:'), 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(30, 3, utf8_decode(' EVENTOS Y FALLOS'), 0, 1, '', false, '');

        $pdf->SetXY($pdf->GetX() - 210, $pdf->getY() + 2);
        $pdf->SetDrawColor(0, 0, 0);
        $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 3, utf8_decode(' TICKET 3:'), 0, 0, '', false, '');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(30, 3, utf8_decode(' SOBREVELOCIDADES'), 0, 0, '', false, '');

        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        //$pdf->Ln();

        // Seccion Marca con una X las intervenciones -------------------------------------------------------

        $pdf->Cell(0, 44, '', 1);

        $pdf->SetXY($pdf->GetX() - 195, $pdf->getY() + 1);
        $pdf->Cell(35, 5, '(1.) Marca con una', 0);
        $pdf->SetXY($pdf->GetX() - 217, $pdf->getY() + 1);
        $pdf->Cell(4, 4, 'X', 1);
        $pdf->SetXY($pdf->GetX() - 215, $pdf->getY() - 1);
        $pdf->Cell(0, 5, 'las intervenciones realizadas:', 0);
        $pdf->Ln();

        $pdf->SetFont('Arial', '', 8);
        $pdf->SetDrawColor(0, 0, 0);

        $tipointervencion = new TipoIntervencion();
        $items = $tipointervencion->all();



        function existInArray(array $array, int  $n): bool
        {
            $r = False;
            foreach ($array as $a)
                if ($a['id_tipodeintervencion'] == $n) {
                    $r = true;
                    break;
                }

            return $r;
        }


        if (count($items) % 2 == 0) {
            for ($i = 0; $i < count($items); $i++) {
                if ($i % 2 == 0) {
                    //column 1
                    $pdf->SetXY($pdf->GetX() - 215, $pdf->getY() + 2);

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $pdf->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $pdf->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 0, '', false, '');
                } else {
                    //column 2
                    $pdf->SetXY($pdf->GetX() - 150, $pdf->getY());

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $pdf->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $pdf->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 1, '', false, '');
                }
            }
        } else {

            for ($i = 1; $i < count($items); $i++) {
                if ($i % 2 == 1) {
                    //column 1
                    $pdf->SetXY($pdf->GetX() - 215, $pdf->getY() + 2);

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $pdf->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $pdf->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 0, '', false, '');
                } else {
                    //column 2
                    $pdf->SetXY($pdf->GetX() - 150, $pdf->getY());

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $pdf->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $pdf->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 1, '', false, '');
                }
            }
            //column 1
            $pdf->SetXY($pdf->GetX() - 215, $pdf->getY() + 2);

            if (existInArray($tipos_intervenciones, $items[0]->id))
                $pdf->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
            else $pdf->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

            $pdf->Cell(30, 3, utf8_decode($items[0]->nombre), 0, 0, '', false, '');
        }

        //--------------------------------------------------------------------------

        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();

        $pdf->showTable_DatosVehiculo();

        $pdf->Ln();
       
        $pdf->showTable_PresionNeumaticos();

        $pdf->Ln();

        $pdf->showTable_InstalacionTacografo();

        $pdf->Ln();
       
        $pdf->showTable_DisponePrecintos();

        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();

        $pdf->showTable_IdentificacionVU();

       // $pdf->Text(112,$pdf->getY()+3,utf8_decode('(7.) Velocidad Limitador:'));


        $pdf->Output('', '', true);

        // tu código aquí
    }

    /**
     * Ejecuta la lógica pública del controlador.
     */
    public function publicCore(&$response): void
    {
        parent::publicCore($response);

        // tu código aquí
    }
}
