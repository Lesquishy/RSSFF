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
