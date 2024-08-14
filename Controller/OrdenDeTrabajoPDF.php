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

    function comprobacion_VU(){

        
    }

}
