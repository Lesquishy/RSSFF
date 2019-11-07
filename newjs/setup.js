//This file handles the incoming requests to change tabs, and incoming requests to load the focus tab


//This function checks the current state of the tabs, to decide how to load the next tab
function checkLoad(id) {
    console.log("checkLoad run");
    url = window.location.href;

    //makes sure the user can't change screen while loading
    if (loadingSearch == true) {
        console.log("Exiting checkLoad()");
        return;
    }else {
        console.log("loading Started");
        loadingSearch = true;
    }

    console.log("checkLoad run x2");



    //checks to see if the user is on the home screen
    if (homeScreen == true) {
        console.log("on home screen");
        $(".welcomeScreen").fadeToggle();
        homeScreen = false;
        unloadSearch();
        searchLoad();

        //Check what page they are loading, and load it
        setTimeout(function() {
            unload = true;
            console.log("should change active");
            if (id == "local") {localSearch();}
            else if (id == "yts") {ytsSearch();}
            else if (id == "rss") {rssSearch();}
            else {console.log("Where are you trying to go???")}
        }, 100);
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
                if (id == "local") {localSearch();activeTab("#local");}
                else if (id == "yts") {ytsSearch();activeTab("#yts");}
                else if (id == "rss") {rssSearch();activeTab("#rss");}
                else {console.log("Where are you trying to go???")}
            }, 100);
        }
    }
}


//Checks the tab you are on and sends a request to load the appropriate focus div
function checkFocus(id) {
    console.log(id);

    //Checks if you are on the local tab
    if (url.includes("#local")) {
        localFocus();
    }else {//On another tab (YTS or RSS)
        ytsFocus();
    }
}











































//
