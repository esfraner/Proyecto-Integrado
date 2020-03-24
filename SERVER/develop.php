<?php
require_once __DIR__ . "/scrapping.class.php";

$scrapping = new Scrapping();
$players = json_decode((file_get_contents('players.json')));
foreach ($players as $playerJSON) {
    if ($playerJSON->t2 > 2000) {
        $player = $scrapping->getPlayer($playerJSON->c);
        $scrapping->insertPlayer($player);
    }
}
