<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id21290903_root";
$password = "!Admin123";
$database = "id21290903_cine";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM cliente WHERE usuario = ? AND contra = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $usuario, $contrasena);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        echo "Autenticado";
    } else {
        echo "Credenciales incorrectas";
    }

    $stmt->close();
} else {
    echo "Acceso no autorizado";
}

$conn->close();
?>
