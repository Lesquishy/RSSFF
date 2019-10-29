<?php
    //If there is information from POST
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];

        echo $username;
        echo $password;

        if ($username == "admin" && $password == "1234") {
            echo "worked";
            setcookie("logged-in", 1, time()+60*60);
            header("Location: admin.php");
        }else {
            echo "nah";
        }

    }
?>
