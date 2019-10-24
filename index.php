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
      <script type="text/javascript" src="./js/focus.js"></script>
      <title>RSSFF</title> <!-- RSS Feed Filter -->
      <script>
          function addTile() {
              $('.resultsContainer').append('<div class="searchResult">Extra</div>');
          }

      </script>
    </head>

    <body>
        <button onclick="watchMovie();" class="testBtn">Test 1</button>
        <button onclick="testMe2();" class="testBtn2">Test 2</button>
        <div class="resultFocus">
            <img id="focusImg" class="focusImg" src="https://tnstateparks.com/assets/images/hero-images/4777/300x500.png"/>
            <a id="focusDownload" class="focusSubInfo">Download to the server</a>
            <div class="focusTitleCont">
                <strong id="focusTitle" class="focusTitle">Movie Blank: Revenge of me!</strong>
                <a id="focusLink" class="focusSubInfo"><i class="material-icons md-36">get_app</i></a>
                <p id="focusGenre" class="focusSubInfo">lorem ipsum or some shit</p>
                <p id="focusTime" class="focusSubInfo">good movie. very smart. lots of ded</p>
                <p id="focusSize" class="focusSubInfo">good movie. very smart. lots of ded</p>
            </div>
            <div class="focusDescCont">
                <strong class="focusSyn">Synopsissy</strong>
                <p id="focusDesc" class="focusDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>


        <div class="watchContainer">
            <div class="backgroundContainer">
                <div class="watchInternal">
                    <div class="playerContainer">
                        <video class="mediaPlayer">
                            <source src="./tempvid/placeholder.mp4" type="video/mp4">
                            Sorry there was an error
                        </video>
                        <div class="mediaControls">
                            <button class="mediaBtn" id="playPause" class='play' title='play'onclick='togglePause();'><i class="material-icons md-36">play_arrow</i></button>
                            <button id="showVolume" class="mediaBtn"><i class="material-icons md-36">volume_down</i>
                                <div class="volumeCont"><input id="volume" orient="vertical" oninput="changeVolume(this.value)" type="range" min="1" max="100" step="1" value="10"></div>
                            </button>

                        </div>
                    </div>
                </div>
                <div class="watchBackground1"></div>
                <div class="watchBackground2"></div>
            </div>
            <div class="watchBar1"><div class="watchBar1Bar"></div><div class="watchBar1Angle"></div></div>
            <div class="watchBar2"><div class="watchBar2Bar"></div><div class="watchBar2Angle"></div></div>
        </div>


        <div class="title">
            <p class="titleText">Movies!</p>
        </div>
        <!-- Search container, holds the results and the search form -->
        <div class="searchContainer">
                <div class="searchSelectContainer">
                    <button id="tab1" class="searchSelectLeft active" onclick="changeSearch(this.id);"><div class=""></div>Local</button>
                    <button id="tab2" class="searchSelect" onclick="changeSearch(this.id);">YTS.lt</button>
                    <button id="tab3" class="searchSelectRight" onclick="changeSearch(this.id);">YTS RSS</button>
                    <button class="blockOverflow"></button>
                </div>
                <div class="searchBar">
                    <div class="searchForm">
                        <input class="searchInput" type="text" placeholder="Search here..." name="search">
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
        <div id="grey2" onclick="watchMovie()"></div>
    </body>
    </html>
