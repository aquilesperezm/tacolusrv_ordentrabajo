<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Lib\ExtendedController\ListController;

/**
 * Este es un controlador específico para listados. Permite una o varias pestañas.
 * Cada una con un listado de los registros de un modelo.
 * Además, hace uso de archivos de XMLView para definir qué columnas mostrar y cómo.
 *
 * https://facturascripts.com/publicaciones/listcontroller-232
 */
class ListVehiculoPorTacografo extends ListController
{
    public function getPageData(): array
    {
        $pageData = parent::getPageData();
        $pageData["title"] = "2. Vehículos por Tacógrafos";
        $pageData["menu"] = "Ordenes de Trabajo";
        $pageData["icon"] = "fas fa-atom";
        return $pageData;
    }

    protected function createViews(): void
    {
        $this->createViewsVehiculoPorTacografo();
    }

    protected function createViewsVehiculoPorTacografo(string $viewName = "ListVehiculoPorTacografo"): void
    {
        $this->addView($viewName, "VehiculoPorTacografo", "Vehiculos por Tacografos");
        
        // Esto es un ejemplo ... debe de cambiarlo según los nombres de campos del modelo
        // $this->addOrderBy($viewName, ["id"], "id", 2);
        // $this->addOrderBy($viewName, ["name"], "name");
        
        // Esto es un ejemplo ... debe de cambiarlo según los nombres de campos del modelo
        // $this->addSearchFields($viewName, ["id", "name"]);
    }
}
