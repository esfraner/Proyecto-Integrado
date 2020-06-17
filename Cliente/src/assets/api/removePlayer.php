<?php
require_once __DIR__ . '/config.php';

$idPlayerToRemove=$_GET['idPlayer'];
$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();
$query="DELETE FROM PLAYERS WHERE ID=?";
$stmt = $oConni->prepare($query);
$response=false;

if($stmt->execute([$idPlayerToRemove])){
 $response=true;
}
echo($response);
