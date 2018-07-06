<?php

/* Clase encargada de gestionar las conexiones a la base de datos */

Class Db {

    private $servidor;
    private $usuario;
    private $password;
    private $base_datos;
    private $link;
    private $stmt;
    private $array;
    private $con;
    static $_instance;

    /* La función construct es privada para evitar que el objeto pueda ser creado mediante new */

    private function __construct() {
        /* Incluimos el fichero de la clase Conf */
        require_once 'Conf.class.php';
        $this->setConexion();
        $this->conectar();
    }

    /* Método para establecer los parámetros de la conexión */

    private function setConexion() {

        $conf = Conf::getInstance();
        $this->servidor = $conf->getHostDB();
        $this->base_datos = $conf->getDB();
        $this->usuario = $conf->getUserDB();
        $this->password = $conf->getPassDB();
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

    /* Realiza la conexión a la base de datos. */

    private function conectar() {
        try {
            $con = new PDO('mysql:host=' . $hostname . ';dbname=' . $database, $username, $password);
            print "Conexión exitosa!";
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "";
            die();
        }
        $con = null;
        
//        $this->link = mysqli_connect($this->servidor, $this->usuario, $this->password);
//        if (!$this->link) {
//            die("Database connection failed: " . mysqli_error());
//        }
//
//        $this->con = mysqli_select_db($this->link, $this->base_datos);
//        if (!$this->con) {
//            die("Database selection failed: " . mysqli_error());
//        }
//        @mysqli_query("SET NAMES 'utf8'");
//        //var_dump($this->con);
    }

    /* Método para ejecutar una sentencia sql */

    public function ejecutar($sql) {
        //var_dump($sql);
        $this->stmt = mysqli_query($this->link, $sql);
        //var_dump($this->stmt);
        return $this->stmt;
    }

    /* Método para obtener una fila de resultados de la sentencia sql */

    public function obtener_fila($stmt, $fila) {
        if ($fila == 0) {
            $this->array = mysqli_fetch_array($stmt);
        } else {
            mysqli_data_seek($stmt, $fila);
            $this->array = mysqli_fetch_array($stmt);
        }
        return $this->array;
    }

    //Devuelve el último id del insert introducido
    public function lastID() {
        return mysql_insert_id($this->link);
    }

    //Devuelve el query del insert armado para su ejecucion
    public function query_insert($table, $data) {
        $fields = $values = array();
        //$data=(count($row));

        foreach (array_keys($data) as $key) {
            //var_dump($data);
            $fields[] = "`$key`";
            $values[] = "'" . $data[$key] . "'";
        }
        $fields = implode(",", $fields);
        $values = implode(",", $values);

        $sql = "INSERT INTO $table ($fields) VALUES ($values)";


        return $sql;
    }

    public function consultar($tabla, $limit, $where) {
        if (!isset($limit))
            $limit = '';

        if (!isset($where))
            $where = '';

        $sql = "SELECT * from $tabla $where $limit";
        return $sql;
    }

    public function retornaconexion() {
        return $this->conectar();
    }

}
