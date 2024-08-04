<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class OrdenTxTipoRevicion extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var int */
    public $id_ordentrabajo;

    /** @var int */
    public $id_revision;

    public function clear() 
    {
        parent::clear();
        $this->id_ordentrabajo = 0;
        $this->id_revision = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "ordenes_x_tiporevicion";
    }

    public function test(): bool
    {
        return parent::test();
    }}
