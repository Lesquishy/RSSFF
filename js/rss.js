

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
  console.log(titles);


  for (l = 0; l <= titles.length - 1; l++){
    titles[l] = titles[l].replace("<![CDATA[","");
    titles[l] = titles[l].substring(0, titles[l].indexOf('('));

    console.log(titles[l]);
    console.log(l);
  }
}

// adds to array
//  titles.push(temp);

// extracts the string
// str.substring( str.lastIndexOf("<title>") + 1, str.lastIndexOf("</title>"))

// deletes everything after that string ?
//    s = s.substring(0, s.indexOf('?'));

// get the string between the 2 strings
// myStr.match("<title>(.*?)<\/title>")
