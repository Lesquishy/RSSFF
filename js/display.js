//Displays the result from the search in the resultsContainer
function displaySearch(result) {
    console.log("displaySearch Run");
    console.log(result);
    var length = Object.keys(result).length;

    for (var l = 0; l < length; l++){
        //check if there is an image (There may not be)
        if (result[l].image == "") {
            image = "../images/not-found.jpg";
        }else {
            image = result[l].image;
        }
        $('.resultsContainer').append('<div class="searchResult" onclick="loadFocus(this.id)" id="' + l + '"><img class="resultImg" src="' + image + '" onerror="imgError(this, ' + l + ');" /><div class="resultTitle" id="title' + l + '">' + result[l].title + '</div>');
    }
    loadingSearch = false;
    if (loadLocal == true) {
        loadBrowse();
    }else {
        if (unload == true) {
            setTimeout(function() {
                searchLoad();
            }, 100);
        }
    }
    stopLoading();
}
