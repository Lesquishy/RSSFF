

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
    var unique = uniqueInfo.toString();
    console.log(uniqueInfo.length);


    var title = [];
    unique.replace(/<title>(.*?)<\/title>/g, function(s, match) {title.push(match);});

    var img = [];
    unique.replace(/<img src="(.*?)" alt/g, function(s, match) {img.push(match);});

    var desc = [];
    unique.replace(/<br \/><br \/>(.*?)]]>/g, function(s, match) {desc.push(match);});

    var time = [];
    unique.replace(/Runtime: (.*?)<br \/>/g, function(s, match) {time.push(match);});

    var genre = [];
    unique.replace(/Genre: (.*?)<br \/>/g, function(s, match) {genre.push(match);});

    var link = [];
    unique.replace(/<link>(.*?)<\/link>/g, function(s, match) {link.push(match);});

    var size = [];
    unique.replace(/Size: (.*?)<br \/>/g, function(s, match) {size.push(match);});

    var double = "";

    //Display all the movies
    for (var l = 0; l < uniqueInfo.length; l++){
        //FOR SOME FUCK NUGGET REASON THE TITLES ARENT THE SAME ON DUPES SOMETIMES AHHHHHHHHHHHHHHH WHAT THE FUCK
        if (img[l] === double) {continue;}
        var double = img[l];

        title[l] = title[l].replace("<![CDATA[","");
        title[l] = title[l].substring(0, title[l].indexOf('('));

        $('.resultsContainer').append('<div class="searchResult"><img onclick="resultExpand(this.id)" id="' + l + '" class="resultImg" src="' + img[l] + '" /><div class="resultTitle">' + title[l] + '</div></div>');

    }
}

function rssDownload(rss) {

}

function resultExpand(id) {
    var easy = `
        5
    `;
    $('body').append('');
}


// adds to array
//  titles.push(temp);

// extracts the string
// str.substring( str.lastIndexOf("<title>") + 1, str.lastIndexOf("</title>"))

// deletes everything after that string ?
//    s = s.substring(0, s.indexOf('?'));

// get the string between the 2 strings
// myStr.match("<title>(.*?)<\/title>")
