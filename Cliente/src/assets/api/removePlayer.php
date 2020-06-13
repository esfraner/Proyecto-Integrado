<?php
require_once __DIR__ . '/config.php';

$idPlayerToRemove=$_GET['idPlayer'];
$oConexion = new oConexion(HOST, BD, USER, PASS);
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();

if ($oConni->query("DELETE FROM PLAYERS WHERE ID=$idPlayerToRemove")) {
  echo(true);
} else {
  echo(false);
}
