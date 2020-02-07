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
      <script type="text/javascript" src="./node_modules/jquery/dist/jquery.min.js"></script>
      <script type="text/javascript" src="./js/var.js"></script>
      <script type="text/javascript" src="./js/main.js"></script>
      <script type="text/javascript" src="./js/extract.js"></script>
      <script type="text/javascript" src="./js/focus.js"></script>
      <script type="text/javascript" src="./js/display.js"></script>

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

            <!--<img class="fire" src="./images/best.gif"/>-->
        </div>

        <div class="viewport">

            <div class="homePageContainer">

                <div class="newContainer">
                    <p class="sectionTitle">New Additions:</p>
                    <div class="browseResults">

                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Deeiwv</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Maovie Div</div></div>

                    </div>
                </div>

                <div class="contContainer">
                    <p class="sectionTitle">Popular:</p>
                    <div class="browseResults">

                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Deeiwv</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Maovie Div</div></div>

                    </div>
                </div>

                <div class="contContainer">
                    <p class="sectionTitle">Something Else:</p>
                    <div class="browseResults">

                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Deeiwv</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Maovie Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test eMove Div</div></div>
                        <div class="browseResult" onclick="" id=""><img class="browseImg" src="./images/not-found.jpg" onerror="" /><div class="browseTitle" id="">Test Movie Div</div></div>

                    </div>
                </div>
                <br>
                <br>
            </div>

            <div class="browseContainer">
                <div class="searchBox">
                    <button class="searchSetBtn" onclick="searchSetLoad();"><i class="searchIcon material-icons md-48">filter_list</i></button>
                    <input class="searchInput" id="searchInput" type="text" placeholder="Search here..." name="search">
                    <button class="searchBtn" onclick="searchLoad();"><i class="searchIcon material-icons md-48">search</i></button>
                </div>
                <div class="searchSetContainer">
                    <p class="searchDropTitle">Genre: </p>
                    <select id="genreDrop" class="searchDrop">
                        <option value="" selected>None</option>
                        <option value="crime" class="searchDropSub">Crime</option>
                        <option value="drama" class="searchDropSub">Drama</option>
                        <option value="mystery" class="searchDropSub">Mystery</option>
                        <option  value="thriller" class="searchDropSub">Thriller</option>
                        <option  value="action" class="searchDropSub">Action</option>
                        <option  value="comedy" class="searchDropSub">Comedy</option>
                        <option  value="family" class="searchDropSub">Family</option>
                        <option  value="adventure" class="searchDropSub">Adventure</option>
                        <option  value="animation" class="searchDropSub">Animation</option>
                    </select>

                    <p class="searchDropTitle">Quality: </p>
                    <select id="qualityDrop" class="searchDrop">
                        <option value="" selected>None</option>
                        <option value="720p" class="searchDropSub">720p</option>
                        <option value="1080p" class="searchDropSub">1080p</option>
                        <option value="4k" class="searchDropSub">4k</option>
                    </select>
                </div>
                <div class="searchPls">Sorry there were no results :/</div>
                <div class="resultsContainer">

                </div>
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

                    <div class="tvNav">
                        <div class='seasonNav'>
                        	<ul class="seasonUl">
                        		<li onclick="changeSeason(this.id);" id="Season1" class='seriesBtn'><a>Something Went Wrong</a></li>
                        	</ul>
                        </div>
                        <div class='episodeNav'>
                            <ul class="episodeUl">
                        		<li class='seriesBtn'><a>Something Went Wrong</a></li>
                        	</ul>
                        </div>
                    </div>


                    <div class="movieNav">
                        <p class="similarTag">Similar Movies</p>
                        <div class="similarContainer">
                            <div class="similarResult" onclick="" id=""><img class="similarImg" src="./images/not-found.jpg" onerror="" /><div class="similarTitle" id="">Test Movie Div</div></div>
                            <div class="similarResult" onclick="" id=""><img class="similarImg" src="./images/not-found.jpg" onerror="" /><div class="similarTitle" id="">Test Movie Div</div></div>
                            <div class="similarResult" onclick="" id=""><img class="similarImg" src="./images/not-found.jpg" onerror="" /><div class="similarTitle" id="">Test Movie Div</div></div>
                            <div class="similarResult" onclick="" id=""><img class="similarImg" src="./images/not-found.jpg" onerror="" /><div class="similarTitle" id="">Test Movie Div</div></div>

                        </div>
                    </div>

                </aside>
                <footer class="footer">
                        <a id="streamBtn" class="focusBtn">Stream <i class="material-icons md-36 focusBtnSymbol">play_arrow</i></a>
                        <a id="downloadBtn" class="focusBtn" download>Download <i class="material-icons md-36 focusBtnSymbol">get_app</i></a>
                </footer>

                <div class="loading2"><img src="./images/loading.svg"/></div>
            </div>
            <div onclick="closeFocus()" class="focusGray"></div>
        </div>

        <div class="loading"><img src="./images/loading.svg"/></div>
        <div class="loading3"><img src="./images/loading.svg"/></div>
        <!--<a class="testBtn" onclick="test()">Test</a>-->
    </body>
</html>
