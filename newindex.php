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
        <div class="focusContainer">
            <div class="focus">
                <header class="header">Seven Deadly Sins</header>
                <article class="main">
                    <p>Length: 184mins</p>
                    <p>Size: 1854gb</p>
                    <p>Genre: Romance, Action, Running</p>
                    <br>
                    <p>Some random stuff about the show in question: Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                </article>
                <aside class="aside aside-1"><img class="focusImg" src="https://yts.lt/assets/images/movies/beta_test_2016/medium-cover.jpg" onerror="imgError(this, ' + l + ');" /></aside>
                <aside class="aside aside-2">
                    <div class='seasonNav'>
                    	<ul>
                    		<li onclick="changeSeason(this.id);" id="Season1" class='seriesBtn'><a>Season 1</a></li>
                            <li onclick="changeSeason(this.id);" id="Season2" class='seriesBtn'><a>Season 2</a></li>
                            <li onclick="changeSeason(this.id);" id="Season3" class='seriesBtn'><a>Season 3</a></li>
                            <li onclick="changeSeason(this.id);" id="Season4" class='seriesBtn'><a>Season 4</a></li>
                            <li onclick="changeSeason(this.id);" id="Season5" class='seriesBtn'><a>Season 5</a></li>
                            <li onclick="changeSeason(this.id);" id="Season6" class='seriesBtn'><a>Season 6</a></li>
                            <li onclick="changeSeason(this.id);" id="Season7" class='seriesBtn'><a>Season 7</a></li>
                            <li onclick="changeSeason(this.id);" id="Season8" class='seriesBtn'><a>Season 8</a></li>
                    	</ul>
                    </div>
                    <div class='episodeNav'>
                        <ul>
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
            </div>
        </div>


        <a class="testBtn" onclick="test()">Test</a>
    </body>
</html>
