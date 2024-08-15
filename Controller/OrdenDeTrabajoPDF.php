<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Plugins\OrdenDeTrabajo\Library\PDF\FPDF;

class OrdenDeTrabajoPDF extends FPDF
{



    function Header()
    {
        // Select Arial bold 15
        $this->SetFont('Arial', 'B', 8);
        // Move to the right
        // $this->Cell(80);
        // Framed title
        $this->Cell(0, 10, utf8_decode('Página: ') . $this->PageNo() . '/{nb}', 0, 0, 'R');
        // Line break
        $this->Ln(20);
    }

    function showTable_DatosVehiculo()
    {
        $this->SetLineWidth(0.3);
        $this->SetDrawColor(234, 234, 234);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 38, '', 1, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Text(12, $this->getY() + 5, utf8_decode('Datos del Vehículo:'));

        $this->setXY(11, $this->GetY() + 7);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(50, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(2.) Lectura CuentaKilómetros:'));

        //   $this->setXY(11,$this->GetY()+ 7);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(50, 10, '', 1, 0);
        $this->Text(62, $this->getY() + 3, utf8_decode('(3.) Tamaño neumáticos:'));

        $this->Cell(50, 10, '', 1, 0);
        $this->Text(112, $this->getY() + 3, utf8_decode('(4.) Marca neumáticos:'));

        $this->Cell(0, 10, '', 1, 0);
        $this->Text(162, $this->getY() + 3, utf8_decode('(5.) Escultura neumáticos:'));

        $this->setXY(11, $this->GetY() + 10);
        $this->Cell(100, 10, '', 1, 0);
        $this->Cell(95, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(6.) Profundidad Ranura neumáticos:'));
        $this->Text(112, $this->getY() + 3, utf8_decode('(7.) Velocidad Limitador:'));

        $this->setXY(11, $this->GetY() + 10);
        $this->Cell(100, 10, '', 1, 0);
        $this->Cell(95, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('Indice de Carga del neumático:'));
    }

    function showTable_PresionNeumaticos()
    {

        $this->SetLineWidth(0.3);
        $this->SetDrawColor(234, 234, 234);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 19, '', 1, 0);
        $this->SetFont('Arial', 'B', 8);
        $this->Text(12, $this->getY() + 5, utf8_decode('Presión neumáticos ruedas motrices externas'));
        $this->SetFont('Arial', '', 8);
        $this->Text(75, $this->getY() + 5, utf8_decode('(en bares y con 1 decimal'));

        $this->SetFont('Arial', 'B', 8);
        $this->setXY(11, $this->GetY() + 7);
        $this->SetDrawColor(0, 0, 0);
        $this->Cell(100, 10, '', 1, 0);
        $this->Text(12, $this->getY() + 3, utf8_decode('(8.) Presión Rueda Izquierda:'));

        //   $this->setXY(11,$this->GetY()+ 7);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 10, '', 1, 0);
        $this->Text(112, $this->getY() + 3, utf8_decode('(9.) Presión Rueda Derecha:'));
    }

    function showTable_InstalacionTacografo()
    {

        $this->SetLineWidth(0.3);
        $this->SetDrawColor(234, 234, 234);
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
        $this->SetDrawColor(234, 234, 234);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(0, 10, '', 1, 0);

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
        $this->Cell(0, 5, utf8_decode('Identificación VU'), 0, 1);

        $this->Cell(0, 5, utf8_decode('Fecha de activación de la unidad instalada'), 'LTR', 1);
        $this->Cell(0, 5, '', 'LRB', 1);

        $this->Cell(0, 5, utf8_decode('¿Unidad adecuada según reglamento UE No. 2014/45 según fecha de activación?'), 'LTR', 1);
        for ($i = 0; $i < 38; $i++) {

            if ($i == 0) {
                $this->Cell(5, 5, '', 'L', 0);
                continue;
            }
            if ($i == 5) {
                $this->Cell(5, 5, 'Si', 0, 0);
                continue;
            }
            if ($i == 4) {
                $this->Cell(5, 5, '', 1, 0);
                continue;
            }

            if ($i == 9) {
                $this->Cell(5, 5, 'No', 0, 0);
                continue;
            }
            if ($i == 8) {
                $this->Cell(5, 5, '', 1, 0);
                continue;
            }

            $this->Cell(5, 5, '', 0, 0);
        }

        $this->Cell(0, 5, '', 'R', 1);
        $this->Cell(0, 5, '', 'LRB', 0);

        $this->setXY(9, $this->GetY() - 25);

        $this->SetLineWidth(0.3);
        $this->SetDrawColor(234, 234, 234);
        // $this->SetDrawColor(0, 0, 0);
        $this->Cell(198, 31, '', 1, 0);
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

    private function show_SINO_Fullline($cell_count = 39, $square_size  = 5, $pos_si = 4, $pos_no = 12, $margin_size = 2, $show_borders = false)
    {

        $this->Cell(0, $margin_size, '', 'LR', 1);
        for ($i = 0; $i < $cell_count; $i++) {

            if($i == 0){
                $this->Cell($square_size, $square_size, '', 'L', 0);
                continue;
            }

            if($i == $pos_si - 1){
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if($i == $pos_si){
                $this->Cell($square_size, $square_size, 'Si', 0, 0);
                continue;
            }


            if($i == $pos_no - 1){
                $this->Cell($square_size, $square_size, '', 1, 0);
                continue;
            }

            if($i == $pos_no){
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

        $this->Cell(0,5,utf8_decode('Comprovación VU'),1,1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 5, utf8_decode('(14. ) No. serie de la placa'), 'LTR', 0);
        $this->Cell(0, 5, utf8_decode('(15. ) Coincide con no. serie del tacógrafo'), 'RTL', 1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 5, '', 'LR', 0);
        for ($i = 0; $i < 17; $i++) {

            if ($i == 3) {
                $this->Cell(5, 5, '', 1, 0);
                continue;
            }

            if ($i == 4) {
                $this->Cell(5, 5, 'Si', 0, 0);
                continue;
            }

            if ($i == 6) {
                $this->Cell(5, 5, '', 1, 0);
                continue;
            }

            if ($i == 7) {
                $this->Cell(5, 5, 'No', 0, 0);
                continue;
            }

            $this->Cell(5, 5, '', 0, 0);
        }
        $this->Cell(0, 5, '', 'R', 1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 5, '', 'LRB', 0);
        $this->Cell(0, 5, '', 'LRB', 1);

        //-------------------------------------------------------

       

        $this->Cell($this->GetPageWidth() / 2 - 4, 5, utf8_decode('(16.) Todos los componentes funcionan correctamente IMPRESORA,'), 'LTR', 0);
        $this->Cell(0, 5, utf8_decode('Se ha sustituido la pila del tacógrafo'), 'LTR', 1);

        $this->Cell($this->GetPageWidth() / 2 - 4, 5, utf8_decode('PANTALLA, TECLADO, LECTORES TARJETA, GNSS, DSRC, Bluetooth'), 'LR', 0);
        $this->Cell(0, 5, '', 'LR', 1);

        $this->show_SiNO_Izquierda(21, 4, 12, 4, 0);

        $this->show_SiNO_Derecha(17, 4, 12, 4);

        $this->Cell($this->GetPageWidth() / 2 - 4, 2, '', 'LRB', 0);
        $this->Cell(0, 2, '', 'LRB', 1);

        $this->Cell(0, 5, utf8_decode('(17.) Desviaciones inferiores a ±2% de la distancia y ±1 Km/h de la velocidad'), 1, 1);

        $this->show_SINO_Fullline();

        //$this->Cell(0, 5, '', 1, 1);
        // $this->Cell(0, 3, '', 1, 1,'',true);
    }
}
