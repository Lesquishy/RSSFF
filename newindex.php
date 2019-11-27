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
      <script type="text/javascript" src="./newjs2/var.js"></script>
      <script type="text/javascript" src="./newjs2/main.js"></script>
      <script type="text/javascript" src="./newjs2/extract.js"></script>
      <script type="text/javascript" src="./newjs2/setup.js"></script>
      <script type="text/javascript" src="./newjs2/display.js"></script>

      <title>RSSFF</title> <!-- RSS Feed Filter -->
    </head>

    <body>
        <!-- Contains the navbar-->
        <div class="navContainer">
            <img src="./images/logo.png" class="navLogo"/>
            <div class="linkContainer">
                <a href="#home" id="home" onclick="changeActive(this.id)" class="navBtn">Home</a>
                <a href="#browse" id="browse" onclick="changeActive(this.id)" class="navBtn">Browse</a>
                <a href="#upcoming" id="upcoming" onclick="changeActive(this.id)" class="navBtn">Coming Soon!</a>
            </div>

            <div class="searchBox">
                <input class="searchInput" type="text" placeholder="Search here..." name="search">
                <button class="searchBtn" onclick="searchLoad();"><i class="material-icons md-36">search</i></button>
            </div>
        </div>

        <div class="viewport">
            <div class="loading2"><img src="./images/loading.svg"></div>
            <div class="resultsContainer">

            </div>


        </div>


        <a class="testBtn" onclick="test()">Test</a>
    </body>
</html>
