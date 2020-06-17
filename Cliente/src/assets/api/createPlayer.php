<?php
require_once __DIR__ . '/config.php';

$postdata = json_decode(file_get_contents("php://input"));

$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();
$sql= "INSERT INTO PLAYERS (ID, `Nombre completo`, `Fecha de nacimiento`," . "Edad, `Lugar de nacimiento`, `País de nacimiento`, Demarcación, Foto, Equipo) " . "VALUES(?,?,?,?,?,?,?,?,?);";
$stmt = $oConni->prepare($sql);

$response=false;
if($stmt->execute([$postdata->id, $postdata->nombreCompleto, $postdata->fechaNacimiento,
$postdata->edad, $postdata->lugarNacimiento, $postdata->paisNacimiento,
$postdata->demarcacion, $postdata->foto, $postdata->equipo])){
  $response=true;
}
echo($response);

