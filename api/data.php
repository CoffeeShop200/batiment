<?php
header("Access-Control-Allow-Origin: *"); // Autorise JS à récupérer les données
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les valeurs envoyées par Arduino
    $temperature = isset($_POST['temperature']) ? $_POST['temperature'] : null;
    $humidite = isset($_POST['humidite']) ? $_POST['humidite'] : null;

    // Sauvegarde dans un fichier JSON (simule une base de données)
    $data = ["temperature" => $temperature, "humidite" => $humidite];
    file_put_contents("data.json", json_encode($data));

    echo json_encode(["message" => "Données enregistrées"]);
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Lire les dernières valeurs stockées
    if (file_exists("data.json")) {
        echo file_get_contents("data.json");
    } else {
        echo json_encode(["temperature" => null, "humidite" => null]);
    }
} else {
    echo json_encode(["message" => "Méthode non autorisée"]);
}
?>
