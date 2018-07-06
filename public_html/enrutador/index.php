<?php

 if( $_POST )
    {
        if( isset( $_POST['cl'] ) )
        {
            //var_dump($_POST['data']);
            
           
            require_once '../controller/'.$_POST['cl'].'Controller'.'.php';
            $metodo=$_POST['cr'].'Controller'; 
            $class=$_POST['cl']::getInstance1();  
            $métodos_clase = get_class_methods($class);       // o
            //var_dump($métodos_clase);
            //exit;
            
            $query=$class->$metodo($_POST['campos']);
            print_r(json_encode($query));
           // print_r($query);
//            if( isset($_POST['form']) )
//            echo json_encode($find->process($_POST['form']));
//        }            
    }
  }