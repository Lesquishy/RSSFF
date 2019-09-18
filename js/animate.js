//The file used to animate or change the look of anything on the front end. It lives here

var resultDisplayed = false;

function toggleSearchLoad() {

    $(".searchLoading").slideToggle(200);
    $(".searchLoad").fadeToggle(200);
}

async function changeSearch(id) {
    $(".searchNull").fadeOut(0);
    if (id == "tab1") {

    }else if (id == "tab2") {
        swipe();
        if (reSearch == null) {
            //display please search something
            console.log("Not searched before")
            setTimeout(function() {
                $(".searchNull").empty();
                if ($(".searchNull").children().length > 0) {
                    $(".searchNull").fadeIn();
                }else {
                    $(".searchNull").append('<p class="searchNullResponse">Search the whole library!</p>');
                    $(".searchNull").fadeIn();
                }
            }, 410);

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

/*
function resultExpand(id) {
    toggleInfo();
    var easy = `
        5
    `;
    $('body').append('');
}
*/
