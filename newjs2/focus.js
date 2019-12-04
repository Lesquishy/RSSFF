//This file contains the code for the focus tab, and associated functions

function loadFocus(id) {
    console.log("LoadFocus!");
    console.log(id);
    var title = $("#title" + id).html();
    console.log(title);
    console.log(local);

    //pops up the focus window with a loading screen
    $(".focus").slideToggle(300);
    $(".focusContainer").fadeToggle(300);

    if (data[id].episodic == true) {//Is a TV show
        console.log("Tv show");
        $(".focusImg").attr('src', data[id].image);
        $(".header").html(data[id].title);

    }else {//A movie
        console.log("movie");
        $(".focusImg").attr('src', data[id].image);
        $(".header").html(data[id].title);
        $(".focusRuntime").html("Runtime: " + data[id].runtime);
        $(".focusSize").html("Size: " + data[id].size);
        var genres = data[id].genres;
        genres = genres.join(", ");
        $(".focusGenre").html("Genre: " + genres);
        $(".focusDesc").html("Summary: <br>" + data[id].desc);
    }
}

function closeFocus() {
    $(".focus").slideToggle(300);
    $(".focusContainer").fadeToggle(300);
}

function displayFocus() {
    //just some stuff rtemove it
    for (var l = 0; l < length; l++){
        if (local[l].seriesInfo.seriesTitle == title) {//Part of this show

        }
    }
}
