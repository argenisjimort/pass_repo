<?php
include 'connection.php';

$username = $_POST['username'];
$password = $_POST['password'];

//$query_u = "SELECT * FROM {$tableName} WHERE username='$username' AND password='$hashedPassword' ";
$query_u = "SELECT * FROM {$tableName} WHERE username='$username' ";



$results_u = mysqli_query( $conn, $query_u );
if( mysqli_num_rows($results_u) == 1 ) {
    $info = mysqli_fetch_array( $results_u );
    $hash = $info['password'];

    if ( password_verify( $password, $hash  ) ) {
        echo "logged successfully";
    } else {
        echo "login error" .mysqli_error($conn);
    }
} else {
    echo "login error";
}

?>