//This file contains the code for the focus tab, and associated functions

async function loadFocus(id) {
    console.log("LoadFocus!");
    var title = $("#title" + id).html();

    //pops up the focus window with a loading screen
    $(".focus").slideToggle(300);
    $(".focusContainer").fadeToggle(300);

    if (data[id].episodic == true) {//Is a TV show
        $(".tvNav").visible();
        $(".movieNav").invisible();

        console.log("Focus TV Show");

        $(".focusImg").attr('src', data[id].image);
        $(".header").html(data[id].title);
        $(".focusRuntime").html("Runtime: " + local[id].runTime.hours + "hr " + local[id].runTime.mins + "mins");
        $(".focusSize").html("Size: " + data[id].size);
        var genres = data[id].genres;
        genres = genres.join(", ");
        $(".focusGenre").html("Genre: " + genres);
        $(".focusDesc").html("Summary: <br>" + data[id].desc);
        console.log("firstest");

        //variables for use in displaying the seasons and episodes
        seasonContainer = {};

        //Now parse the info for the episodes and seasons
        var length = Object.keys(local).length;
        length = length - 1;
        for (var l = 0; l < length; l++){
            if (local[l].showInfo.seriesTitle == title) {//Part of this show
                console.log("A Part of this show");
                var image = local[l].image;
                var desc = local[l].desc;
                var runtime = local[l].runTime.hours + "hr " + local[l].runTime.mins + "mins";
                var genres = local[l].genre;
                var file = local[l].fileLocation;
                var size = local[l].size;

                var season = local[l].showInfo.season;
                var episode = local[l].showInfo.episodeNum;

                if (seasonContainer[season] != undefined) {//This season exists in the object
                    console.log("Season Exists");
                    if (seasonContainer[season][episode] != undefined) {//This episode exists, do not add it.
                        console.log("episode Exists");
                    }else {//Add only the episode
                        console.log("log");
                        $.extend(seasonContainer[season],{
                            [episode]: {
                                "title": local[l].showInfo.episode,
                                "desc": local[l].showInfo.episodeDesc,
                                "size": size,
                                "length": runtime,
                                "genres": genres,
                                "file": file
                            }
                        });
                    }



                }else {//Add this season and episode to the object

                    console.log("log #2");
                    $.extend(seasonContainer,{
                        [season]: {
                            [episode]: {
                                "title": local[l].showInfo.episode,
                                "desc": local[l].showInfo.episodeDesc,
                                "size": size,
                                "length": runtime,
                                "genres": genres,
                                "file": file
                            },
                        }
                    });
                }


            }
        }
        console.log(seasonContainer);

        //Display the data learned from the show, starting with the first episode

        $(".seasonUl").html("");
        $(".episodeUl").html("");
        var length = Object.keys(seasonContainer).length;
        console.log("Seasons: " + length);
        for (var l = 1; l <= length; l++){
            if (l == 1) {
                $(".seasonUl").append('<li onclick="changeSeason(this.id);" id="Season' + l + '" class="seriesBtn seasonActive"><a>Season ' + l + '</a></li>');

            }else {
                $(".seasonUl").append('<li onclick="changeSeason(this.id);" id="Season' + l + '" class="seriesBtn"><a>Season ' + l + '</a></li>');
            }
        }

        var episodes = Object.keys(seasonContainer[1]).length;
        console.log("Episodes: " + episodes)
        for (var l = 1; l <= episodes; l++){
            console.log("episode loaded")
            $(".episodeUl").append('<li onclick="changeEpisode(this.id)" id="Episode' + l + '" class="seriesBtn"><a>Episode ' + l + '</a></li>');

        }

    }else {//A movie
        $(".tvNav").invisible();
        $(".movieNav").visible();

        console.log("Focus Movie");

        $(".focusImg").attr('src', data[id].image);
        $(".header").html(data[id].title);
        $(".focusRuntime").html("Runtime: " + data[id].runtime);
        $(".focusSize").html("Size: " + data[id].size);
        var genres = data[id].genres;
        genres = genres.join(", ");
        $(".focusGenre").html("Genre: " + genres);
        $(".focusDesc").html("Summary: <br>" + data[id].desc);


        //https://yts.lt/api/v2/movie_suggestions.json

        if (data[id].local == true) {
            $("#streamBtn").attr("href", data[id].file);
            $("#downloadBtn").attr("href", data[id].file);
        } else if (data[id].local == false) {
            $("#streamBtn").toggleClass("btnDisable");
            $("#streamBtn").attr("href", "");
            $("#downloadBtn").attr("href", data[id].torrent);
        }

        relatedMovies();
    }
}

function changeSeason(id) {
    console.log("ChangeSeason()")
    $(".seasonActive").toggleClass("seasonActive");
    $("#" + id).toggleClass("seasonActive");
    var season = id.replace(/\D/g,'');
    console.log(seasonContainer);
    console.log(season);
    var episodes = Object.keys(seasonContainer[season]).length;
    $(".episodeUl").html("");

    for (var l = 1; l <= episodes; l++){
        console.log("Wow");
        $(".episodeUl").append('<li onclick="changeEpisode(this.id)" id="Episode' + l + '" class="seriesBtn"><a>Episode ' + l + '</a></li>');
    }
}

//______________________________________________________HERE_________________________________________________
function changeEpisode(id) {
    var episode = id.replace(/\D/g,'');
    $(".episodeActive").toggleClass("episodeActive");
    $("#" + id).toggleClass("episodeActive");

    $("#streamBtn").attr("href", data[id].file);
    $("#downloadBtn").attr("href", data[id].file);
}


function closeFocus() {
    $(".focus").slideToggle(300);
    $(".focusContainer").fadeToggle(300);
}

function displayFocus() {
    //just some stuff rtemove it
}
