<?php
require_once __DIR__ . "/scrapping.class.php";

$scrapping = new Scrapping();
$teams = json_decode(file_get_contents("teams.json"));
foreach ($teams as $team) {
    foreach (json_decode((file_get_contents($team->path))) as $playerJSON) {
        if ($playerJSON->t2 > 2000) {
            $player = $scrapping->getPlayer($playerJSON->c);
            $scrapping->insertPlayer($player, $team->name);
        }
    }
}
