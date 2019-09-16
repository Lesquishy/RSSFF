// This is for managing and editing the file outputs either from rss or from the locally stored files
// so things like putting the outputs into variables, Filtering the outputs. Whatever. Its all done here.

/*function rssRead(item) {
  $.get(item, function (data) {
      $(data).find("entry").each(function () { // or "item" or whatever suits your feed
        var response = $(this);
        console.log("------------------------");
        console.log("title      : " + response.find("title").text());
        console.log("author     : " + response.find("author").text());
        console.log("description: " + response.find("description").text());
      });
  });
*/

//https://yts.lt/api/v2/list_movies.jsonp?query_term=Endgame

var title = [];
var img = [];
var desc = [];
var time = [];
var genre = [];
var link = [];
var size = [];
var imageNULL = false;
var imageNULLId = -1;

function rssRead(item) {
  var responce;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", item, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        response = rawFile.responseText;
        console.log(response);
        window.setTimeout(rssInterpret(response),4000);
        //rssInterpret(response);
      } else {
        stop = true;
        message("loading sources file", "Status != 200", "h")
      }
    }
  }
  rawFile.send(null);
}

function rssInterpret(info) {

    //This gets rid of the duplicate entries in the RSS Feed because theres a LOT
    var unique = [];
    info.replace(/<item>(.*?)<\/item>/gms, function(s, match) {unique.push(match);});
    var uniqueInfo = Array.from(new Set(unique));
    unique = uniqueInfo.toString();
    console.log(uniqueInfo.length);


    title = [];
    unique.replace(/<title>(.*?)<\/title>/g, function(s, match) {title.push(match);});

    img = [];
    unique.replace(/<img src="(.*?)" alt/g, function(s, match) {img.push(match);});

    desc = [];
    unique.replace(/<br \/><br \/>(.*?)]]>/g, function(s, match) {desc.push(match);});

    time = [];
    unique.replace(/Runtime: (.*?)<br \/>/g, function(s, match) {time.push(match);});

    genre = [];
    unique.replace(/Genre: (.*?)<br \/>/g, function(s, match) {genre.push(match);});

    link = [];
    unique.replace(/<link>(.*?)<\/link>/g, function(s, match) {link.push(match);});

    size = [];
    unique.replace(/Size: (.*?)<br \/>/g, function(s, match) {size.push(match);});
    console.log("nigger nigger" + img[0]);

    var double = "";

    //Display all the movies
    for (var l = 0; l < uniqueInfo.length; l++){
        //FOR SOME FUCK NUGGET REASON THE TITLES ARENT THE SAME ON DUPES SOMETIMES AHHHHHHHHHHHHHHH WHAT THE FUCK
        if (img[l] === double) {continue;}
        var double = img[l];

        title[l] = title[l].replace("<![CDATA[","");
        title[l] = title[l].substring(0, title[l].indexOf('('));

        $('.resultsContainer').append('<div class="searchResult"><img onclick="resultExpand(this.id)" id="' + l + '" class="resultImg" src="' + img[l] + '" onerror="imgError(this, ' + l + ');" /><div class="resultTitle">' + title[l] + '</div></div>');

    }
}

function imgError(image, i) {
    $(image).attr("src", "https://tnstateparks.com/assets/images/hero-images/4777/300x500.png");
    imageNULLId = i;
    return true;
}

function setFocusResult(id) {
    console.log(id);
    console.log(img[1]);
    //To not override the 404 image
    if (imageNULLId == id) {
        $("#focusImg").attr("src", "https://tnstateparks.com/assets/images/hero-images/4777/300x500.png");
    }else {$("#focusImg").attr("src",img[id]);}
    $("#focusTitle").text(title[id]);
    $("#focusDesc").text(desc[id]);
    $("#focusTime").text(time[id]);
    $("#focusGenre").text(genre[id]);
    $("#focusLink").text(link[id]);
    $("#focusSize").text(size[id]);
}


//This function chnages the search between rugby's movies, yts's site, and yts's RSS Feed
function changeSearch() {
    toggleSearchLoad();
    setTimeout(function() {

    }, 210);
}

function resetFocusResult() {

}

function rssDownload(rss) {

}


// adds to array
//  titles.push(temp);

// extracts the string
// str.substring( str.lastIndexOf("<title>") + 1, str.lastIndexOf("</title>"))

// deletes everything after that string ?
//    s = s.substring(0, s.indexOf('?'));

// get the string between the 2 strings
// myStr.match("<title>(.*?)<\/title>")
