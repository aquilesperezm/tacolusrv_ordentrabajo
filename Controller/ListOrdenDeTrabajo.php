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
class ListOrdenDeTrabajo extends ListController
{
    public function getPageData(): array
    {
        $pageData = parent::getPageData();
        $pageData["title"] = "Ordenes de Trabajo";
        $pageData["menu"] = "Ordenes de Trabajo";
        $pageData["icon"] = "fas fa-file-alt";
        return $pageData;
    }

    protected function createViews(): void
    {
        $this->createViewsOrdenDeTrabajo();
        
    }

    protected function createViewsOrdenDeTrabajo(string $viewName = "ListOrdenDeTrabajo"): void
    {
        $this->addView($viewName, "OrdenDeTrabajo", "Ordenes de Trabajo","fas fa-file-alt");
        
        // Esto es un ejemplo ... debe de cambiarlo según los nombres de campos del modelo
        // $this->addOrderBy($viewName, ["id"], "id", 2);
        // $this->addOrderBy($viewName, ["name"], "name");
        
        // Esto es un ejemplo ... debe de cambiarlo según los nombres de campos del modelo
        // $this->addSearchFields($viewName, ["id", "name"]);
    }
}
