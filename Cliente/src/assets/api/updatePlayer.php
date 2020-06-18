<?php
require_once __DIR__ . '/config.php';

$postdata = json_decode(file_get_contents("php://input"));

$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();
$query = ("UPDATE PLAYERS SET `Nombre completo`=?, `Fecha de nacimiento`=?, Edad=?,`Lugar de nacimiento`=?, `País de nacimiento`=?, Demarcación=?, Foto=?, Equipo=? WHERE ID=?;");
$stmt = $oConni->prepare($query);
$response = false;

if ($stmt->execute([$postdata->nombreCompleto, $postdata->fechaNacimiento, $postdata->edad, $postdata->lugarNacimiento, $postdata->paisNacimiento, $postdata->demarcacion, $postdata->foto, $postdata->equipo, $postdata->id])) {
  $response = true;
}
echo($response);



