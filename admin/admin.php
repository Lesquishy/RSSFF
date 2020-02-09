
<?php
    if (isset($_COOKIE["logged-in"])) {
        //sweet
    }else {
        //not logged in
        header("Location: index.php");
    }
?>

<!DOCTYPE html>

<html>
    <head>
        <title>Admin Panel</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="admin.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/admin.css">
        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
        <script>

        </script>
    </head>

    <body>
        <nav class="nav">
            <a class="navLink"><span class="tooltiptext">Return to selection</span><i class="navIcon material-icons md-48">exit_to_app</i></a>
        </nav>
        <div class="selectionContent">

        </div>

        <div class="userContent">
            <div class="selectMenu">
                <input class="searchBox" name="movieSearch" placeholder="Search for a movie..." type="text"/>
                <div class="movieMenu">
                    <a class="menuBtn">Movie 1</a>
                    <a class="menuBtn">Movie 2</a>
                    <a class="menuBtn">Movie 3</a>
                    <a class="menuBtn">Movie 4</a>
                    <a class="menuBtn">Movie 5</a>
                    <a class="menuBtn">Movie 6</a>
                </div>
            </div>
            <div class="contentViewer">

            </div>
        </div>

        <div class="mediaContent">

        </div>
    </body>
</html>
