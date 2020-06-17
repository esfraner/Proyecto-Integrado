<?php
require_once __DIR__ . '/oConexionPDO.class.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);

define("HOST", "franer.team");
define("BD", "PLAYERS");
define("USER", "remoto");
define("PASS", "malagaserade2Bproximamente");
