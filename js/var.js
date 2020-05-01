//for variables that must be global. Also includes custom Jquery.

var url = window.location.href;
var loadLocal = true;
var loadYts = true;
var data = {};
var seasonContainer = {};
var season = "";
var resultLength = 0;
var finalResult = 0;
var loadNumber = 0;
var query = "";
var shows = [];
var local;
var browsing = false;
var hidden = false;


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

Array.prototype.diff = function(arr2) {
    var ret = [];
    this.sort();
    arr2.sort();
    for(var i = 0; i < this.length; i += 1) {
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};

$(document).keypress(function(e) {
    if(e.which == 13) {
        searchLoad();
    }
});
