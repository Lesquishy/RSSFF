//The file used to animate or change the look of anything on the front end. It lives here

var resultDisplayed = false;

function toggleSearchLoad() {

    $(".searchLoading").slideToggle(200);
    $(".searchLoad").fadeToggle(200);
}

async function changeSearch(id) {
    $(".searchNull").fadeOut(0);
    if (id == "tab1") {
        if (was3 == true) {
            $(".searchBar").slideDown(200);
            $(".searchSelectContainer").removeClass("activeExpand");
            was3 = false;
        }


    }else if (id == "tab2") {
        swipe();
        if (was3 == true) {
            $(".searchBar").slideDown(200);
            $(".searchSelectContainer").removeClass("activeExpand");
            was3 = false;
        }
        if (reSearch == null) {
            //display please search something
            console.log("Not searched before")
            toggleSearchLoad();
            ytsSearch()

        }else {
            //run code
            setTimeout(function() {
                console.log("Running again");
                displaySearch(reSearch);
                toggleSearchLoad();
            }, 410);
        }
    }else if (id == "tab3"){
        toggleSearchLoad();
        $(".searchBar").slideUp(200);
        $(".searchSelectContainer").addClass("activeExpand");
        was3 = true;
        setTimeout(function() {
            console.log("trsttegegeg");
            readSources(sourceFile);
        }, 200);
    }
    if ($(id).hasClass("active") == true) {

    }else if (id == "tab3") {
        console.log("should be colored");
        $(".active").removeClass("active");
        $("#tab3").addClass("active");
        $(".blockOverflow").addClass("activated");

    }else {
        $(".active").removeClass("active");
        $(".blockOverflow").removeClass("activated");
        $("#" + id + "").addClass("active");
    }
}

function swipe() {
    $(".swipeContSub").animate({
        left: "-50%"
    }, 400, function() {
        $(".searchResult").remove();
        $(".swipeContSub").css("left", "100%");
    });
}

function watchMovie() {
    $("#grey2").fadeToggle(anispeed);
    if (doneBefore == true) {
        setTimeout(function() {
            $(".watchBackground1").toggleClass("watch");
            $(".watchBackground2").toggleClass("watch");
        }, 500);
        setTimeout(function() {
            $(".watchBar1").toggleClass("watch");
            $(".watchBar2").toggleClass("watch");
        }, 1000);
        setTimeout(function() {
            $(".watchContainer").toggle();
        }, 1510);
        $(".watchInternal").fadeToggle(200);
        doneBefore = false;
    }else {
        $(".watchContainer").toggle();
        setTimeout(function() {
            $(".watchBackground1").toggleClass("watch");
            $(".watchBackground2").toggleClass("watch");
        }, 500);
        setTimeout(function() {
            $(".watchInternal").fadeToggle(200);
        }, 1000);
        setTimeout(function() {
            $(".watchBar1").toggleClass("watch");
            $(".watchBar2").toggleClass("watch");
        }, 10);
        doneBefore = true;
    }
}

/*
function resultExpand(id) {
    toggleInfo();
    var easy = `
        5
    `;
    $('body').append('');
}
*/
