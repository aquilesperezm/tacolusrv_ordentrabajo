<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class OrdenDeTrabajo extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var string */
    public $numero_orden;

    /** @var string */
    public $fecha_orden;

    /** @var int */
    public $id_tacografo;

    /** @var int */
    public $id_vehiculo;
    

    public function clear() 
    {
        parent::clear();
        $this->fecha_orden = date(self::DATE_STYLE);
        //$this->id_cliente = 0;
        $this->id_tacografo = 0;
        $this->id_vehiculo = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "ordenesdetrabajo";
    }

    public function test(): bool
    {
        $this->numero_orden = Tools::noHtml($this->numero_orden);
        return parent::test();
    }}
