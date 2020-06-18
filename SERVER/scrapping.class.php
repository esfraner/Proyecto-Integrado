<?php
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/oConexionPDO.class.php";

class Scrapping {
    private $oConnPDO;
    private $oConexion; //La clase oConexion esta modificada para utilizar PDOs
    private $stmt;

    public function __construct() {
        $this->oConexion = new oConexionPDO(["servidor" => HOST, "baseDatos" => BD, "usuario" => USER, "clave" => PASS]);
        $this->oConnPDO = $this->oConexion->obtenerConexion();

        $sql = "INSERT INTO PLAYERS (`Nombre completo`, `Fecha de nacimiento`, Edad, `Lugar de nacimiento`, `País de nacimiento`, Demarcación, Foto, Equipo) VALUES (?,?,?,?,?,?,?,?);";
        $this->stmt = $this->oConnPDO->prepare($sql);
    }

    private function curl($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept-Language: es-es,en"));
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }

    public function getPlayer($id) {
        $url = "https://www.bdfutbol.com/es/j/j$id.html";
        $resultHtml = $this->curl($url);
        $playerData = $this->createPlayerArray($resultHtml);

        return $playerData;
    }

    private function createPlayerArray($resultHtml) {
        $playerData = $this->getPlayerInformation($resultHtml);
        $playerImage = $this->getPlayerImage($resultHtml);
        $playerData["Edad"] = $this->calculateAge($playerData["Fecha de nacimiento"]);
        $playerData["Nombre completo"] = trim($playerData['Nombre completo']);
        $playerData["Foto"] = $playerImage;

        return $playerData;
    }

    private function getPlayerInformation($resultHtml) {
        //Seleccionamos solamente la parte del html que queremos
        preg_match_all("( <div class=\"ml-md-auto w-100 pl-2 pl-md-3 pr-0 pb-0 pt-0 taula-dades pt-2 pb-2\">
            <div class=\"container\">(.*)</div></div></div>)siU", $resultHtml, $xmlResult);

        $doc = new DOMDocument();
        $doc->loadHTML(serialize($xmlResult[0]));
        $xpath = new DOMXPath($doc);

        $dataKeys = $xpath->query("//div[@class='container']/div[position()<5]//div[@class='col-dada col col-md-3 text-gris pl-2 pr-2'] | //div[@class='container']/div[last()]//div[@class='col-dada col col-md-3 text-gris pl-2 pr-2']");
        $dataValues = $xpath->query("//div[@class='container']/div[position() <3]//div[@class=\"col-dada col col-md-9 pl-2 pr-2\"]|//div[@class='container']/div[position()=3]//div[@class=\"col-dada col col-md-9 pl-2 pr-2\"]/a[1]|//div[@class='container']/div[position()=4]//div[@class=\"col-dada col col-md-9 pl-2 pr-2\"]/a[1]|//div[@class='container']/div[last()]//div[@class=\"col-dada col col-md-9 pl-2 pr-2\"]//div[@class='float-left']");
        $playerDatas = $this->generateArrayPlayer($dataKeys, $dataValues);

        return $playerDatas;
    }

    private function generateArrayPlayer($dataKeys, $dataValues) {
        foreach ($dataKeys as $punto) {//quitamos el último carácter que son dobles puntos ':'
            $keys[] = substr_replace(utf8_decode(($punto->nodeValue)), "", -1);
        }

        foreach ($dataValues as $value) {
            $values[] = utf8_decode(($value->nodeValue));
        }

        $values[1] = explode(',', $values[1])[0]; //obtenemos la fecha
        //creamos un array associativo donde los valores del $dataKeys seran las keys y los valores $datasValues
        foreach ($keys as $index => $val) {
            $arrayplayer[$val] = $values[$index];
        }

        return ($arrayplayer);
    }

    private function calculateAge($date) {
        $dateX = new DateTime();
        $dateY = DateTime::createFromFormat("d/m/Y", $date);

        return $dateX->diff($dateY)->format("%Y");
    }

    private function getPlayerImage($html) {
        preg_match_all("(<div class=\"position-relative\" id=\"fotoimg\">(.*)</div>)siU", $html, $xmlResult);
        $doc = new DOMDocument();
        $doc->loadHTML(serialize($xmlResult[0]));
        $xpath = new DOMXPath($doc);
        $urlImage = $xpath->query("//div[@id]/img/@src")->item(0);
        $imgText = $urlImage->nodeValue;
        $imgFix = explode('../../', $imgText)[1];

        return base64_encode(file_get_contents("https://www.bdfutbol.com/" . $imgFix));
    }

    public function insertPlayer($player,$teamName) {
        $this->stmt->execute([$player['Nombre completo'], $player['Fecha de nacimiento'], $player['Edad'], $player['Lugar de nacimiento'], $player['País de nacimiento'], $player['Demarcación'], $player['Foto'],$teamName]);
    }

}
