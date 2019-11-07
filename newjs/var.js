//This file is for stating all the global variables for use across the site

var homeScreen = true;
var url = window.location.href;
var unload = false;
var loadingSearch = false;


// adds .visible and .invisible
(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("display", "none");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("display", "block");
        });
    };
}(jQuery));
