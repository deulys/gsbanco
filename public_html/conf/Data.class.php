<?php
Class Data {

    private $servidor;
    private $usuario;
    private $password;
    private $base_datos;   
    static $_instance;

    /* La función construct es privada para evitar que el objeto pueda ser creado mediante new */

    private function __construct() {
        /* Incluimos el fichero de la clase Conf */
        require_once 'Conf.class.php';
        $this->setConexion();
              
    }

    /* Método para establecer los parámetros de la conexión */

    private function setConexion() {

        $conf = Conf::getInstance();
        $this->servidor = $conf->getHostDB();
        $this->base_datos = $conf->getDB();
        $this->usuario = $conf->getUserDB();
        $this->password = $conf->getPassDB();
        return $sql_details = array(
            'user' => $this->usuario,
            'pass' => $this->password,
            'db'   => $this->base_datos,
            'host' => $this->servidor
        );
    }

    /* Evitamos el clonaje del objeto. Patrón Singleton */

    private function __clone() {
        
    }

    /* Función encargada de crear, si es necesario, el objeto. Esta es la función que debemos llamar desde fuera de la clase para instanciar el objeto, y así, poder utilizar sus métodos */

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
}