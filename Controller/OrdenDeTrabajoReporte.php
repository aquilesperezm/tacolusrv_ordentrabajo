<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Base\Controller;
use FacturaScripts\Plugins\OrdenDeTrabajo\Classes\OrdenDeTrabajoPDF;

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

        $font_size = 8;
        //------------------------------------------------- GENERATING REPORTE ----------------------------------------------
        $pdf = new OrdenDeTrabajoPDF();

        $pdf->setTitulo_I();
        $pdf->setDetallesOrden_II($datos);
        $pdf->setTickets_III();
        $pdf->setMarkWithX_IV($tipos_intervenciones);

        //--------------------------------------------------------------------------

        //new line
        // $pdf->Cell(0, 4, '', 0, 1);

        $pdf->showTable_DatosVehiculo();

        $pdf->Cell(0, 10, '', 0, 1);

        $pdf->showTable_PresionNeumaticos();

        $pdf->Cell(0, 11, '', 0, 1);

        $pdf->showTable_InstalacionTacografo();

        $pdf->Ln();

        $pdf->showTable_DisponePrecintos();

        $pdf->Cell(0, 4, '', 0, 1);

        $pdf->showTable_IdentificacionVU();
        
        // $pdf->Text(112,$pdf->getY()+3,utf8_decode('(7.) Velocidad Limitador:'));

      //  $pdf->Cell(0, 2, '', 0, 1);
        
        $pdf->showTable_ComprobacionVU();

       // $pdf->Cell(0, 1, utf8_decode(''), 0, 1);

        $pdf->showTable_SensorMovimiento();

      //  $pdf->Cell(0, 1, utf8_decode(''), 0, 1);

        $pdf->showList_with_Checkbox();

        $pdf->ShowCheckboxCounter('DISPOSITIVO RECEPTOR GNSS');
        $pdf->ShowCheckboxCounter('DISPOSITIVO DE TELECOMUNICACIONES DSRC');

        //$data = [];
        //$data['row'] = ['test 1 ', 'test 2'];
        //$data['row'] = ['test 3 ', 'test 4'];

        $pdf->ShowTable_ByCells(
            $title = 'Mediciones',
            [
                '(24.) Circunferencia neumáticos (Factor L en mm) ',
                '(25.) Coeficiente característico (Factor W en imp/km)'
            ]
        );

        //-------------------------------------------------------------------
        $pdf->Cell(0, 1, '', 0, 1);
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(0, 3.5, utf8_decode('Ajuste Fecha/Hora (Formato: ±dd-hh-mm)'), 1, 1);
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(0, 3.5, '', 1, 1);
        $pdf->Cell(0, 1, '', 0, 1);
        //--------------------------------------------------------------

        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(0, 3.5, utf8_decode('Determinación de Errores (con 1 decimal)'), 1, 1);
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell($pdf->GetPageWidth() / 4, 3.5, '', 1, 0);
        $pdf->Cell($pdf->GetPageWidth() / 4, 3.5, utf8_decode('(28.) Tacógrafo'), 1, 0);
        $pdf->Cell($pdf->GetPageWidth() / 4, 3.5, utf8_decode('(29.) Banco'), 1, 0);
        $pdf->Cell(0, 3.5, utf8_decode('(30. ) Error en %'), 1, 1);

        $pdf->Cell($pdf->GetPageWidth() / 4, 3.5, 'Distancia Recorrida', 1, 0);
        $pdf->Cell($pdf->GetPageWidth() / 4, 3.5, '', 1, 0);
        $pdf->Cell($pdf->GetPageWidth() / 4, 3.5, '', 1, 0);
        $pdf->Cell(0, 3.5, '', 1, 1);

        $pdf->Cell(0, 1, '', 0, 1);
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(0, 3.5, utf8_decode('Reconocimiento final del sensor'), 1, 1);
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(0, 3.5, utf8_decode('(31.) No. de serie del sensor correcto'), 1, 1);
        $pdf->show_SINO_Fullline(39,3.5);
        // $pdf->Cell(0,2,'',0,1);
        //-----------------------------------------------------------------------------------

        $pdf->ShowTable_ByCells(
            $title = 'Calibración',
            [
                '(32.) Factor W (imp/km)',
                '(35.) Tamaño neumáticos'
            ]
        );
        $pdf->ShowTable_ByCells(
            '',
            [
                '(33.) Factor K (imp/km)',
                '(36.) Velocidad limitador (km/h)'
            ]
        );
        $pdf->ShowTable_ByCells(
            '',
            [
                '(34.) Factor L (mm)',
                '(37.) Lectura cuentakilómetros'
            ]
        );
        //-----------------------------------------------------------------
        $pdf->ShowTable_ByCells(
            $title = 'Equipos utilizados',
            [
                '(45.) Banco de rodillos',
                '(47.) Cronómetro'
            ]
        );
        $pdf->ShowTable_ByCells(
            '',
            [
                '(46.) Manómetro',
                '(48.) Equipo de calibrado'
            ]
        );
        //---------------------------------------------------------------------------------------------------------

        $pdf->show_Tickets_By_Data();

        $pdf->ShowTable_PrecintadoTacografo();

        $pdf->resultado_global();

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
