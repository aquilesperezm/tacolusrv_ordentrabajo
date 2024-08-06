<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class IntervencionXOrdenDeTrabajo extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var int */
    public $id_ordendetrabajo;

    /** @var int */
    public $id_tipodeintervencion;

    public function clear() 
    {
        parent::clear();
        $this->id_ordendetrabajo = 0;
        $this->id_tipodeintervencion = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "intervenciones_vs_ordendetrabajo";
    }

    public function test(): bool
    {
        return parent::test();
    }}
