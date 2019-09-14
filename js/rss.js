

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
        window.setTimeout(rssInterpret(response),2000);
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
  var titles = [];
  info.replace(/<title>(.*?)<\/title>/g, function(s, match) {titles.push(match);});
  titles.shift();
  console.log(titles);

  var img = [];
  info.replace(/<img src="(.*?)" alt/g, function(s, match) {img.push(match);});
  console.log(img);

  var doubleTitle = "";
  var doubleImg = "";

  for (l = 0; l <= titles.length - 1; l++){
      //This is because there is a double up on the RSS, added this to future proof it to remove double ups.
      if (titles[l] === doubleTitle) {
          continue;
      }
      if (img[l] === doubleImg) {
          continue;
      }
    titles[l] = titles[l].replace("<![CDATA[","");
    titles[l] = titles[l].substring(0, titles[l].indexOf('('));

    var doubleTitle = titles[l];
    var doubleImg = img[l];

    $('.resultsContainer').append('<div class="searchResult"><img id="' + l + '" class="resultImg" src="' + img[l] + '" /><div class="resultTitle">' + titles[l] + '</div></div>');
    console.log(img[l]);
    console.log(titles[l]);
    console.log(l);
  }
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
