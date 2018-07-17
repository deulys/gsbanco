<?php

Class gsbanco {

    static $_instance;
    public $campo=array();

    public function __construct() {
        /* Incluimos el fichero de la clase Db */
        require("../conf/Db.class.php");
        
    }

    private function __clone() {
        
    }

    public function gsbancoGetCuentasController() {
        $db = new \PDOWrapper\DB;
        $db->bindMore(array("activa"=>"0"));
        return($cuentasInactivas = $db->query("SELECT id,numero FROM cuentas where activa= :activa"));
        
       
      
        ///////Envio de mail
//        if($stmt==true){
//        $resultado=array("mensaje"=>'mensaje',"tipo_mensaje"=>4,"mensaje_pantalla"=>"Su Pago Sera Realizado a la Brevedad","tiempo"=>4000);
//            $this->enviarcorreo1($array);
//            return $resultado;
//            
//        }else{
//            $resultado=array("mensaje"=>'mensaje',"tipo_mensaje"=>3,"mensaje_pantalla"=>"Ha Ocurrido un Error Intente cargar su Venta Nuevamente","tiempo"=>4000);
//            return $resultado;
//        }
        
        //$this->enviarcorreo1($array);
    }
    
    public function gsbancoUpdateCuentaController($campo) {
        $this->campo=$campo;
        //var_dump($this->campo);
        $db = new \PDOWrapper\DB;
        
        ($db->bindMore(array("idcuenta"=>$this->campo['cuenta_id'])));
        $estado_conciliacion = $db->query("SELECT * FROM conciliacion where idcuenta= :idcuenta");
        
        $update   =  $db->query("UPDATE cuentas SET activa = :activa,saldoinicialint=:monto_libro,saldoinicialext=:monto_banco WHERE id = :idcuenta", array("activa"=>"1","monto_libro"=>$this->campo['monto_libro'],"monto_banco"=>$this->campo['monto_banco'],"idcuenta"=>$this->campo['cuenta_id']));
        
        
        //////comprueba que exista la conciliacion si no existe la inserta y le cambia estado a cerrada
        
        $estado_conciliacion=count($db->query("SELECT id FROM conciliacion where idcuenta= :idcuenta"));
      
        var_dump($campo);
        if ($estado_conciliacion>0){
            $db1 = new \PDOWrapper\DB;
            var_dump($this->campo);
            ($db1->bindMore(array("idcuenta"=>$this->campo['cuenta_id'])));
            $update   =  $db1->query("UPDATE conciliacion SET idestado = :idestado WHERE idcuenta = :idcuenta", array("idestado"=>"3","idcuenta"=>$this->campo['cuenta_id']));
            
        }else{
            $db1 = new \PDOWrapper\DB;
            ($db1->bindMore(array("idcuenta"=>$this->campo['cuenta_id'])));
            $insert   =  $db1->query("INSERT INTO conciliacion (idcuenta,idestado) VALUES(:idcuenta,:idestado)", array("idcuenta"=>$this->campos["cuenta_id"],"idestado"=>'3'));
        }
       
        //se vuelve a verificar que exista la concilion para actualiza el estatus de la cuenta       
       
        if($update > 0 ) {
            //return 'Succesfully created a new person !';
        }
        
       
      
        ///////Envio de mail
//        if($stmt==true){
//        $resultado=array("mensaje"=>'mensaje',"tipo_mensaje"=>4,"mensaje_pantalla"=>"Su Pago Sera Realizado a la Brevedad","tiempo"=>4000);
//            $this->enviarcorreo1($array);
//            return $resultado;
//            
//        }else{
//            $resultado=array("mensaje"=>'mensaje',"tipo_mensaje"=>3,"mensaje_pantalla"=>"Ha Ocurrido un Error Intente cargar su Venta Nuevamente","tiempo"=>4000);
//            return $resultado;
//        }
        
        //$this->enviarcorreo1($array);
    }
    
   public function key_implode($array, $glue) {
    $result = "";
    foreach ($array as $key => $value) {
        $result .=  $value . $glue;
    }
   
    return trim($result, ',');
}
    
    public function gsbancoGetMovimientoController($campos,$condicion) {
        var_dump($campo);
        $db = new \PDOWrapper\DB;
        
        $campos_string=$this->key_implode($campos,',');
        //var_dump($condicion);
        //exit;
        $db->bind("cuenta_id",$condicion);
        
        return($cuentasInactivas = $db->query("SELECT $campos_string FROM movint where cuenta_id= :cuenta_id"));
        
       
      
        ///////Envio de mail
//        if($stmt==true){
//        $resultado=array("mensaje"=>'mensaje',"tipo_mensaje"=>4,"mensaje_pantalla"=>"Su Pago Sera Realizado a la Brevedad","tiempo"=>4000);
//            $this->enviarcorreo1($array);
//            return $resultado;
//            
//        }else{
//            $resultado=array("mensaje"=>'mensaje',"tipo_mensaje"=>3,"mensaje_pantalla"=>"Ha Ocurrido un Error Intente cargar su Venta Nuevamente","tiempo"=>4000);
//            return $resultado;
//        }
        
        //$this->enviarcorreo1($array);
    }
    
 

    public function guardarMovimientoController($campos) {
        
        $db = new \PDOWrapper\DB;
        
        $insert   =  $db->query("INSERT INTO movint(monto,fecha,descripcion,idcuenta) VALUES(:monto,:fecha_movimiento,:descripcion,:cuenta_id)", array("monto"=>$campos["monto"],"fecha_movimiento"=>$campos["fecha_movimiento"],"descripcion"=>$campos["descripcion"],"cuenta_id"=>$campos["cuenta_id"]));
       if($insert > 0 ) {
        /// se llama al ultimo movimiento ingresado para esta cuenta
           $db->bind("cuenta_id",$campos['cuenta_id']);
           return($ultimoMovimiento = $db->query("SELECT * FROM movint where idcuenta= :cuenta_id order by id desc limit 1"));
           
      }
      else{
          $resultado=array("tipo_mensaje"=>3,"mensaje_pantalla"=>"Ha Ocurrido un Error Intente cargar el movimiento Nuevamente","tiempo"=>4000);
          return $resultado;
      }
        //$métodos_clase = get_class_methods($bd);       // o
        
        //return $resultado;
    }

    public static function getInstance1() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    
    
}