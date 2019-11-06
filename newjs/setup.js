//This file handles the incoming requests to change tabs


//This function checks the current state of the tabs, to decide how to load the next tab
function checkLoad(id) {
    console.log("checkLoad run");
    url = window.location.href;
    //checks to see if the user is on the home screen
    if (homeScreen == true) {
        console.log("on home screen");
        $(".welcomeScreen").fadeToggle();
        homeScreen = false;
    }else {//user is on a different Screen
        if (url.includes("#" + id)) {
            console.log("already on this page");
            //do nothing they are already on this page
        }else {
            console.log("changing page");
            //Changing page from one tab to another
            unloadSearch();
            searchLoad();

            //Check what page they are loading, and load it
            setTimeout(function() {
                unload = true;
                if (id == "local") {localSearch();}
                else if (id == "yts") {ytsSearch();}
                else if (id == "rss") {rssSearch();}
                else {console.log("Where are you trying to go???")}
            }, 100);
        }
    }
}











































//
