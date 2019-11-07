<!--
    This is the index.php page for the admin panel.
    Users will have to login here, where they will be redirected to the 'secure' admin.php page where the
    admin section will actually take place.
-->

<?php
    //if (isset($_COOKIE["logged-in"])) {
    //    header("Location: admin.php");
    //}
?>

<!DOCTYPE html>

<html>
    <head>
        <title>Admin Login</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/admin.css">
        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
        <script>

        </script>
    </head>

    <body>
        <div class="mainContent">
            <form action="index.php" method="POST" class="loginForm">
                <div class="loginContainer">
                    <div class="loginMsg">
                        <strong>Please Login Here.</strong>
                    </div>
                    <br/>
                    <input class="loginInput" name="username" placeholder="Username" type="text"/>
                    <input class="loginInput" name="password" placeholder="Password" type="password"/>
                    <input class="loginSubmit" type="submit" value="Login">
                    <div class="errorMsg">
                        <?php
                            if($_SERVER["REQUEST_METHOD"] == "POST") {
                                $username = $_POST['username'];
                                $password = $_POST['password'];

                                if ($username == "admin" && $password == "1234") {
                                    setcookie("logged-in", 1, time()+60*60);
                                    header("Location: admin.php");
                                }else {
                                    echo "Incorrect login, please try again";
                                }
                            }
                        ?>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>
