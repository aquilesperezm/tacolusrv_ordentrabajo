<?php

namespace FacturaScripts\Plugins\OrdenDeTrabajo\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class DatosOrdenTrabajo extends ModelClass
{
    use ModelTrait;

    /** @var bool */
    public $afectan_ce_sensor;

    /** @var string */
    public $ajuste_fecha;

    /** @var float */
    public $calibracion_factor_k;

    /** @var float */
    public $calibracion_factor_l;

    /** @var float */
    public $calibracion_factor_w;

    /** @var float */
    public $calibracion_lectura_cuentakm;

    /** @var float */
    public $calibracion_neumaticos_size;

    /** @var float */
    public $calibracion_valocidad_limitador;

    /** @var int */
    public $cant_precintos_inst;

    /** @var float */
    public $circunferencia_newmaticos_factor_l;

    /** @var float */
    public $coeficiente_caract_factor_w;

    /** @var bool */
    public $coincide_num_tacografo;

    /** @var bool */
    public $desviaciones_inferiores;

    /** @var float */
    public $determ_errores_banco;

    /** @var float */
    public $determ_errores_dist_recorrida;

    /** @var float */
    public $determ_errores_percent;

    /** @var float */
    public $determ_errores_tacografo;

    /** @var bool */
    public $dispone_precintos_integros;

    /** @var int */
    public $dispositivo_recptor_dsrc;

    /** @var int */
    public $dispositivo_recptor_gnss;

    /** @var string */
    #public $dispositivo_recptor_gnss_numserie;

    /** @var string */
    public $dispositivo_recptor_gnss_numserie;

    /** @var string */
    public $equipos_utilizados_bancorod;

    /** @var string */
    public $equipos_utilizados_cronometro;

    /** @var string */
    public $equipos_utilizados_equipcalibrado;

    /** @var string */
    public $equipos_utilizados_manometro;

    /** @var bool */
    public $es_descarga_tarjeta_centro_tec;

    /** @var bool */
    public $es_descarga_vu_file_datostec;

    /** @var bool */
    public $es_descarga_vu_file_event_fallos;

    /** @var bool */
    public $es_fichero_gnss_dsrc;

    /** @var bool */
    public $es_numserie_sensor_correcto;

    /** @var bool */
    public $es_ticket_5;

    /** @var bool */
    public $es_ticket_6;

    /** @var bool */
    public $es_ticket_7;

    /** @var string */
    public $escultura_neumaticos;

    /** @var bool */
    public $existen_camp_magneticos_sensor;

    /** @var string */
    public $fecha_activacion_unidadinst;

    /** @var string */
    public $fecha_figura_placainstalacion;

    /** @var string */
    public $fecha_inst_sensor;

    /** @var int */
    public $id;

    /** @var int */
    public $indice_carga_neumatico;

    /** @var int */
    public $lectura_cuentakilom;

    /** @var string */
    public $marca_neumaticos;

    /** @var int */
    public $neumaticos_size;

    /** @var string */
    public $num_homologacion_sensor;

    /** @var bool */
    public $num_serie_intervtecnica_previa_igual;

    /** @var string */
    public $num_serie_placa;

    /** @var string */
    public $num_serie_sensor_mov;

    /** @var string */
    public $numserie_precintos_instalados;

    /** @var float */
    public $presion_rueda_der;

    /** @var float */
    public $presion_rueda_izq;

    /** @var int */
    public $profundidad_ranura_neumaticos;

    /** @var bool */
    public $resultado_global;

    /** @var string */
    public $resultado_global_causa;

    /** @var string */
    public $resultado_global_fecha;

    /** @var bool */
    public $sustituido_pila_tacografo;

    /** @var string */
    public $text_alternativo_placainstalacion;

    /** @var bool */
    public $tiene_placa_instalacion;

    /** @var bool */
    public $todos_componentes_funcionan_ok;

    /** @var bool */
    public $unidad_adecuada_reglamento2014_45;

