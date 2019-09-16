//The file used to animate or change the look of anything on the front end. It lives here

function toggleInfo() {
    $("#grey").fadeToggle(anispeed);
    $(".resultFocus").toggleClass("focusShown");
}

function resultExpand(id) {
    toggleInfo();
    var easy = `
        5
    `;
    $('body').append('');
}
