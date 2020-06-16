<?php
require_once __DIR__ . '/config.php';

$oConexion = new oConexion(HOST, BD, USER, PASS);
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmt = $oConni->prepare('SELECT ID FROM PLAYERS ORDER BY id DESC LIMIT 1;');
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($maxId);
if ($stmt->fetch()) {
  echo ++$maxId;
}
$stmt->close();
