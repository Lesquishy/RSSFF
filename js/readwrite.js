//Used to read or write to files. Doesnt have to really do anything with it. Its just how we'll access the files

function readSources(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        sources = rawFile.responseText;
        links = sources.split("|");
        links.forEach(rssRead);
      } else {
        stop = true;
        message("loading sources file", "Status != 200", "h")
      }
    }
  }
  rawFile.send(null);
}
