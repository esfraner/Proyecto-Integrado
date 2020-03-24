<?php

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://www.bdfutbol.com/es/j/j1286.html');
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0');
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept-Language: es-es,en"));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

preg_match_all("( <div class=\"ml-md-auto w-100 pl-2 pl-md-3 pr-0 pb-0 pt-0 taula-dades pt-2 pb-2\">
            <div class=\"container\">(.*)</div></div></div>)siU", $result, $matches1);

$doc = new DOMDocument();
$doc->loadHTML(serialize($matches1[0]));
$xpath = new DOMXPath($doc);
$xml = $xpath->query("//div[@class='col-dada col col-md-3 text-gris pl-2 pr-2']/text()");
foreach ($xml as $punto) {
    print_r(substr_replace(utf8_decode(($punto->nodeValue)), "", -1));
    $keys[] = substr_replace(utf8_decode(($punto->nodeValue)), "", -1);
    echo "<br>";
}
$xml2 = $xpath->query("//div[@class=\"col-dada col col-md-9 pl-2 pr-2\"]|//div[3][@class=\"row\"]/div[2]/a[1]|/div/div[1]/div[4]/div[2]/a[1]|/div/div[1]/div[7]/div[2]/div[1]/div[1]/div[2]");
foreach ($xml2 as $punto2) {
    $datos[] = utf8_decode(($punto2->nodeValue));
}
unset($datos[3]);//Borramos un dato del array que no necesitamos
$datos = array_values($datos); //reordena el array
$datos[1] = explode(',', $datos[1])[0];
$datos[4] = explode(' ', $datos[4])[0];
$datos[5] = explode(' ', $datos[5])[0];
$datos[6] = substr_replace($datos[6], "", -3);
foreach ($keys as $index => $val) {
    $arrayRes[$val] = $datos[$index];
}
print_r($arrayRes);

/*Array (
[Nombre completo] => Joaquín Bornes Rincón
[Fecha de nacimiento] => 25/05/1975
[Lugar de nacimiento] => Los Palacios y Villafranca (Sevilla)
[País de nacimiento] => España
[Altura] => 1'88 [Peso] => 85
[Demarcación] => Central
)*/





