<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "db_cine";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}else{
    echo"conectado";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userMessage = $_POST['text'];
    $sql = "SELECT * FROM respuestas WHERE input = '$userMessage'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $cantidad = $row['cantidad'] + 1;
        $sql = "UPDATE respuestas SET cantidad = $cantidad WHERE input = '$userMessage'";
        if ($conn->query($sql) === TRUE) {
            echo "Respuesta actualizada en la base de datos.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        $sql = "INSERT INTO respuestas (input, cantidad) VALUES ('$userMessage', 1)";
        if ($conn->query($sql) === TRUE) {
            echo "Nueva respuesta almacenada en la base de datos.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    $conn->close();
}
?>
