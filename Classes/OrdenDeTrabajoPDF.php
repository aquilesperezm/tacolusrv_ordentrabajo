<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Classes;

use FacturaScripts\Plugins\OrdenDeTrabajo\Library\PDF\FPDF;

use FacturaScripts\Plugins\Nomencladores\Model\TipoIntervencion;

class OrdenDeTrabajoPDF extends FPDF
{

    const FONT_SIZE = 8;

    function Header()
    {

        $this->SetFont('Arial', 'B', 7);
        $this->Cell(0, 10, utf8_decode('Página: ') . $this->PageNo() . '/{nb}', 0, 0, 'R');
    }

    function setTitulo_I($title = "ORDEN DE TRABAJO", $marginY = 2)
    {

        $this->AliasNbPages();
        $this->AddPage('P', 'A4');
        $this->Image("Plugins/OrdenDeTrabajo/Assets/Images/Logo.png", 10, 5, 30, 30, 'PNG');
        $this->Ln();
        $this->SetFont('Helvetica', 'B', 10);
        $this->Cell(0, 10, utf8_decode($title), 0, 1, 'R');
        $this->Cell(0, 5, utf8_decode(''), 0, 1);

        $this->Cell(0, $marginY, '', 0, 1);
    }

    function setDetallesOrden_II($datos)
    {
        $this->SetDrawColor(234, 234, 234);
        $this->SetFont('Helvetica', '', 8);
        $this->Cell(35, 4, utf8_decode('Centro Autorizado: '), 'LT', 0);
        $this->SetFont('Helvetica', 'B', 8);
        $this->Cell(0, 4, utf8_decode($datos['centro_autorizado']), 'TR', 1);

        $this->SetFont('Helvetica', '', 8);
        $this->Cell(35, 4, utf8_decode('N°. de Orden de Trabajo: '), 'L', 0);
        $this->SetFont('Helvetica', 'B', 8);
        $this->Cell(0, 4, utf8_decode($datos['numero_orden']), 'R', 1);

        $this->SetFont('Helvetica', '', 8);
        $this->Cell(35, 4, utf8_decode('Fecha'), 'L', 0);
        $this->SetFont('Helvetica', 'B', 8);
        $this->Cell(0, 4, utf8_decode($datos['fecha_orden']), 'R', 1);

        $this->SetFont('Helvetica', '', 8);
        $this->Cell(35, 4, utf8_decode('Cliente'), 'L', 0);
        $this->SetFont('Helvetica', 'B', 8);
        $this->Cell(0, 4, utf8_decode($datos['cliente']), 'R', 1);

        $this->SetFont('Helvetica', '', 8);
        $this->Cell(35, 4, utf8_decode('Vehículo'), 'L', 0);
        $this->SetFont('Helvetica', 'B', 8);
        $this->Cell(0, 4, utf8_decode($datos['vehiculo']), 'R', 1);

        $this->SetFont('Helvetica', '', 8);
        $this->Cell(35, 4, utf8_decode('N°. de Serie del Tacógrafo:'), 'L', 0);
        $this->SetFont('Helvetica', 'B', 8);
        $this->Cell(0, 4, utf8_decode($datos['noserie_tacografo']), 'R', 1);

        $this->Cell(0, 1, utf8_decode(''), 'B', 1);

        $this->SetFillColor(234, 234, 234);
        $this->SetFont('Helvetica', '', 8);
        $this->Cell(0, 4, utf8_decode('Intervenciones Solicitadas: '), 1, 1, '', true, '');

        foreach ($datos['tipos_intervenciones'] as $item) {
            // $this->SetFillColor(234, 234, 234);
            // $this->SetFont('Arial', 'B',  $font_size);
            $this->SetFont('Helvetica', 'B', 8);
            $this->Cell(10, 4, utf8_decode(''), 1, 0, '', true, '');
            $this->Cell(0, 4, utf8_decode($item), 1, 1, '', true, '');
        }

        $this->SetFont('Helvetica', '',  8);
        $this->Cell(10, 4, utf8_decode(''), 1, 0, '', true, '');
        $this->Cell(0, 4, utf8_decode('y las operaciones necesarias para asegurar el correcto funcionamiento del tacógrafo'), 1, 1, '', true, '');

        $this->Cell(0, 1, '', 0, 1);
    }

