<?php
require_once __DIR__ . '/config.php';

$team=$_GET['teamName'];

$oConexion = new oConexion(HOST, BD, USER, PASS);
$oConexion->abrir();
$oConni = $oConexion->obtenerConexion();
$stmt = $oConni->prepare("SELECT * FROM PLAYERS WHERE Equipo='$team'");
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $name, $birthday, $age, $birthPlace, $birthCountry, $position, $photo,$Equipo);
while ($stmt->fetch()) {
  $result[] = ["id" => $id, "nombreCompleto" => $name, "fechaNacimiento" => $birthday, "edad" => $age, "lugarNacimiento" => $birthPlace, "paisNacimiento" => $birthCountry, "demarcacion" => $position, "foto" => $photo];
}
echo json_encode($result);
$stmt->close();


