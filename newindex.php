<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="./css/global.css">
      <link rel="stylesheet" href="./css/rss.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
      <script type="text/javascript" src="./js/jquery-3.4.1.min.js"></script>
      <script type="text/javascript" src="./newjs/main.js"></script>
      <script type="text/javascript" src="./newjs/extract.js"></script>
      <script type="text/javascript" src="./newjs/setup.js"></script>
      <script type="text/javascript" src="./newjs/var.js"></script>
      <title>RSSFF</title> <!-- RSS Feed Filter -->
    </head>

    <body>
        <!-- Contains the navbar-->
        <div class="navContainer">
            <img src="./images/logo.png" class="navLogo"/>
            <div class="linkContainer">
                <a id="Home" onclick="changeActive(this.id)" class="navBtn">Home</a>
                <a id="Local" onclick="changeActive(this.id)" class="navBtn">Browse</a>
                <a id="YTS" onclick="changeActive(this.id)" class="navBtn">YTS</a>
                <a id="RSS" onclick="changeActive(this.id)" class="navBtn">Upcoming</a>
            </div>

            <!--Test Btn -->
            <a class="testBtn" onclick="test()">Test</a>

            <div class="searchBox">
                <input class="searchInput" type="text" placeholder="Search here..." name="search">
                <button class="searchBtn" onclick="startSearch();"><i class="material-icons md-36">search</i></button>
            </div>
        </div>

        <div class="viewport">



        </div>




    </body>
</html>