    function setTickets_III()
    {
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(0, 1, '', 'LTR', 1);

        $this->Cell(4, 4, '', 'L', 0);

        $this->SetDrawColor(0, 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);

        $this->Cell(4, 4, '', 0, 0);
        $this->SetFont('Helvetica', 'B',  8);
        $this->Cell(20, 4, utf8_decode('TICKET 1:'), 0, 0);
        $this->SetFont('Helvetica', '',  8);
        $this->Cell(0, 4, utf8_decode('DATOS TÉCNICOS'), 'R', 1);

        $this->Cell(0, 1, '', 'LR', 1);

        $this->Cell(4, 4, '', 'L', 0);

        $this->SetDrawColor(0, 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);

        $this->Cell(4, 4, '', 0, 0);
        $this->SetFont('Helvetica', 'B',  8);
        $this->Cell(20, 4, utf8_decode('TICKET 2:'), 0, 0);
        $this->SetFont('Helvetica', '',  8);
        $this->Cell(0, 4, utf8_decode('EVENTOS Y FALLOS'), 'R', 1);

        $this->Cell(0, 1, '', 'LR', 1);

        $this->Cell(4, 4, '', 'L', 0);

        $this->SetDrawColor(0, 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);

        $this->Cell(4, 4, '', 0, 0);
        $this->SetFont('Helvetica', 'B',  8);
        $this->Cell(20, 4, utf8_decode('TICKET 3:'), 0, 0);
        $this->SetFont('Helvetica', '',  8);
        $this->Cell(0, 4, utf8_decode('SOBREVELOCIDADES'), 'R', 1);

        $this->Cell(0, 1, '', 'LBR', 1);

        $this->Cell(0, 1, '', 0, 1);
    }

    function setMarkWithX_IV($tipos_intervenciones)
    {

        $this->SetFont('Helvetica', '',  8);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 1, '', 0, 1);

        $this->Cell(0, 1, '', 'LTR', 1);
        $this->Cell(21, 4, utf8_decode('(1. ) Marca con '), 'LR', 0);
        $this->Cell(4, 4, utf8_decode('X'), 1, 0);
        $this->Cell(0, 4, utf8_decode('las intervenciones realizadas: '), 'R', 1);

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

        //crear for para 2 columnas
        $this->Cell(0, 1, '', 'LR', 1);


        for ($i = 0; $i < count($items) - 1; $i++) {


            $this->Cell(3, 3, '', 'L', 0);

            if (existInArray($tipos_intervenciones, $items[$i]->id))
                $this->Cell(3, 3, 'X', 1, 0, 'C');
            else $this->Cell(3, 3, '', 1, 0, 'C');

            //checkbox
            //$this->Cell(3, 3, '', 1, 0);    


            $this->Cell(90, 3, utf8_decode($items[$i]->nombre), 0, 0);
            $this->Cell(3, 3, '', 0, 0);


            if (existInArray($tipos_intervenciones, $items[++$i]->id))
                $this->Cell(3, 3, 'X', 1, 0, 'C');
            else $this->Cell(3, 3, '', 1, 0, 'C');

            //checkbox
            //$this->Cell(3, 3, '', 1, 0);


            $this->Cell(0, 3, utf8_decode($items[$i]->nombre), 'R', 1);
            $this->Cell(0, 1, '', 'LR', 1);
        }

        if (count($items) % 2 == 1) {
            $this->Cell(3, 3, '', 'L', 0);

            if (existInArray($tipos_intervenciones, $items[count($items) - 1]->id))
                $this->Cell(3, 3, 'X', 1, 0, 'C');
            else $this->Cell(3, 3, '', 1, 0, 'C');
            //checkbox
            //$this->Cell(3, 3, '', 1, 0);

            $this->Cell(0, 3, utf8_decode($items[count($items) - 1]->nombre), 'R', 1);
            $this->Cell(0, 1, '', 'LRB', 1);
        } else {
            $this->Cell(0, 1, '', 'LRB', 1);
        }



