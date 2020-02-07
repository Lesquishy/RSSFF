//This file handles the collection of the information for other functions to use


//This function loads the browse page
function loadBrowse() {
    $(".browseContainer").fadeToggle(200);
    browsing = true;
    searchLoad();
}

//This is called when the user has searched for something
async function searchLoad() {
    query = $(".searchInput").val();
    if (query.length < 1) {
        if (browsing == true) {
            browsing = false;
            //dont worry
        }else {
            return;
        }
    }

    startLoading();
    data = {};
    loadNumber = 0;
    query = query.toLowerCase();

    $(".searchResult").remove();

    if (loadLocal == true && loadYts == true) {
        console.log("searchLoad");
        var localData = await localParse();
        console.log("first one done");
        console.log(localData);

        var result = await ytsSearch();

        if (result == undefined) {
            console.log("hidden true")
            hidden = true;
            $(".resultsContainer").fadeOut(200);
            stopLoading();
        }else {
            hidden = false;
            $(".resultsContainer").fadeIn(200);
            displaySearch(result);
        }

    }

    else if (loadLocal == true) {

    }

    else if (loadYts == true) {

    }
}

function localParse() {

    console.log("local Search");
    var response;
    var item = "./data/movieIndex.json";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", item, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                info = rawFile.responseText;
            } else {
                stop = true;
                message("loading sources file", "Status != 200", "h");
            }
        }
    }
    rawFile.send(null);



    console.log(info);
    local = JSON.parse(info);
    var length = Object.keys(local).length;

    // !!!!!!!!!! Add one to this number everytime you add something that isn't a movie to the json !!!!!!!!!!!!!!
    length = length - 1;
    for (var l = 0; l < length; l++){

        var keywords = local[l].keyWords;
        keywords = keywords.map(function(x){ return x.toLowerCase() });

        var searchArray = query.split(" ");

        var searched = searchArray.diff(keywords);
        if (searched.length >= 1) { //If this movie/TV Show is what you searched for
            //Check if it is a tv show or a movie
            console.log(local[l].episodic)
            var tv = local[l].episodic;
            if (tv == true) { //If this result is a part of a tv show

                var title = local[l].showInfo.seriesTitle;
                if (shows.includes(title)) {
                    //This show is already in the list
                    console.log("Already on the list");
                }else {
                    //This show will be added to the array and displayed on the screen
                    shows.push(title);
                    var image = local[l].image;
                    console.log(image);
                    var desc = local[l].desc;
                    var time = local[l].runTime.hours + local[l].runTime.hours + local[l].runTime.hours;
                    var runtime = time + "m";
                    var genres = local[l].genre;
                    var file = local[l].fileLocation;
                    var size = local[l].size;


                    $.extend(data,{
                        [loadNumber]: {
                            "title": title,
                            "image": image,
                            "desc": desc,
                            "runtime": runtime,
                            "genres": genres,
                            "torrent": "",
                            "size": size,
                            "file": file,
                            "episodic": true,
                            "local": true
                        }
                    });
                    loadNumber++;
                }
            }else {// This is a movie
                console.log("It is a movie LOLWE(FGNEWTHGWEGT)HNA")
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
                    [loadNumber]: {
                        "title": title,
                        "image": image,
                        "desc": desc,
                        "runtime": runtime,
                        "genres": genres,
                        "torrent": "",
                        "size": size,
                        "file": file,
                        "episodic": false,
                        "local": true
                    }
                });
                loadNumber++;
            }
        }
    }
    console.log("should return");
    return(data);
}



//Handles the loading of the remote movies from yts
async function ytsSearch() {
    console.log("ytsSearch");
    //Testing if the user has searched for anything
    query = $(".searchInput").val();
    if (query == "") {
        //Auto Search for latest releases

        searchParam = "";
        console.log("goto Data");
        var getdata = await ytsData(searchParam);
        console.log("goto Parse");
        var parsedData = await ytsParse(getdata);
        return(parsedData);

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
        if (searchLimit == "") {searchLimit = "limit=25";}else {searchLimit = "limit=" + searchLimit;}

        var searchParam = ""+query+searchGenre+searchQuality+searchSort+searchLimit;

        console.log("goto Data");
        var getdata = await ytsData(searchParam);
        console.log("goto Parse");
        console.log(getdata);
        var parsedData = await ytsParse(getdata);
        return(parsedData);
    }
}

async function ytsData(searchParam) {
    console.log("ytsData()");
    await $.getJSON("https://yts.mx/api/v2/list_movies.jsonp?"+searchParam, function(result) {
        if (result.data.movie_count != 0) {
            console.log("at least 1 movie");
            $(".searchNull").fadeOut(200);
            resultLength = result.data.movies.length;
            finalResult = result;
        }else {
            finalResult = 0;
            return(finalResult);
        }
    });
    console.log("data gotten");
    console.log(finalResult);
    return(finalResult);
}

function ytsParse(result) {
    console.log("ytsParse()");
    if (result == 0) {
        return;
    }

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
            [loadNumber]: {
                "title": title,
                "image": image,
                "desc": desc,
                "runtime": runtime,
                "genres": genres,
                "torrent": torrent,
                "size": size,
                "file": "",
                "episodic": false,
                "local": false
            }
        });
        loadNumber++;
    }
    return(data);
}


//Returns 4 related movies for the user to watch
function relatedMovies(id) {

}
