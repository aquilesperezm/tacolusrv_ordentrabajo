<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Plugins\OrdenDeTrabajo\Library\PDF\FPDF;

class OrdenDeTrabajoPDF extends FPDF {

    function Header()
    {
        // Select Arial bold 15
        $this->SetFont('Arial', 'B', 8);
        // Move to the right
       // $this->Cell(80);
        // Framed title
        $this->Cell(0,10,utf8_decode('Pagina: ').$this->PageNo().'/{nb}',0,0,'R');
        // Line break
        $this->Ln(20);
    }

}
