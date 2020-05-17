<?php
require_once __DIR__ . '/config.php';
$postData = json_decode(file_get_contents("php://input"));
$idToRemove=$postData->id;

$oConexion = new oConexion(HOST, BD, USER, PASS );
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
echo($idToRemove);
if($oConni->query("DELETE FROM JUGADORES WHERE ID=$idToRemove")){
    echo(true);
}
else{
    echo(false);
}
