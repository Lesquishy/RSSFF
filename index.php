<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="./stylemedad.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"/>
      <script type="text/javascript" src="./js/jquery-3.4.1.min.js"></script>
      <script type="text/javascript" src="./js/home.js"></script>
      <script type="text/javascript" src="./js/readwrite.js"></script>
      <script type="text/javascript" src="./js/rss.js"></script>
      <script type="text/javascript" src="./js/animate.js"></script>
      <script type="text/javascript" src="./js/yts.js"></script>
      <script type="text/javascript" src="./js/psudo.js"></script>
      <title>RSSFF</title> <!-- RSS Feed Filter -->
      <script>
          function addTile() {
              $('.resultsContainer').append('<div class="searchResult">Extra</div>');
          }

      </script>
    </head>

    <body>
        <button onclick="testMe();" class="testBtn">Test Button</button>
        <div class="resultFocus">
            <img id="focusImg" class="focusImg" src=""/>
            <div class="focusTitleCont">
                <strong id="focusTitle" class="focusTitle">testing for title space and shit</strong>
                <p id="focusGenre" class="focusSubInfo">lorem ipsum or some shit</p>
                <p id="focusTime" class="focusSubInfo">good movie. very smart. lots of ded</p>
                <p id="focusLink" class="focusSubInfo">lorem ipsum or some shit</p>
                <p id="focusSize" class="focusSubInfo">good movie. very smart. lots of ded</p>
            </div>
            <div class="focusDescCont">
                <strong class="focusSyn">Synopsissy</strong>
                <p id="focusDesc" class="focusDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        <!-- Temporary button to add tiles to the search grid -->
        <!--<button class="searchBtn" onclick="addTile()"><i class="material-icons md-36">add</i></button>-->
        <!-- Temporary title for visual appeal, feel free to remove -->
        <div class="title">
            <p class="titleText">Rugby's Movies</p>
        </div>
        <!-- Search container, holds the results and the search form -->
        <div class="searchContainer">
                <div class="searchSelectContainer">
                    <button id="1" class="searchSelectLeft active" onclick="changeSearch(this.id);"><div class=""></div>Local</button>
                    <button id="2" class="searchSelect" onclick="changeSearch(this.id);">YTS.lt</button>
                    <button id="3" class="searchSelectRight" onclick="changeSearch(this.id);">YTS RSS</button>
                    <button class="blockOverflow"></button>
                </div>
                <div class="searchBar">
                    <div class="searchForm">
                        <input class="searchInput" type="text" placeholder="Search here nig..." name="search">
                        <button class="searchBtn" onclick="startSearch();"><i class="material-icons md-36">search</i></button>
                        <div class="lowerSearch">
                            <strong class="limitText">Limit:</strong>
                            <input class="searchLimit" type="number" max="50" placeholder="20" name="limit">
                            <div class="selectContainer">
                                <select id="genreDrop" class="searchDrop" name="genre">
                                    <option class="searchDropdown" class="searchDropdown" selected disabled>Genre:</option>
                                    <option class="searchDropdown" value="Action">Action</option>
                                    <option class="searchDropdown" value="Drama">Drama</option>
                                    <option class="searchDropdown" value="Romance">Romance</option>
                                    <option class="searchDropdown" value="Comedy">Comedy</option>
                                    <option class="searchDropdown" value="Horror">Horror</option>
                                    <option class="searchDropdown" value="Thriller">Thriller</option>
                                    <option class="searchDropdown" value="Mystery">Mystery</option>
                                    <option class="searchDropdown" value="Crime">Crime</option>
                                    <option class="searchDropdown" value="Adventure">Adventure</option>
                                    <option class="searchDropdown" value="Sci-Fi">Sci-Fi</option>
                                    <option class="searchDropdown" value="Documentary">Documentary</option>
                                    <option class="searchDropdown" value="Biography">Biography</option>
                                </select>
                                <select id="qualityDrop" class="searchDrop" name="quality">
                                    <option class="searchDropdown" selected disabled>Quality:</option>
                                    <option class="searchDropdown" value="720p">720p</option>
                                    <option class="searchDropdown" value="1080p">1080p</option>
                                    <option class="searchDropdown" value="3D">3D</option>
                                </select>
                                <select id="sortDrop" class="searchDrop" name="sort">
                                    <option class="searchDropdown" selected disabled>Sort By:</option>
                                    <option class="searchDropdown" value="title">Title</option>
                                    <option class="searchDropdown" value="year">Year</option>
                                    <option class="searchDropdown" value="rating">Rating</option>
                                    <option class="searchDropdown" value="peers">Peers</option>
                                    <option class="searchDropdown" value="seeds">Seeds</option>
                                    <option class="searchDropdown" value="downloads">Downloads</option>
                                    <option class="searchDropdown" value="likes">Likes</option>
                                    <option class="searchDropdown" value="date">Date Added</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Temporary search results to show layout, results will be generated on search -->
                <div class="testy">
                    <div class="swipeCont">
                        <div class="resultsContainer">
                        </div>
                        <div class="swipeContSub">
                            <div class="swipe"></div>
                            <div class="swipe2"></div>
                            <div class="swipe3"></div>
                        </div>
                    </div>
                </div>



                <div class="searchLoad">
                    <img class="searchLoading" src="./images/loading.svg" />
                </div>

                <div class="searchNull">
                    <p class="searchNullResponse">Sorry! Your search did not return any results :(</p>
                </div>
        </div>
        <div id="message">Please Wait. We're Loading</div>
        <div id="loading"><img src="./images/loading.svg"></div>
        <div id="grey" onclick="resultExpand()"></div>
    </body>
    </html>
