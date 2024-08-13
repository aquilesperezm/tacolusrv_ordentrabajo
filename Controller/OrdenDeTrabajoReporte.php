<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Base\Controller;
use FacturaScripts\Plugins\OrdenDeTrabajo\Controller\OrdenDeTrabajoPDF;

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

        $pdf = new OrdenDeTrabajoPDF();
        $pdf->AliasNbPages();
        $pdf->AddPage('P', 'Letter');
        $pdf->Image("Plugins/OrdenDeTrabajo/Assets/Images/Logo.png", 10, 10, 20,20, 'PNG');

        $pdf->SetXY(20,20);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell($pdf->GetPageWidth()-30, 10, 'ORDEN DE TRABAJO',0,0,'R');

        $pdf->Ln();
        $pdf->Ln();
        $pdf->SetDrawColor(234,234,234);
        $pdf->Cell(0, 30, '',1,1);
        $pdf->SetFillColor(234,234,234);
        $pdf->Cell(0, 30, '',1,0,'',true);

        $pdf->SetXY(10,40);

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50,5,'Centro Autorizado: ',1,0,'',false,'');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50,5,'Field - Centro Autorizado ',1,1,'',false,'');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50,5,utf8_decode('N°. de Orden de Trabajo: '),1,0,'',false,'');    
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50,5,'Field - N°. de Orden: ',1,1,'',false,'');
        
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50,5,'Fecha: ',1,0,'',false,'');    
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50,5,'Field - Fecha: ',1,1,'',false,'');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50,5,'Cliente: ',1,0,'',false,'');    
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50,5,'Field - Cliente: ',1,1,'',false,'');
        
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50,5,utf8_decode('Vehículo:'),1,0,'',false,'');    
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50,5,'Field - Vehiculo: ',1,1,'',false,'');

        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(50,5,utf8_decode('N°. de Serie del Tacógrafo: '),1,0,'',false,'');    
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(50,5,'Field - N°. de Serie del Tacografo: ',1,1,'',false,'');



        $pdf->Output('','',true);

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
