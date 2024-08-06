<?php
namespace FacturaScripts\Plugins\OrdenDeTrabajo\Controller;

use FacturaScripts\Core\Template\ApiController;

class ApiControllerPruebas extends ApiController
{
    protected function runResource(): void
    {
        // tu código aquí
       
        $this->request->getMethod() === 'POST'? $this->response->setContent(json_encode(['hola' => 'mundo'])) : $this->response->send();
        
    }
}