<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/oConexionPDO.class.php';

$postdata = json_decode(file_get_contents("php://input"));

$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();

$stmt = $oConni->prepare("INSERT INTO JUGADORES (ID, `Nombre completo`, `Fecha de nacimiento`," . "Edad, `Lugar de nacimiento`, `País de nacimiento`, Demarcación, Foto) " . "VALUES(?,?,?,?,?,?,?,?);");

if($stmt->execute([$postdata->id, $postdata->nombreCompleto, $postdata->fechaNacimiento,
$postdata->edad, $postdata->lugarNacimiento, $postdata->paisNacimiento,
 $postdata->demarcacion, $postdata->foto])){
  echo(true);
}
else{
  echo(false);
}


