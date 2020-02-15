
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
                    <a onclick="" id="1" class="menuBtn active">Something Went Wrong</a>
                </div>
            </div>
            <div class="contentViewer">
                <div class="editor">
                    <div class="editContainerSmall"><div class="editName">Title: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Runtime: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Size: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerLarge"><div class="editName">Description: </div><textarea class="editTextLarge">A big boi with a big hat did some things i think</textarea></div>
                    <div class="editContainerSmall"><div class="editName">Genres: </div><input class="editTextSmall" value="Action, Comedy, Family" /></div>
                    <div class="editContainerSmall"><div class="editName">File Location: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">File Name: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Keywords: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Magnet Link: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Image Location: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">IMDB Link: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Ratio: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Framerate: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Date Added: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Resolution: </div><input class="editTextSmall" value="Gone with the wind" /></div>
                    <div class="editContainerSmall"><div class="editName">Searchable: </div><input type="checkbox" class="editCheckbox" /></div>
                    <div class="editContainerSmall"><div class="editName">Episodic: </div><input type="checkbox" class="editCheckbox" /></div>
                    <div class="editContainerSmall"><div class="editName">Locally Stored: </div><input type="checkbox" class="editCheckbox" /></div>
                </div>
            </div>
        </div>

        <div class="mediaContent">

        </div>
    </body>
</html>
