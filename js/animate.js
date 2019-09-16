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

/*
function resultExpand(id) {
    toggleInfo();
    var easy = `
        5
    `;
    $('body').append('');
}
*/
