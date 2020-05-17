<?php
require_once __DIR__ . '/config.php';
require_once __DIR__.'/oConexionPDO.class.php';

$postdata = json_decode(file_get_contents("php://input"));

$oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
$oConni = $oConexion->obtenerConexion();

$stmt = $oConni->prepare("INSERT INTO JUGADORES (ID, `Nombre completo`, `Fecha de nacimiento`,".
"Edad, `Lugar de nacimiento`, `País de nacimiento`, Demarcación, Foto) ".
"VALUES(?,?,?,?,?,?,?,?);");

$stmt->execute($postdata->id,$postdata->NombreCompleto,$postdata->FechaDeNacimiento,$postdata->edad,$postdata->lugarDeNacimiento,$postdata->paisDeNacimiento,$postdata->Demarcacion,$postdata->foto);

