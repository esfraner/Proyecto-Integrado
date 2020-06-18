<?php
require_once __DIR__ . '/config.php';

$team = $_GET['teamName'];

$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();
$query = "SELECT ID as id, `Nombre completo` as nombreCompleto," . "
`Fecha de nacimiento` as fechaNacimiento, Edad as edad, `Lugar de nacimiento` as lugarNacimiento, `País de nacimiento` as paisNacimiento," . "
Demarcación as demarcacion, Foto as foto, Equipo as equipo FROM PLAYERS WHERE Equipo=?";

$stmt = $oConni->prepare($query);
$stmt->execute([$team]);

$players = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($players));

