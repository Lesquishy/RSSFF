//This function handles universal functions, that apply to multiple areas of the site, and are not specific to the other js files

$(document).ready( function (){
    window.onload = function(){
        //removes the loading icon from the page
        setTimeout(function() {
            $(".loading").fadeToggle();
        }, 100);
    }



    if (url.includes("#browse")) { //User is on the Browse page

        console.log("preloading the Browse Page");
        loadBrowse();
        activeTab("#browse");

    }else if (url.includes("#upcoming")) { //User is on the upcoming page

        console.log("preloading the Upcoming Page");
        //loadUpcoming();
        activeTab("#upcoming");

    }else { //User is either on the home screen, or an unknown page and will be redirected as such
        console.log("preloading the Home Page");
        //load the home page

        loadHome();
        activeTab("#home");
    }
});


function changeActive(id) {

    if (id == "home" && $("#home").hasClass("active") == false) {
        $(".browseContainer").fadeOut(200);
        loadHome();
    }

    else if (id == "browse" && $("#browse").hasClass("active") == false) {
        $(".homePageContainer").fadeOut(200);
        loadBrowse();
    }

    else if (id == "upcoming" && $("#upcoming").hasClass("active") == false) {
        console.log("Upcoming")
    }




    $(".active").removeClass("active");
    $("#" + id).toggleClass("active");
}

function activeTab(id) {
    $("" + id).toggleClass("active");
}

function test() {
    $(".focus").slideToggle(300);
    $(".focusContainer").fadeToggle(300);
}

function startLoading() {
    $(".loading3").fadeToggle();

}

function stopLoading() {
    setTimeout(function() {
        $(".loading3").fadeToggle();
    }, 200);
}

function loadHome() {
    $(".homePageContainer").fadeToggle(200);
}

function searchSetLoad() {
    $(".searchSetContainer").slideToggle(200);
    $(".searchSetBtn").toggleClass("setActive")
}
