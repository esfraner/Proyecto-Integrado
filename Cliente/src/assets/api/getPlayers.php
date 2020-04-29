<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);
require_once __DIR__ . '/oConexion.class.php';

$oConexion = new oConexion('franer.team', 'PI', 'remoto', 'malagaserade2Bproximamente');
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmt = $oConni->prepare('SELECT * FROM JUGADORES');
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $name, $birthday, $age, $birthPlace, $birthCountry, $position, $photo);
while ($stmt->fetch()) {
    $result[] = ["id" => $id, "nombreCompleto" => $name, "fechaNacimiento" => $birthday, "edad" => $age, "lugarNacimiento" => $birthPlace, "paisNacimiento" => $birthPlace, "demarcacion" => $position, "foto" => $photo];
}
echo json_encode($result);
header('Content-Type: application/json');
$stmt->close();
