<?php
require_once __DIR__ . '/config.php';

$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();
$query="SELECT ID FROM PLAYERS ORDER BY id DESC LIMIT 1;";
$stmt = $oConni->prepare($query);
$stmt->execute();

$lastId = $stmt->fetch(PDO::FETCH_ASSOC);
echo($lastId["ID"]+1);
