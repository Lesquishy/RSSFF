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
      <title>RSSFF</title> <!-- RSS Feed Filter -->
    </head>

    <body>
        <div onclick="test()" class="testBtn">Test</div>
        <!-- Main container for most of the site -->
        <div class="mainContainer">
            <!-- The navigation panel on the left side of the screen containing links to different areas of the site -->
            <div class="sideNav">
                <div class="tileNav">
                    <a class="navTile" data-title="Reload the page."><i class="material-icons md-48">replay</i></a>
                    <a onclick="loadContent(this.id)" id="1" class="navTile" data-title="Local movies."><i class="material-icons md-48">local_movies</i></a>
                    <a onclick="loadContent(this.id)" id="2" class="navTile" data-title="Search the whole library."><i class="material-icons md-48">movie</i></a>
                    <a onclick="loadContent(this.id)" id="3" class="navTile" data-title="Upcoming movies."><i class="material-icons md-48">movie_filter</i></a>
                </div>
            </div>

            <!-- The content window that contains all the information on the screen, bar the menu -->
            <div class="contentWindow">
                <!-- Box in the middle containing the form, results container etc -->
                <div class="contentViewer">
                    <div class="searchForm">
                        <input class="searchInput" type="text" placeholder="Search here..." name="search">
                        <button class="searchBtn" onclick="startSearch();"><i class="material-icons md-32">search</i></button>
                        <div class="lowerSearch">
                            <div class="selectContainer">
                                <p class="limitText floatleft">Limit:</p>
                                <input class="searchLimit floatleft" type="number" max="50" placeholder="20" name="limit">
                            </div>
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
                            </div>
                            <div class="selectContainer">
                                <select id="qualityDrop" class="searchDrop" name="quality">
                                    <option class="searchDropdown" selected disabled>Quality:</option>
                                    <option class="searchDropdown" value="720p">720p</option>
                                    <option class="searchDropdown" value="1080p">1080p</option>
                                    <option class="searchDropdown" value="3D">3D</option>
                                </select>
                            </div>
                            <div class="selectContainer">
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

                    <div class="resultsWindow">
                        <div class="resultsContainer">

                        </div>
                    </div>



                </div>
            </div>

            <div class="loading"><img src="./images/loading.svg"></div>
            <div class="gray1"></div>

            <!-- The footer for the page, this will include our names, and a copyright
            <footer class="footer">
                © 2019-2020 Rugby Beentjes, Tim Edwards All Rights Reserved
            </footer>-->
        </div>
    </body>
</html>
