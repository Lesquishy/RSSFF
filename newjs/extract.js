//This file handles the collection of the information for the three tabs to work off



//--------------------Local Tab--------------------

function localSearch() {
    var response;
    var item = "./data/movieIndex.json";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", item, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                response = rawFile.responseText;
                window.setTimeout(localParse(response),4000);
            } else {
                stop = true;
                message("loading sources file", "Status != 200", "h");
            }
        }
    }
    rawFile.send(null);
}


function localParse(info) {
    var local = JSON.parse(info);
    //sets/resets the data object
    var data = {}
    var length = Object.keys(local).length;

    // !!!!!!!!!! Add one to this number everytime you add something that isn't a movie to the json !!!!!!!!!!!!!!
    length = length - 1;
    for (var l = 0; l < length; l++){

        var title = local[l].title;
        var image = local[l].image;
        console.log(image);
        var desc = local[l].desc;
        var time = local[l].runTime.hours + local[l].runTime.hours + local[l].runTime.hours;
        var runtime = time + "m";
        var genres = local[l].genre;
        var file = local[l].fileLocation;
        var size = local[l].size;

        $.extend(data,{
            [l]: {
                "title": title,
                "image": image,
                "desc": desc,
                "runtime": runtime,
                "genres": genres,
                "torrent": "",
                "size": size,
                "file": file
            }
        });
    }
    displaySearch(data);
}











//--------------------YTS Tab--------------------
function ytsSearch() {
    console.log("ytsSearch");
    //Testing if the user has searched for anything
    query = $(".searchInput").val();
    if (query == "") {
        //Auto Search for latest releases
        setTimeout(function() {
            searchParam = "";
            ytsData();
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

        var searchParam = ""+query+searchGenre+searchQuality+searchSort+searchLimit;
        ytsData(searchParam);
    }
}

function ytsData(searchParam) {
    $.getJSON("https://yts.lt/api/v2/list_movies.jsonp?"+searchParam, function(result) {
        $(".searchResult").remove();
        console.log(result);
        if (result.data.movie_count != 0) {
            console.log("at least 1 movie");
            $(".searchNull").fadeOut(200);
            resultLength = result.data.movies.length;
            ytsParse(result);
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

function ytsParse(result) {

    //sets/resets the data object
    var data = {}

    for (var l = 0; l < resultLength; l++){
        var title = result.data.movies[l].title;
        var image = result.data.movies[l].medium_cover_image;
        var desc = result.data.movies[l].description_full;
        var runtime = result.data.movies[l].runtime + " minutes";
        var genres = result.data.movies[l].genres;

        //Gets the torrent link that has the most seeders
        var torrents = result.data.movies[l].torrents;
        var testMax = [];
        for (var i = 0; i < torrents.length; i++){
            testMax.push(torrents[i].seeds);
        }
        var maxVal= Math.max(...testMax);
        var max = testMax.indexOf(maxVal);

        var torrent = result.data.movies[l].torrents[max].url;
        var size = result.data.movies[l].torrents[max].size;

        $.extend(data,{
            [l]: {
                "title": title,
                "image": image,
                "desc": desc,
                "runtime": runtime,
                "genres": genres,
                "torrent": torrent,
                "size": size,
                "file": ""
            }
        });
    }
    displaySearch(data);
}

//--------------------RSS Tab--------------------

function rssSearch() {
    var response;
    var item = "https://yts.lt/rss/0/all/all/0";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", item, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                response = rawFile.responseText;
                window.setTimeout(rssParse(response),4000);
            } else {
                stop = true;
                message("loading sources file", "Status != 200", "h");
            }
        }
    }
    rawFile.send(null);
}

function rssParse(info) {

    //sets/resets the data object
    var data = {}
    //This gets rid of the duplicate entries in the RSS Feed because theres a LOT
    var unique = [];
    info.replace(/<item>(.*?)<\/item>/gms, function(s, match) {unique.push(match);});
    var uniqueInfo = Array.from(new Set(unique));
    unique = uniqueInfo.toString();

    var title = []; unique.replace(/<title>(.*?)<\/title>/g, function(s, match) {title.push(match);});
    var image = []; unique.replace(/<img src="(.*?)" alt/g, function(s, match) {image.push(match);});
    var desc = []; unique.replace(/<br \/><br \/>(.*?)]]>/g, function(s, match) {desc.push(match);});
    var runtime = []; unique.replace(/Runtime: (.*?)<br \/>/g, function(s, match) {runtime.push(match);});
    var genres = []; unique.replace(/Genre: (.*?)<br \/>/g, function(s, match) {genres.push(match);});
    //var link = []; unique.replace(/<link>(.*?)<\/link>/g, function(s, match) {link.push(match);});
    var size = []; unique.replace(/Size: (.*?)<br \/>/g, function(s, match) {size.push(match);});

    var r = 0;
    for (var l = 0; l < uniqueInfo.length; l++){
        //Tests for dupes again, this time using the images (sometimes the titles on doubles are the same)
        if (image[l] === double) {
            continue;
        }
        var double = image[l];

        //removes any extra stuff from the movie title
        title[l] = title[l].replace("<![CDATA[","");
        title[l] = title[l].substring(0, title[l].indexOf('('));

        //adds the entries to the data object
        $.extend(data,{
            [r]: {
                "title": title[l],
                "image": image[l],
                "desc": desc[l],
                "runtime": runtime[l],
                "genres": genres[l],
                "torrent": "",
                "size": size,
                "file": ""
            }
        });
        r++;
    }
    displaySearch(data);
}































//nothing
