<?php
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);
require_once __DIR__ . "/curl.class.php";
$curl = new Curl();

$teams = json_decode(file_get_contents("teams.json"));
foreach ($teams as $team) {
    $baseUrl = "https://www.bdfutbol.com/es/e/elig$team->id.html";
    $contents = $curl->doCurl($baseUrl);
    file_put_contents("teamsHtmls/$team->name.html", $contents);
}
echo("Htmls creados");