        /*
        if (count($items) % 2 == 0) {
            for ($i = 0; $i < count($items); $i++) {
                if ($i % 2 == 0) {
                    //column 1
                   // $this->SetXY($this->GetX() - 208, $this->getY() + 2);

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $this->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $this->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $this->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 0, '', false, '');
                } else {
                    //column 2
                   // $this->SetXY($this->GetX() - 150, $this->getY());

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $this->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $this->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $this->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 1, '', false, '');
                }
            }
        } else {

            for ($i = 1; $i < count($items); $i++) {
                if ($i % 2 == 1) {
                    //column 1
                   // $this->SetXY($this->GetX() - 208, $this->getY() + 2);

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $this->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $this->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $this->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 0, '', false, '');
                } else {
                    //column 2
                    //$this->SetXY($this->GetX() - 150, $this->getY());

                    if (existInArray($tipos_intervenciones, $items[$i]->id))
                        $this->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
                    else $this->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

                    $this->Cell(30, 3, utf8_decode($items[$i]->nombre), 0, 1, '', false, '');
                }
            }
            //column 1
           // $this->SetXY($this->GetX() - 208, $this->getY() + 2);

            if (existInArray($tipos_intervenciones, $items[0]->id))
                $this->Cell(3, 3, utf8_decode('X'), 1, 0, '', false, '');
            else $this->Cell(3, 3, utf8_decode(''), 1, 0, '', false, '');

            $this->Cell(30, 3, utf8_decode($items[0]->nombre), 0, 0, '', false, '');
        }
        */
    }

    //----------------------------------------------------------------- Old -------------------------------------------


    function showTable_DatosVehiculo()
    {

        $this->Cell(0, 1, '', 0, 1);

        $this->SetLineWidth(0.3);
        // $this->SetDrawColor(234, 234, 234);
        $this->SetDrawColor(255, 0, 0);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 32, '', 1, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Text(12, $this->getY() + 3, utf8_decode('Datos del Vehículo:'));

        $this->setXY(11, $this->GetY() + 7);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(50, 8, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(2.) Lectura CuentaKilómetros:'));

        //   $this->setXY(11,$this->GetY()+ 7);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(50, 8, '', 1, 0);
        $this->Text(62, $this->getY() + 3, utf8_decode('(3.) Tamaño neumáticos:'));

        $this->Cell(50, 8, '', 1, 0);
        $this->Text(112, $this->getY() + 3, utf8_decode('(4.) Marca neumáticos:'));

        $this->Cell(0, 8, '', 1, 0);
        $this->Text(162, $this->getY() + 3, utf8_decode('(5.) Escultura neumáticos:'));

        $this->setXY(11, $this->GetY() + 8);
        $this->Cell(95, 8, '', 1, 0);
        $this->Cell(94, 8, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(6.) Profundidad Ranura neumáticos:'));
        $this->Text(112, $this->getY() + 3, utf8_decode('(7.) Velocidad Limitador:'));

        $this->setXY(11, $this->GetY() + 8);
        $this->Cell(95, 8, '', 1, 0);
        $this->Cell(94, 8, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('Indice de Carga del neumático:'));
    }

    function showTable_PresionNeumaticos()
    {

        $this->SetLineWidth(0.3);
        // $this->SetDrawColor(234, 234, 234);
        $this->SetDrawColor(0, 0, 0);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 14, '', 1, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Text(12, $this->getY() + 3, utf8_decode('Presión neumáticos ruedas motrices externas'));
        $this->SetFont('Arial', '', 8);
        $this->Text(75, $this->getY() + 3, utf8_decode('(en bares y con 1 decimal'));

        $this->SetFont('Arial', 'B', 8);
        $this->setXY(11, $this->GetY() + 4);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(100, 8, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(8.) Presión Rueda Izquierda:'));

        //   $this->setXY(11,$this->GetY()+ 7);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 8, '', 1, 0);
        $this->Text(112, $this->getY() + 3, utf8_decode('(9.) Presión Rueda Derecha:'));
    }

    function showTable_InstalacionTacografo()
    {

        $this->SetLineWidth(0.3);
        $this->SetDrawColor(0, 0,0);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 38, '', 1, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Text(12, $this->getY() + 5, utf8_decode('Placa Instalación Tacógrafo:'));


        $this->setXY(11, $this->GetY() + 7);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(10.) Tiene placa de instalación:'));
        $this->setXY(11, $this->GetY() + 6);
        $this->Text(20, $this->getY() + 3, utf8_decode('Si'));
        $this->Text(50, $this->getY() + 3, utf8_decode('No'));

        $this->setXY(25, $this->GetY());
        $this->Cell(3, 3, '', 1, 0);
        $this->setXY(55, $this->GetY());
        $this->Cell(3, 3, '', 1, 0);

        //   $this->setXY(11,$this->GetY()+ 7);
        // $this->SetDrawColor(0, 0, 0);
        // $this->Cell(50, 10, '', 1, 0);
        //$this->Text(62,$this->getY()+3,utf8_decode('(3.) Tamaño neumáticos:'));

        //$this->Cell(50, 10, '', 1, 0);
        //$this->Text(112,$this->getY()+3,utf8_decode('(4.) Marca neumáticos:'));

        // $this->Cell(0, 10, '', 1, 0);
        //$this->Text(162,$this->getY()+3,utf8_decode('(5.) Escultura neumáticos:'));

        $this->setXY(11, $this->GetY() + 4);
        $this->Cell(0, 10, '', 1, 0);
        // $this->Cell(95, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(11.) Nombre y domicilio taller instalador de la placa o no. de autorización:'));
        //$this->Text(112,$this->getY()+3,utf8_decode('(7.) Velocidad Limitador:'));

        $this->setXY(11, $this->GetY() + 10);
        $this->Cell(0, 10, '', 1, 0);
        // $this->Cell(95, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(12.)  Fecha que figura en la placa:'));
    }

    function showTable_DisponePrecintos()
    {

        $this->SetLineWidth(0.3);
        $this->SetDrawColor(0, 0, 0);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 7, '', 1, 0);

        $this->SetFont('Arial', 'B', 8);
        $this->Text(12, $this->getY() + 5, utf8_decode('(13.) Dispone de todos los precintos y están íntegros: '));
        $this->Text(100, $this->getY() + 5, utf8_decode('Si'));
        $this->Text(120, $this->getY() + 5, utf8_decode('No'));

        $this->SetDrawColor(0, 0, 0);
        $this->setXY(105, $this->GetY() + 3);
        $this->Cell(3, 3, '', 1, 0);
        $this->setXY(125, $this->GetY());
        $this->Cell(3, 3, '', 1, 0);
    }

    function showTable_IdentificacionVU()
    {
        $this->SetLineWidth(0.3);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 4, utf8_decode('Identificación VU'), 'LTR', 1);

        $this->Cell(0, 4, utf8_decode('Fecha de activación de la unidad instalada: '), 'LTR', 1);
        $this->Cell(0, 4, utf8_decode(''), 'LBR', 1);
       // $this->Cell(0, 3, '', 'LRB', 1);

        $this->Cell(0, 4, utf8_decode('¿Unidad adecuada según reglamento UE No. 2014/45 según fecha de activación?'), 'LTR', 1);
        
        $this->Cell(4, 4, '', 'L', 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, 'Si', 0, 0,'C');
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, 'No', 0, 0,'C');
        $this->Cell(0, 4, '', 'R', 1);
        $this->Cell(0, 2, '', 'LBR', 1);

    }

    private function show_SiNO_Derecha($total_cell, $pos_si, $pos_no, $square_size)
    {

        for ($i = 0; $i < $total_cell; $i++) {

            if ($i == $pos_si - 1) {
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if ($i == $pos_si) {
                $this->Cell($square_size, $square_size, 'Si', 0, 0);
                continue;
            }

            if ($i == $pos_no - 1) {
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if ($i == $pos_no) {
                $this->Cell($square_size, $square_size, 'No', 0, 0);
                continue;
            }

            $this->Cell($square_size, $square_size, '', 0, 0);
        }
        $this->Cell(0, $square_size, '', 'R', 1);
    }

    public function show_SINO_Fullline($cell_count = 39, $square_size  = 5, $pos_si = 4, $pos_no = 12, $margin_size = 2, $show_borders = false)
    {

        $this->Cell(0, $margin_size, '', 'LR', 1);
        for ($i = 0; $i < $cell_count; $i++) {

            if ($i == 0) {
                $this->Cell($square_size, $square_size, '', 'L', 0);
                continue;
            }

            if ($i == $pos_si - 1) {
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if ($i == $pos_si) {
                $this->Cell($square_size, $square_size, 'Si', 0, 0);
                continue;
            }


            if ($i == $pos_no - 1) {
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if ($i == $pos_no) {
                $this->Cell($square_size, $square_size, 'No', 0, 0);
                continue;
            }

            $this->Cell($square_size, $square_size, '', $show_borders, 0);
        }

        //complete squares
        $this->Cell(0, $square_size, '', 'R', 1);
        $this->Cell(0,  $margin_size, '', 'LRB', 1);
    }

    private function show_SiNO_Izquierda($total_cell, $pos_si, $pos_no, $square_size, $border = 0)
    {

        for ($i = 0; $i < $total_cell - 1; $i++) {

            if ($i == $pos_si - 1) {
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if ($i == $pos_si) {
                $this->Cell($square_size, $square_size, 'Si', 0, 0);
                continue;
            }

            if ($i == $pos_no - 1) {
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if ($i == $pos_no) {
                $this->Cell($square_size, $square_size, 'No', 0, 0);
                continue;
            }

            if ($i == 0) {
                $this->Cell($square_size, $square_size, '', 'L', 0);
                continue;
            }

            $this->Cell($square_size, $square_size, '', $border, 0);
        }
        $L = $this->GetPageWidth() / 2 - 4;
        $LC = ($total_cell - 1)  * $square_size;

        $this->Cell($L - $LC, $square_size, '', 'R', 0);
    }

    function showTable_ComprobacionVU()
    {

        $this->SetLineWidth(0.3);
        $this->SetDrawColor(0, 0, 0);

        $this->Cell(0, 4, utf8_decode('Comprovación VU'), 1, 1);

        $this->Cell($this->GetPageWidth() / 2 - 4,4, utf8_decode('(14. ) No. serie de la placa'), 'LTR', 0);
        $this->Cell(0, 4, utf8_decode('(15. ) Coincide con no. serie del tacógrafo'), 'RTL', 1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 4, '', 'LR', 0);
        for ($i = 0; $i < 17; $i++) {

            if ($i == 3) {
                $this->Cell(4, 4, '', 1, 0);
                continue;
            }

            if ($i == 4) {
                $this->Cell(4, 4, 'Si', 0, 0);
                continue;
            }

            if ($i == 6) {
                $this->Cell(4, 4, '', 1, 0);
                continue;
            }

            if ($i == 7) {
                $this->Cell(4, 4, 'No', 0, 0);
                continue;
            }

            $this->Cell(4, 4, '', 0, 0);
        }
        $this->Cell(0, 4, '', 'R', 1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 2, '', 'LR', 0);
        $this->Cell(0, 1, '', 'LRB', 1);

        //-------------------------------------------------------



        $this->Cell($this->GetPageWidth() / 2 - 4, 4, utf8_decode('(16.) Todos los componentes funcionan correctamente IMPRESORA,'), 'LTR', 0);
        $this->Cell(0, 4, utf8_decode('Se ha sustituido la pila del tacógrafo'), 'LTR', 1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 4, utf8_decode('PANTALLA, TECLADO, LECTORES TARJETA, GNSS, DSRC, Bluetooth'), 'LR', 0);
        $this->Cell(0, 4, '', 'LR', 1);

        $this->show_SiNO_Izquierda(21, 4, 12, 4, 0);

        $this->show_SiNO_Derecha(17, 4, 12, 4);

        $this->Cell($this->GetPageWidth() / 2 - 4, 2, '', 'LRB', 0);
        $this->Cell(0, 2, '', 'LRB', 1);

        //$this->AddPage('P', 'A4');

        $this->Cell(0, 7, '', 0, 1);

        $this->Cell(0, 4, utf8_decode('(17.) Desviaciones inferiores a ±2% de la distancia y ±1 Km/h de la velocidad'), 1, 1);

        $this->show_SINO_Fullline(39,3);
    }

    function showTable_SensorMovimiento()
    {

        $this->SetFont('Arial', 'B', 8);
        $this->Cell(0, 4, 'Sensor de Movimiento', 1, 1);

        $this->SetFont('Arial', '', 8);
        $this->Cell($this->GetPageWidth() / 3, 4, utf8_decode('(18.) No. Serie del Sensor'), 'LTR', 0);
        $this->Cell($this->GetPageWidth() / 3, 4, utf8_decode('(19.) No. Homologación del Sensor'), 'LTR', 0);
        $this->Cell(0, 4, utf8_decode('(20.) Fecha de Instalación del Sensor'), 'LTR', 1);

        $this->Cell($this->GetPageWidth() / 3, 4, utf8_decode(''), 'LBR', 0);
        $this->Cell($this->GetPageWidth() / 3, 4, utf8_decode(''), 'LBR', 0);
        $this->Cell(0, 4, utf8_decode(''), 'LBR', 1);

        $this->Cell(0, 4, utf8_decode('(21.) Hay dispositivos que generan campos magnéticos que afectan al sensor'), 1, 1);
        $this->show_SINO_Fullline(39,3);

        $this->Cell(0, 4, utf8_decode('(22.) Le afectan corrientes eléctricas'), 1, 1);
        $this->show_SINO_Fullline(39,3);
    }

    function showList_with_Checkbox()
    {

        $this->SetDrawColor(255, 0, 0);
        $this->Cell(0, 2, '', 'LTR', 1);
        $this->Cell(10, 3, '', 'L', 0);
        $this->Cell(5, 3, '', 0, 0);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(3, 3, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Cell(15, 3, 'TICKET 4:', 0, 0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 3, utf8_decode('DATOS TÉCNICOS'), 'R', 1);
        $this->Cell(0, 2, '', 'LBR', 1);

        $this->Cell(0, 1, '', 0, 1);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 3, utf8_decode('(23.) No. de serie es el mismo que el de la intervención previa a la actual'), 1, 1);
        $this->show_SINO_Fullline(39,3);
    }

    function ShowCheckboxCounter($titulo)
    {
        $this->SetFont('Arial', 'B', 8);
        $this->Cell(0, 1, '', 0, 1);
        $this->Cell(0, 4, utf8_decode($titulo), 1, 1);
        $this->SetFont('Arial', '', 8);
        $this->Cell($this->GetPageWidth() / 2, 3, '', 'L', 0);
        $this->Cell(0, 3, 'No. SERIE', 'LTR', 1);

        $this->Cell(3, 3, '', 'L', 0);
        $this->Cell(3, 3, '', 1, 0);
        $this->Cell(3, 3, '', 0, 0);
        $this->Cell(20, 3, 'INTERNO', 0, 0);

        $this->Cell(3, 3, '', 1, 0);
        $this->Cell(3, 3, '', 0, 0);
        $this->Cell(20, 3, 'EXTERNO', 0, 0);

        $this->Cell(3, 3, '', 1, 0);
        $this->Cell(3, 3, '', 0, 0);
        $this->Cell(44, 3, 'NO DISPONE', 'R', 0);

        $this->Cell(0, 3, '', 'R', 1);

        $this->Cell($this->GetPageWidth() / 2, 3, '', 'LBR', 0);
        $this->Cell(0, 3, '', 'BR', 1);
    }

    function ShowTable_ByCells($title = '', $array = [])
    {
        //margin
        if ($title != '') {
            $this->Cell(0, 1, '', 0, 1);
            $this->SetFont('Arial', 'B', 8);
            $this->Cell(0, 3.5, utf8_decode($title), 1, 1);
        }

        $this->SetFont('Arial', '', 8);

        $this->Cell($this->GetPageWidth() / 2, 3.5, utf8_decode($array[0]), 'LTR', 0);
        $this->Cell(0, 3.5, utf8_decode($array[1]), 'LTR', 1);
        $this->Cell($this->GetPageWidth() / 2, 3.5, '', 'LBR', 0);
        $this->Cell(0, 3.5, '', 'LBR', 1);
    }

    function show_Tickets_By_Data()
    {

        $this->Cell(0, 1, '', 0, 1);
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(0, 1, '', 'LTR', 1);

        $this->Cell(2, 2, '', 'L', 0);

        $this->SetDrawColor(0, 0, 0);
        $this->Cell(2, 2, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);

        $this->Cell(2, 2, '', 0, 0);

        $this->SetFont('Arial', 'B', 8);
        $this->Cell(15, 2, 'TICKET 5:', 0, 0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 2, utf8_decode('24 HORAS TARJETA TÉCNICO'), 'R', 1);
        $this->Cell(0, 1, '', 'LR', 1);

        $this->Cell(2, 2, '', 'L', 0);

        $this->SetDrawColor(0, 0, 0);
        $this->Cell(2, 2, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);

        $this->Cell(2, 2, '', 0, 0);

        $this->SetFont('Arial', 'B', 8);
        $this->Cell(15, 2, 'TICKET 6:', 0, 0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0,2, utf8_decode('DATOS TÉCNICOS'), 'R', 1);
        $this->Cell(0, 2, '', 'LR', 1);

        $this->Cell(2, 2, '', 'L', 0);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(2, 2, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(2, 2, '', 0, 0);

        $this->SetFont('Arial', 'B', 8);
        $this->Cell(15, 2, 'TICKET 7:', 0, 0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 2, utf8_decode('SOBREVELOCIDAD'), 'R', 1);
        $this->Cell(0, 2, '', 'LR', 1);

        $this->SetFont('Arial', 'B', 8);
        $this->Cell(0, 2, 'DESCARGA VU', 'LR', 1);
        $this->Cell(0, 2, '', 'LR', 1);

        $this->Cell(2, 2, '', 'L', 0);
        $this->Cell(2, 2, '', 0, 0);
        $this->Cell(2, 2, '', 0, 0);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(2, 2, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(2, 2, '', 0, 0);

        $this->SetFont('Arial', 'B', 8);
        //$this->Cell(15,3,'TICKET 7:',0,0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 2, utf8_decode('FICHERO DATOS TÉCNICOS'), 'R', 1);
        $this->Cell(0, 2, '', 'LR', 1);

        $this->Cell(2, 2, '', 'L', 0);
        $this->Cell(2, 2, '', 0, 0);
        $this->Cell(2, 2, '', 0, 0);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(2, 2, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(2, 2, '', 0, 0);

        $this->SetFont('Arial', 'B', 8);
        //$this->Cell(15,3,'TICKET 7:',0,0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 2, utf8_decode('FICHERO EVENTOS Y FALLOS'), 'R', 1);
        $this->Cell(0, 2, '', 'LR', 1);

        $this->Cell(2, 2, '', 'L', 0);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(2, 2, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(2, 2, '', 0, 0);

        $this->SetFont('Arial', 'B', 8);
        // $this->Cell(15,3,'TICKET 7:',0,0);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 2, utf8_decode('FICHERO GNSS/DSRC'), 'R', 1);
        $this->Cell(0, 2, '', 'LBR', 1);

        // $this->Cell(0, 2, '', 'LBR', 1);
        // $this->Cell(0, 2, '', 0, 1);
    }

    function ShowTable_PrecintadoTacografo()
    {
        $this->Cell(0, 1, '', 0, 1);
        $this->SetDrawColor(0, 0, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Cell(0, 3.5, utf8_decode('Precintado de tacógrafo'), 0, 1);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 3.5, utf8_decode('No. precintos instalados'), 1, 1);
        $this->Cell(0, 3.5, utf8_decode('No. de serie de los precintos instalados'), 'LTR', 1);
        $this->Cell(0, 3.5, utf8_decode(''), 'LBR', 1);
    }

    function resultado_global()
    {
        $this->SetFont('Arial', 'B', 8);
        $this->Cell(0, 2, '', 0, 1);
        $this->Cell($this->GetPageWidth() / 3, 4, '(50.) RESULTADO GLOBAL', 'LTR', 0);
        $this->Cell($this->GetPageWidth() / 3, 4, 'En caso desfavorable indicar la causa:', 'LTR', 0);
        $this->Cell(0, 4, 'FECHA:', 'LTR', 1);

        $this->Cell($this->GetPageWidth() / 3, 4, '', 'LR', 0);
        $this->Cell($this->GetPageWidth() / 3, 4, '', 'LR', 0);
        $this->Cell(0, 4, '', 'LR', 1);


        $this->Cell(4, 4, '', 'L', 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(2, 4, 'F', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, 'D', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 'R', 0);
        $this->Cell($this->GetPageWidth() / 3, 4, '', 0, 0);
        $this->Cell(0, 4, '', 'LR', 1);

        $this->Cell(4, 4, '', 'L', 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(2, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(4, 4, '', 'R', 0);
        $this->Cell($this->GetPageWidth() / 3, 4, '', 'LR', 0);
        $this->Cell(0, 4, 'Fdo.:', 'LR', 1);

        $this->Cell($this->GetPageWidth() / 3, 2, '', 'LRB', 0);
        $this->Cell($this->GetPageWidth() / 3, 2, '', 'LRB', 0);
        $this->Cell(0, 2, '', 'LRB', 1);

        $this->Cell(0, 2, '', 0, 1);

        $this->SetDrawColor(255, 0, 0);
        $this->Cell(0, 2, '', 'LTR', 1);

        $this->Cell(4, 4, '', 'L', 0);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(4, 4, '', 1, 0);
        $this->SetDrawColor(255, 0, 0);
        $this->Cell(4, 4, '', 0, 0);
        $this->Cell(0, 4, utf8_decode('DESCARGA TARJETA CENTRO TÉCNICO'), 'R', 1);

        $this->Cell(0, 2, '', 'LBR', 1);
    }
}
