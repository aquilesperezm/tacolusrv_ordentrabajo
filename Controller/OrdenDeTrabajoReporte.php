<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Base\Controller;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class OrdenDeTrabajoReporte extends Controller
{
    public function getPageData(): array
    {
       /* $pageData = parent::getPageData();
        $pageData["menu"] = "admin";
        $pageData["title"] = "OrdenDeTrabajoReporte";
        $pageData["icon"] = "fas fa-file";
        return $pageData;*/
        return [];
    }

    /**
     * Ejecuta la lógica privada del controlador.
     */
    public function privateCore(&$response, $user, $permissions): void
    {
        parent::privateCore($response, $user, $permissions);
        var_dump($_POST);
        var_dump($_GET);

        // tu código aquí
    }

    /**
     * Ejecuta la lógica pública del controlador.
     */
    public function publicCore(&$response): void
    {
        parent::publicCore($response);

        // tu código aquí
    }
}
