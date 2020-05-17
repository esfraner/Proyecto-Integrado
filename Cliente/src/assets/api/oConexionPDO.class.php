<?php declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', 'on');

class oConexionPDO
{
    private static $baseDsn = "mysql:dbname=%baseDatos%;host=%servidor%";

    private $servidor;
    private $baseDatos;
    private $usuario;
    private $clave;
    private $conexion;

    public function __construct($datos)
    {
        $this->servidor = $datos["servidor"];
        $this->baseDatos = $datos["baseDatos"];
        $this->usuario = $datos["usuario"];
        $this->clave = $datos["clave"];
    }

    private function abrirConexion()
    {
        $dsn = str_replace("%servidor%", $this->servidor, self::$baseDsn);
        $dsn = str_replace("%baseDatos%", $this->baseDatos, $dsn);

        $this->conexion = new PDO($dsn, $this->usuario, $this->clave, [PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8']);
    }

    public function obtenerConexion(): PDO
    {
        if (!$this->conexion) $this->abrirConexion();
        return $this->conexion;
    }
}
