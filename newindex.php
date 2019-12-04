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
      <script type="text/javascript" src="./newjs2/focus.js"></script>
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

            <img class="fire" src="./images/best.gif"/>

            <div class="searchBox">
                <input class="searchInput" type="text" placeholder="Search here..." name="search">
                <button class="searchBtn" onclick="searchLoad();"><i class="searchIcon material-icons md-36">search</i></button>
            </div>
        </div>

        <div class="viewport">
            <div class="resultsContainer">

            </div>


        </div>
        <div class="focusContainer">
            <div class="focus">
                <header class="header">Seven Deadly Sins</header>
                <article class="main">
                    <p class="focusRuntime">Length: 184mins</p>
                    <p class="focusSize">Size: 1854gb</p>
                    <p class="focusGenre">Genre: Romance, Action, Running</p>
                    <br>
                    <p class="focusDesc">Description <br> Testing some stuff</p>
                </article>
                <aside class="aside aside-1"><img class="focusImg" src="https://yts.lt/assets/images/movies/beta_test_2016/medium-cover.jpg" onerror="imgError(this, ' + l + ');" /></aside>
                <aside class="aside aside-2">
                    <div class='seasonNav'>
                    	<ul class="seasonUl">
                    		<!--<li onclick="changeSeason(this.id);" id="Season1" class='seriesBtn'><a>Season 1</a></li>-->
                    	</ul>
                    </div>
                    <div class='episodeNav'>
                        <ul class="episodeUl">
                    		<li class='seriesBtn'><a>Episode 1</a></li>
                    		<li class='seriesBtn'><a>Episode 2</a></li>
                            <li class='seriesBtn'><a>Episode 3</a></li>
                            <li class='seriesBtn'><a>Episode 4</a></li>
                            <li class='seriesBtn'><a>Episode 1</a></li>
                    		<li class='seriesBtn'><a>Episode 2</a></li>
                            <li class='seriesBtn'><a>Episode 3</a></li>
                            <li class='seriesBtn'><a>Episode 4</a></li>
                            <li class='seriesBtn'><a>Episode 1</a></li>
                    		<li class='seriesBtn'><a>Episode 2</a></li>
                            <li class='seriesBtn'><a>Episode 3</a></li>
                            <li class='seriesBtn'><a>Episode 4</a></li>
                    	</ul>
                    </div>
                </aside>
                <footer class="footer">Download Movie</footer>

                <div class="loading2"><img src="./images/loading.svg"/></div>
            </div>
            <div onclick="closeFocus()" class="focusGray"></div>
        </div>


        <a class="testBtn" onclick="test()">Test</a>
    </body>
</html>
