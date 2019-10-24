//YTS.js is the .js file that handles all searches and pulls preformed on the YTS site (excluding RSS)
//It will handle searching for, displaying and processing the incoming data

//https://yts.lt/api/v2/list_movies.jsonp?query_term=Endgame

//runtime
//Genre
//quality
//year

//search, if return null search for each word and fetch results, then tell user that the search was altered:: del special characters
//animate the search bar to drop and cover the bottom of form when on rss

function ytsSearch() {
    console.log("ytsSearch");
    //Testing if the user has searched for anything
    query = $(".searchInput").val();
    if (query == "") {
        //Auto Search for latest releases
        setTimeout(function() {
            searchParam = "";
            getData();
        }, 200);
    }else {
        //User has searched something, continue
        query = "query_term=" + query + "&";

        searchGenre = $("#genreDrop").val();
        if (searchGenre == null) {searchGenre = "";}else {searchGenre = "genre=" + searchGenre + "&";}

        searchQuality = $("#qualityDrop").val();
        if (searchQuality == null) {searchQuality = "";}else {searchQuality = "quality=" + searchQuality + "&";}

        searchSort = $("#sortDrop").val();
        if (searchSort == null) {searchSort = "";}else {searchSort = "sort_by=" + searchSort + "&";}

        searchLimit = $(".searchLimit").val();
        console.log(searchLimit);
        if (searchLimit == "") {searchLimit = "limit=25";}else {searchLimit = "limit=" + searchLimit;}

        searchParam = ""+query+searchGenre+searchQuality+searchSort+searchLimit;
        getData();
    }
}

function displaySearch(result) {
    var doubleup
    if (result == null) {//havent already loaded
        console.log("result is none");
    }else {
        reSearch = result;
        console.log("result is something defined");
        if (resultLength == null ) {
            console.log("resultLength null");
            $(".searchNull").empty();
            $(".searchNull").append('<p class="searchNullResponse">Sorry! Your search did not return any results :(</p>');
            $(".searchNull").fadeIn();
        }else {
            console.log("resultLength correct");
            console.log(result);
            console.log(resultLength);
            for (var l = 0; l < resultLength; l++){
                if (result.data.movies[l].medium_cover_image === doubleup) {continue;}
                doubleup = result.data.movies[l].medium_cover_image;
                $('.resultsContainer').append('<div class="searchResult"><img onclick="resultExpand(this.id)" id="' + l + '" class="resultImg" src="' + result.data.movies[l].medium_cover_image + '" onerror="imgError(this, ' + l + ');" /><div class="resultTitle">' + result.data.movies[l].title + '</div></div>');
            }
        }
        toggleSearchLoad();
    }
}



function getData() {
    $.getJSON("https://yts.lt/api/v2/list_movies.jsonp?"+searchParam, function(result) {
        $(".searchResult").remove();
        console.log(result);
        if (result.data.movie_count != 0) {
            console.log("at least 1 movie");
            $(".searchNull").fadeOut(200);
            resultLength = result.data.movies.length;
            displaySearch(result);
        }else {
            console.log("not a single movie");
            reSearch = result;
            $(".searchNull").empty();
            $(".searchNull").append('<p class="searchNullResponse">Sorry! Your search did not return any results :(</p>');
            $(".searchNull").fadeIn();
            toggleSearchLoad();
        }
    });
}

//FIX THIS SHIT WHYYYYYY IT DO THIS















































//For my sake
