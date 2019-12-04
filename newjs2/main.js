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

        //loadHome();
        activeTab("#home");
    }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function changeSeason(id) {
    $(".seasonActive").toggleClass("seasonActive");
    $("#" + id).toggleClass("seasonActive");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function changeActive(id) {
    $(".active").removeClass("active");
    $("#" + id).toggleClass("active");
}

function activeTab(id) {
    $("" + id).toggleClass("active");
}

function test() {
    $(".focus").slideToggle();
}
