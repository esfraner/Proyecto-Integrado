<?php
require_once __DIR__ . '/config.php';

$oConexion = new oConexion(HOST, BD, USER, PASS );
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmt = $oConni->prepare('SELECT COUNT(*) AS TOTAL FROM JUGADORES');
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($total);
if ($stmt->fetch()) {
   $result=$total;
}
echo json_encode($result);
//header('Content-Type: application/json');
$stmt->close();
