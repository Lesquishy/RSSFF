//for variables that must be global. Also includes custom Jquery.

var url = window.location.href;
var loadLocal = true;
var loadYts = true;
var data = {};
var resultLength = 0;
var finalResult = 0;
var loadNumber = 0;


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
