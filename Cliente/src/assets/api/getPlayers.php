<?php
require_once __DIR__ . '/config.php';

$oConexion = new oConexion(HOST, BD, USER, PASS );
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmt = $oConni->prepare('SELECT * FROM JUGADORES limit 10');
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $name, $birthday, $age, $birthPlace, $birthCountry, $position, $photo);
while ($stmt->fetch()) {
    $result[] = ["id" => $id, "nombreCompleto" => $name, "fechaNacimiento" => $birthday,
    "edad" => $age, "lugarNacimiento" => $birthPlace, "paisNacimiento" => $birthCountry,
    "demarcacion" => $position, "foto" => $photo];
}
echo json_encode($result);
//header('Content-Type: application/json');
$stmt->close();
