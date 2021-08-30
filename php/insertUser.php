<?php

include 'connection.php';




/*
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
*/
//$email = strtolower($_POST['email']);

$username = strtolower($_POST['username']);
$password = $_POST['password'];

$hashedPassword = password_hash( $password, PASSWORD_BCRYPT );

//ID(null), username, firstname, lastname, email, password.
//$query = "INSERT INTO basicinfo VALUES( 'null', '$username', '$firstName', '$lastName', '$email', '$password' )";
$query_u = "SELECT * FROM {$tableName} WHERE username='$username' ";
//$query_e = "SELECT * FROM {$tableName} WHERE email='$email' ";

$query = "INSERT INTO {$tableName} VALUES( 'null', '$username', '$hashedPassword' )";

$result_u = mysqli_query( $conn, $query_u );
//$result_e = mysqli_query( $conn, $query_e);

if( mysqli_num_rows($result_u) > 0 ) {
    echo "PHP: USERNAME ALREADY EXISTS";
} else {
    if( mysqli_query($conn, $query) ) {
        echo "PHP: User inserted into the database";
    } else {
        echo "PHP ERROR: "  .mysqli_error($conn);
    }
}

?>