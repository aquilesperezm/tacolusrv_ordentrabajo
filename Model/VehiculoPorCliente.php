<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class VehiculoPorCliente extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var int */
    public $id_cliente;

    /** @var int */
    public $id_vehiculo;

    public function clear() 
    {
        parent::clear();
        $this->id_cliente = 0;
        $this->id_vehiculo = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "rel_vehiculos_x_clientes";
    }

    public function test(): bool
    {
        return parent::test();
    }}