<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo;

use FacturaScripts\Core\Template\InitClass;
use FacturaScripts\Core\Controller\ApiRoot;
use FacturaScripts\Core\Kernel;

use mysqli;

use FacturaScripts\Plugins\OrdenDeTrabajo\Model\OrdenDeTrabajo;
use FacturaScripts\Plugins\OrdenDeTrabajo\Model\IntervencionXOrdenDeTrabajo;

/**
 * Los plugins pueden contener un archivo Init.php en el que se definen procesos a ejecutar
 * cada vez que carga FacturaScripts o cuando se instala o actualiza el plugin.
 *
 * https://facturascripts.com/publicaciones/el-archivo-init-php-307
 */
class Init extends InitClass
{


    public function init(): void
    {
        // se ejecuta cada vez que carga FacturaScripts (si este plugin está activado).

        $orden = new OrdenDeTrabajo();
        $rel_1 = new IntervencionXOrdenDeTrabajo();

        Kernel::addRoute('/api/3/get_ordenesdetrabajo', 'API_OrdenDeTrabajo', -1);
        ApiRoot::addCustomResource('get_ordenesdetrabajo');
        
        Kernel::addRoute('/api/3/get_intervencion_by_ordenid', 'API_IntervencionesByOrdenDeTrabajo', -1);
        ApiRoot::addCustomResource('get_intervencion_by_ordenid');
        


        Kernel::addRoute('/api/3/get_vehiculos', 'API_Vehiculo', -1);
        ApiRoot::addCustomResource('get_vehiculos');
        
    }

    public function uninstall(): void
        {
            // se ejecuta cada vez que se desinstale el plugin. Primero desinstala y luego ejecuta el uninstall.
        }

    public function update(): void
    {
        // se ejecuta cada vez que se instala o actualiza el plugin

    }
}