    public function clear() 
    {
        parent::clear();
        $this->afectan_ce_sensor = false;
        $this->ajuste_fecha = date(self::DATE_STYLE);
        $this->calibracion_factor_k = 0.0;
        $this->calibracion_factor_l = 0.0;
        $this->calibracion_factor_w = 0.0;
        $this->calibracion_lectura_cuentakm = 0.0;
        $this->calibracion_neumaticos_size = 0.0;
        $this->calibracion_valocidad_limitador = 0.0;
        $this->cant_precintos_inst = 0;
        $this->circunferencia_newmaticos_factor_l = 0.0;
        $this->coeficiente_caract_factor_w = 0.0;
        $this->coincide_num_tacografo = false;
        $this->desviaciones_inferiores = false;
        $this->determ_errores_banco = 0.0;
        $this->determ_errores_dist_recorrida = 0.0;
        $this->determ_errores_percent = 0.0;
        $this->determ_errores_tacografo = 0.0;
        $this->dispone_precintos_integros = false;
        $this->dispositivo_recptor_dsrc = 0;
        $this->dispositivo_recptor_gnss = 0;
        $this->es_descarga_tarjeta_centro_tec = false;
        $this->es_descarga_vu_file_datostec = false;
        $this->es_descarga_vu_file_event_fallos = false;
        $this->es_fichero_gnss_dsrc = false;
        $this->es_numserie_sensor_correcto = false;
        $this->es_ticket_5 = false;
        $this->es_ticket_6 = false;
        $this->es_ticket_7 = false;
        $this->existen_camp_magneticos_sensor = false;
        $this->fecha_activacion_unidadinst = date(self::DATE_STYLE);
        $this->fecha_figura_placainstalacion = date(self::DATE_STYLE);
        $this->fecha_inst_sensor = date(self::DATE_STYLE);
        $this->indice_carga_neumatico = 0;
        $this->lectura_cuentakilom = 0;
        $this->neumaticos_size = 0;
        $this->num_serie_intervtecnica_previa_igual = false;
        $this->presion_rueda_der = 0.0;
        $this->presion_rueda_izq = 0.0;
        $this->profundidad_ranura_neumaticos = 0;
        $this->resultado_global = false;
        $this->resultado_global_fecha = date(self::DATE_STYLE);
        $this->sustituido_pila_tacografo = false;
        $this->tiene_placa_instalacion = false;
        $this->todos_componentes_funcionan_ok = false;
        $this->unidad_adecuada_reglamento2014_45 = false;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "datos_ordenes_trabajos";
    }

    public function test(): bool
    {
        $this->dispositivo_recptor_gnss_numserie = Tools::noHtml($this->dispositivo_recptor_gnss_numserie);
        $this->dispositivo_recptor_gnss_numserie = Tools::noHtml($this->dispositivo_recptor_gnss_numserie);
        $this->equipos_utilizados_bancorod = Tools::noHtml($this->equipos_utilizados_bancorod);
        $this->equipos_utilizados_cronometro = Tools::noHtml($this->equipos_utilizados_cronometro);
        $this->equipos_utilizados_equipcalibrado = Tools::noHtml($this->equipos_utilizados_equipcalibrado);
        $this->equipos_utilizados_manometro = Tools::noHtml($this->equipos_utilizados_manometro);
        $this->escultura_neumaticos = Tools::noHtml($this->escultura_neumaticos);
        $this->marca_neumaticos = Tools::noHtml($this->marca_neumaticos);
        $this->num_homologacion_sensor = Tools::noHtml($this->num_homologacion_sensor);
        $this->num_serie_placa = Tools::noHtml($this->num_serie_placa);
        $this->num_serie_sensor_mov = Tools::noHtml($this->num_serie_sensor_mov);
        $this->numserie_precintos_instalados = Tools::noHtml($this->numserie_precintos_instalados);
        $this->resultado_global_causa = Tools::noHtml($this->resultado_global_causa);
        $this->text_alternativo_placainstalacion = Tools::noHtml($this->text_alternativo_placainstalacion);
        return parent::test();
    }}
