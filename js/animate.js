//The file used to animate or change the look of anything on the front end. It lives here

var resultDisplayed = false;

//Toggles the "Expanded" result, manages the visual function calls and the rss function calls
//It by default will show a message such as "[blank] not found" for each value
//When called (to open) it will call setFocusResult() to change these values to be the data in the movie arrays then call displayInfo() and show it on screen
//Then when called again (to close) it will call displayInfo() to hide it, and set the values back to the "[blank] not found"
function resultExpand(id) {
    console.log("Result Expand Run");
    if (resultDisplayed === true) {//If the result is already expanded
        resetFocusResult();
        displayInfo();
        resultDisplayed = false;
    }else if (resultDisplayed === false){//If the result not yet expanded
        //Sets the result, waits for it to be setbefore continuing
        console.log("result not displayed yet");
        setFocusResult(id);
        displayInfo();

        resultDisplayed = true;
    }else {//Something went terribly wrong
        message("toggleInfo", "resultDisplayed returned incorrect value", "m");
    }
}

function displayInfo() {
    $("#grey").fadeToggle(anispeed);
    $(".resultFocus").toggleClass("focusShown");
    $(".resultFocus").slideToggle(anispeed);
}

function toggleSearchLoad() {

    $(".searchLoading").slideToggle(200);
    $(".searchLoad").fadeToggle(200);
}

async function changeSearch(id) {
    $(".searchNull").fadeOut(0);
    if (id == 1) {

    }else if (id == 2) {
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
    }else if (id == 3){
        toggleSearchLoad();
        setTimeout(function() {
            console.log("trsttegegeg");
            readSources(sourceFile);
        }, 200);
    }
    if ($("#" + id + "").hasClass("active") == true) {

    }else if (id == 3) {
        console.log("should be colored");
        $(".active").removeClass("active");
        $("#" + id + "").addClass("active");
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
