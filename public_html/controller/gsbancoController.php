<?php

Class gsbanco {

    static $_instance;

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
   public function key_implode($array, $glue) {
    $result = "";
    foreach ($array as $key => $value) {
        $result .=  $value . $glue;
    }
   
    return trim($result, ',');
}
    
    public function gsbancoGetMovimientoController($campos,$condicion) {
        $db = new \PDOWrapper\DB;
        
        $campos_string=$this->key_implode($campos,',');
        //var_dump($condicion);
        //exit;
        $db->bind("cuenta_id",$condicion);
        
        return($cuentasInactivas = $db->query("SELECT $campos_string FROM movimiento where cuenta_id= :cuenta_id"));
        
       
      
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
        
        $insert   =  $db->query("INSERT INTO movimiento(monto,tipo_movimiento,fecha_movimiento,descripcion,cuenta_id) VALUES(:monto,:tipo_movimiento,:fecha_movimiento,:descripcion,:cuenta_id)", array("monto"=>$campos["monto"],"tipo_movimiento"=>$campos["tipo_movimiento"],"fecha_movimiento"=>$campos["fecha_movimiento"],"descripcion"=>$campos["descripcion"],"cuenta_id"=>$campos["cuenta_id"]));
       if($insert > 0 ) {
        /// se llama al ultimo movimiento ingresado para esta cuenta
           $db->bind("cuenta_id",$campos['cuenta_id']);
           return($ultimoMovimiento = $db->query("SELECT * FROM movimiento where cuenta_id= :cuenta_id order by id desc limit 1"));
           
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

    public function revisarController($idventa) {
        $bd = Db::getInstance();
        $tabla = 'venta';
        $where = 'WHERE identificadorVenta=' . $idventa . ' order by id desc';
        $limit = ' limit 1';
        //var_dump($array);
        $sql = $bd->consultar($tabla, $limit, $where);
        //var_dump($sql);
        $stmt = $bd->ejecutar($sql);
        $cantidad = mysqli_num_rows($stmt);
        if ($cantidad > 0) {
            $resultado = mysqli_fetch_array($stmt);
            if ($resultado['statusVenta'] == 0)
                $result['resultado'] = 'No procesada';
            else
                $result['resultado'] = 'Venta Procesada';
        }else {
            $result['resultado'] = 'No hay venta con identificador';
        }


        //var_dump($resultado['statusVenta']);
        return $result;
    }

    public function enviarcorreo($array) {
        // require '../vendor/autoload.php';
        //error_reporting(E_ALL);
        error_reporting(E_STRICT);

        date_default_timezone_set('America/Caracas');

        require_once('PHPMailer/class.phpmailer.php');
        //include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

        $mail = new PHPMailer();
        
        ///Cambiar URL base par tomar arhivos para armar el envio de documento.
        $urlBase='http://tutibiacoin.com/test/';

        $body = file_get_contents($urlBase.'head.html');

        $body = $body . file_get_contents($urlBase.'headcontenido.html');
        $body = $body . 'Estimado: ' . $array['nombre'] . '<br />';
        $body = $body . 'Su venta por: ' . $array['cantidad'] . ' Coins Sera atendida a la Brevedad' . '<br />';
        $body = $body . 'Nombre Chart: ' . $array['nameChart'] . '<br />';
        $body = $body . 'Pago: ' . $array['cantidadPago'] . ' BsF' . '<br />';
        $body = $body . 'Identificador de la compra: ' . $array['identificadorVenta'] . ' Con el podra revisar el status de su transferencia' . '<br />';
        $body = $body . file_get_contents($urlBase.'footercontenido.html');
        $body = $body . file_get_contents($urlBase.'footer.html');
        //$body             = preg_replace('/[\]/','',$body);
        $email->From = "venta@tutibiacoin.com";
        $email->FromName = "Ventas Team";
        
        $mail->IsSMTP(); // telling the class to use SMTP
        //$mail->Host = "mx1.hostinger.es"; // SMTP server
        $mail->SMTPAuth = true;
        //$mail->SMTPSecure = "ssl";
        $mail->SMTPDebug = 2;
        $mail->SMTPAuth = true;                  // enable SMTP authentication
        $mail->Host = "ssl://mx1.hostinger.es"; // sets the SMTP server
        $mail->Port =465;                    // set the SMTP port for the GMAIL server
        $mail->Username = "venta@tutibiacoin.com"; // SMTP account username
        $mail->Password = "02128630183";        // SMTP account password

        $mail->AddAddress($array['email'], $array['nombre']);
        $mail->AddAddress('rack.stick@gmail.com','Atiende la Venta malparido');
//$mail->AddReplyTo("name@yourdomain.com","First Last");

        $mail->Subject = "TuTibiaCoin | Venta de Coin Satisfactoria";

        $mail->AltBody = "TuTibiaCoin | Venta de Coin Satisfactoria"; // optional, comment out and test

        $mail->MsgHTML($body);

//$address = "whoto@otherdomain.com";
        $mail->AddAddress($array['email'], $array['nombre']);

        $mail->IsHTML(true);
        $mail->Body = $body;
//$mail->AddAttachment("PHPMailer/test-script/images/phpmailer.gif");      // attachment
//$mail->AddAttachment("PHPMailer/test-script/images/bkgrnd.gif"); // attachment

        
        /////Activar esto para poder ver los errores
        if (!$mail->Send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
            echo "Message sent!";
        }
    }
     public function enviarcorreo1($array) {
        // require '../vendor/autoload.php';
        //error_reporting(E_ALL);
        error_reporting(E_STRICT);

        date_default_timezone_set('America/Caracas');

        require_once('PHPMailer/class.phpmailer.php');
        //include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

        $mail = new PHPMailer();
        
        ///Cambiar URL base par tomar arhivos para armar el envio de documento.
        $urlBase='http://tutibiacoin.com/test/';

        $body = file_get_contents($urlBase.'head.html');

        $body = $body . file_get_contents($urlBase.'headcontenido.html');
        $body = $body . 'Estimado: ' . $array['nombre'] . '<br />';
        $body = $body . 'Su venta por: ' . $array['cantidad'] . ' Coins Sera atendida a la Brevedad' . '<br />';
        $body = $body . 'Nombre Chart: ' . $array['nameChart'] . '<br />';
        $body = $body . 'Pago: ' . $array['cantidadPago'] . ' BsF' . '<br />';
        $body = $body . 'Identificador de la compra: ' . $array['identificadorVenta'] . ' Con el podra revisar el status de su transferencia' . '<br />';
        $body = $body . file_get_contents($urlBase.'footercontenido.html');
        $body = $body . file_get_contents($urlBase.'footer.html');
        //$body             = preg_replace('/[\]/','',$body);

        $mail->IsSMTP(); // telling the class to use SMTP
        //$mail->Host = "ssl://smtp.gmail.com"; // SMTP server
        $mail->SMTPDebug =false;                     // enables SMTP debug information (for testing)
        // 1 = errors and messages
        // 2 = messages only
        $mail->SMTPAuth = true;                  // enable SMTP authentication
        $mail->Host = "ssl://smtp.gmail.com"; // sets the SMTP server
        $mail->Port = 465;                    // set the SMTP port for the GMAIL server
        $mail->Username = "tutibiacoin@gmail.com"; // SMTP account username
        $mail->Password = "tutibiacoin_863";        // SMTP account password
        //$mail->From     = 'venta@tutibiacoin.com'; 
        //$mail->FromName = "tutibiacoin.com"; 
        $mail->AddReplyTo("venta@tutibiacoin.com","tutibiacoin.com"); 
        //$mail->WordWrap = 50;  
        $email->From = "venta@tutibiacoin.com";
        $email->FromName = "Ventas Team TutibiaCoin" ;

        //$mail->AddReplyTo("name@yourdomain.com","First Last");

        $mail->Subject = "TuTibiaCoin | Venta de Coin Satisfactoria";

        $mail->AltBody = "TuTibiaCoin | Venta de Coin Satisfactoria"; // optional, comment out and test

        $mail->MsgHTML($body);

//$address = "whoto@otherdomain.com";
        // $mail->AddAddress($array['email'], $array['nombre'],'rack.stick@gmail.com','Atiende la Venta malparido');
        $mail->AddAddress($array['email'], $array['nombre']);
        $mail->AddAddress('rack.stick@gmail.com','Atiende la Venta malparido');
        //$mail->AddAddress('tutibiacoin@gmail.com',$array['nameChart']);
        $mail->IsHTML(true);
        $mail->Body = $body;
//$mail->AddAttachment("PHPMailer/test-script/images/phpmailer.gif");      // attachment
//$mail->AddAttachment("PHPMailer/test-script/images/bkgrnd.gif"); // attachment

        
//        /////Activar esto para poder ver los errores
        
        if (!$mail->Send()) {
           // echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
            //echo "Message sent!";
        }
    }

}