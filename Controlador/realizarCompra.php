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

$pelicula = $_POST['pelicula'];
$cantidadEntradas = $_POST['cantidadEntradas'];
$cine = $_POST['cine'];
$precioTotal = $_POST['precioTotal'];

$sql = "INSERT INTO compras (pelicula, cantidad_entradas, cine, precio_total) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

$stmt->bind_param("sisi", $pelicula, $cantidadEntradas, $cine, $precioTotal);

if ($stmt->execute()) {
    echo "Compra registrada en la base de datos.";
} else {
    echo "Error al registrar la compra en la base de datos: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>