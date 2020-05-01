//Rugs the Chef Cooking up your movies

// Plan of action
// Focus on promises. The scrpt shouldnt proceed without the promis being met.
// This allowed the script to work on one film at a time.
// By doing this, It should make it clear what film causes error.
// Less console output is better atm. Only errors should be logged. (exception, completions)
// Remember OMDB is amazing

// The order of things
// Check for the required files
// Read the JSON
// if Episodic
// check against the jsonFile
// Collect meta data
// Process metadata
// collect OMDB data and poster image
// add to json file.

// The requires
const fs = require("fs");
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fetch = require('node-fetch');
const request = require('request');
const readline = require('readline');
const glob = require('glob');

// Settings
const skip = false;
const requiredFiles = ["./data/", "./files/", "./files/posters/", "./data/AAmovieIndex.json", "./data/FormatFiles.json", "./files/Episodic_Shows/" ]; // Required files
const requireCleanFiles = ["./data/FormatFiles.json"]; // The files that the script needs to be empty at the start
const jsonFile = './data/AAmovieIndex.json'; // Where the Movie metadata will be saved
const dir = './files'; // DIR that will be scanned
const postersLocation = './files/posters/' // Where the poster photos will be stored
const sortExtKeepWhite = ["mp4"]; // Whitelist for streamable extensions
const sortExtFormatWhite = ["mkv", "avi"]; // Whitelist for Formatable extesions

//Colors for console log
const reset = "\x1b[0m"; // Back to normal Color
const red = "\x1b[31m"; // Error
const green = "\x1b[32m"; // Done
const yellow = "\x1b[33m"; // Warning
const blue = "\x1b[36m"; // Notification
const magenta = "\x1b[35m"; // State Change Message

// Blank variable setters
var rawFiles = [];
var omdbJSON;
var indexJSON;
var duration;
var size;
var width;
var height;
var frameRate;
var ratio;
var episodeNum;
var seasonNum;
var episodic;
var title;
var fileLocation;
var extension;
var fileName;
var seriesTitle;
var tempOut;
var filmCount;
var jsonContent;

//starter
initilize();

function initilize() {
    for (var i = 0; i < requiredFiles.length; i++) {
        if (!fs.existsSync(requiredFiles[i])) {
            // ---------------
            console.log(yellow + "File Missing : " + requiredFiles[i] + reset); // State message
            // ---------------
            if (requiredFiles[i].slice(-1) == "/") {
                fs.mkdirSync(requiredFiles[i]);
                console.log('Directory was created successfully.');
            } else {
                fs.writeFile(requiredFiles[i], "", function (err) {
                    if (err) throw err;
                    console.log('File was created successfully.');
                });
            }
            // ---------------
            console.log(yellow + "File Created : " + requiredFiles[i] + reset); // State message
            // ---------------
        }
    }

    for (var i = 0; i < requireCleanFiles.length; i++) {
        fs.closeSync(fs.openSync(requireCleanFiles[i], 'w'));
    }
    readFiles();
}

function readFiles(){
    //Reads the Json
    try {
        fs.readFile(jsonFile, 'utf8', function(err, data){
            if (err) {
                console.log(red + "Error reading files" + reset);
            }
            indexJSON = JSON.parse(data);
        }); // Reads the json file
        beforeStart(0);
    } catch(e) {
        console.log(yellow + "Error reading JSON. Assuming Empty" + reset);
        console.log(e);
        var indexJSON = JSON.parse("{}");
        beforeStart(0);
    }
}

function beforeStart(poss){
    // Reset all global variables
    rawFiles = [];
    indexJSON = JSON.parse("{}");
    duration = "";
    size = "";
    width = "";
    height = "";
    frameRate = "";
    ratio = "";
    episodeNum = "";
    seasonNum = "";
    episodic = "";
    seriesTitle = "";

    //Read all the files
    var getDirectories = function (src, callback) {
      glob(src + '/**/*', callback);
    };
    getDirectories(dir, function (err, res) {
      if (err) {
        console.log(red + 'Error: \n', err + reset);
        console.log(magenta + "Killing script. Failed to read files." + reset);
        process.exit();
      } else {
          //res
          start(res, poss);
      }
    });
}

async function start(rawFiles, pos){
    var stop = false;
    if (rawFiles.length > pos) {
        currFile = rawFiles[pos];
    } else {
        indexJSON[filmCount+1] = tempOut;
        if (jsonContent !== undefined) {
          fs.writeFileSync(jsonFile, jsonContent);
        }
        stop == true;
    }
    if(stop !== true && currFile.slice(-4).includes(".") && sortExtKeepWhite.indexOf(currFile.slice(-3)) > -1){ // Is this a file
        try {
            episodeNum = parseInt(currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].substr(1));
            seasonNum = parseInt(currFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].substr(1));
            episodic = true;
        } catch (e) {
            episodic = false;
        } finally {
            //Check for double ups
            if (episodic == false) {
                for (var i = 0; i <= Object.size(indexJSON); i++) {
                    if(currFile.contains(indexJSON[toString(i)]["title"])){
                        console.log(yellow + "Movie already found with that name. Skipping" + reset);
                        stop = true;
                        break;
                    } else {
                        console.log("Movie not found");
                    }
                }

            } else {
                // Series stuff
                var processCurrFile = currFile.split('/')[(currFile.split('/').length-1)];
                var posA = processCurrFile.indexOf(processCurrFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0]);
                var posB = processCurrFile.indexOf(processCurrFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0]);
                if (posA > 0 && posB > 0) {
                    if (posA > posB) {
                        seriesTitle = processCurrFile.substring(0, posB);
                    } else {
                        seriesTitle = processCurrFile.substring(0, posA);
                    }
                    seriesTitle = seriesTitle.replace(".", "_");
                    if(seriesTitle.slice(-1) == "_"){
                        seriesTitle = seriesTitle.substring(0, seriesTitle.length - 1);
                    }
                }

                var seriesNameCompare = seriesTitle.replace("_", " ");
                seriesNameCompare = seriesNameCompare.toLowerCase();
                var z = 0;
                var states = {"ownShow":false, "ownEpisode":false, "showID":-1};
                while (true) {
                    if (z == Object.size(indexJSON)){
                        // Stop.
                        break;
                    }
                    if (episodic == true) {
                        // It is a show find if we have the episode
                        if(indexJSON[z].episodic == true && indexJSON[z].title.toLowerCase() == seriesNameCompare){
                            // we got the show
                            states.ownShow = true;
                            states.showID = z;
                            if (indexJSON[z.toString()].showInfo["season"] == seasonNum && indexJSON[z.toString()].showInfo["episodeNum"] == episodeNum) {
                                states.ownEpisode = true;
                                break;
                            }
                        }
                    }
                    z++;
                }
                if (states.ownShow == true && states.ownEpisode == false) {
                    // we own the show not the episode
                    // keep seriesTitle the same. its all good
                } else if (states.ownShow == true && states.ownEpisode == true) {
                    // We own the show and that episode
                    // skip the rest of the jump. gtfo
                    stop = true;
                } else {
                    // No records of that show in index
                    // search OMDB
                    let settings = { method: "Get" };
                    let url = "http://www.omdbapi.com/?t=" + seriesNameCompare.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
                    var data;
                    var omdbSearch;
                    await fetch(url, settings)
                        .then(res => res.json())
                        .then((data) => { omdbSearch = data;
                    });
                    if (omdbSearch) {

                    }
                }
            }
        }
        // break point to allow skipping of all this jargon
        if (stop !== true) {
            var outputName;
            // Rename the file
            if (episodic !== true) {
                // Movie rename
                var trimmed = currFile.split('/')[(currFile.split('/').length-1)]; // Gets the file name;
                fileLocation = currFile.substring(0, currFile.lastIndexOf("/")) + "/"; // Gets the location of the file
                extension = currFile.substr(currFile.length - 4);
                try {
                    trimmed = trimmed.substring(0, trimmed.indexOf(trimmed.match(/(19|20)([0-9][0-9])/g)[0]));
                } catch (e) {
                    trimmed = trimmed.substring(0, trimmed.length - 4);
                } finally {
                    fileName = trimmed;
                }

                if(trimmed.slice(-1) == "." || trimmed.slice(-1) == "_"){
                    trimmed = trimmed.substring(0, trimmed.length - 1);
                    trimmed = trimmed.replace(".", "_");
                }


                title = trimmed;
                outputName = fileLocation+title+extension;

                // Decides if it should actually change the file names
                // Allowes debugging without actually effecting the file structure
                if (skip !== true) {
                    fs.rename(currFile, outputName, function (err) {
                        if (err) throw err;
                        currFile = outputName;
                    });
                } else {
                    console.log(yellow + "Skipped file renaming" + reset);
                    console.log("Would have renamed to : " + outputName);
                }
            } else {
                // Show rename
                fileLocation = currFile.substring(0, currFile.lastIndexOf("/")) + "/";
                extension = currFile.substr(currFile.length - 4);
                if (seasonNum < 10) {
                    seasonNum = "0" + seasonNum;
                }
                if (episodeNum < 10) {
                    episodeNum = "0" + episodeNum;
                }
                fileName = seriesTitle+"_e"+episodeNum+"s"+seasonNum;
                title = seriesTitle;
                outputName = fileLocation+fileName+extension
                if (skip !== true) {
                    fs.rename(currFile, outputName, function(err){
                        if (err) {console.log(err);}
                        currFile = outputName;
                    });
                } else {
                    console.log(yellow + "Skipped file renaming" + reset);
                    console.log("Would have renamed to : " + outputName);
                }
            }
            currFile = outputName;

            // Collect metadata
            await ffmpeg.ffprobe(currFile, async function(err, data) {

                //error catching
                if(err) {console.log(err);return;}

                //Outputs we want
                duration = data.format.duration;
                size = data.format.size;
                width = data.streams[0].width;
                height = data.streams[0].height;
                frameRate = data.streams[0].avg_frame_rate;
                ratio = data.streams[0].display_aspect_ratio;
                passthrough(duration, size, width, height, frameRate, ratio, pos, rawFiles)
            });

        } else {
            start(rawFiles, pos+1);
        }


    } else if (sortExtFormatWhite.indexOf(currFile.slice(-3)) > -1) {
        // File to format
        console.log("We gotta format this");
        start(rawFiles, pos+1);
    } else {
        // unrecognizeable file
        // Probably folder
        if (rawFiles.length > pos) {
            start(rawFiles, pos+1);
        } else {
            initilize();
        }
    }
}

async function passthrough(a, b, c, d, e, f, pos, rawFiles){
    duration = a;
    size = b;
    width = c;
    height = d;
    frameRate = e;
    ratio = f;

    //default values
    const locallyStored = true; // We're searching locally so this doesnt change
    const viewCount = 0;
    const magnet = "";
    var showInfo = JSON.parse("{}");
    const streamable = true;
    const searchable = true;
    var image = "";
    const keyWords = "";
    let settings = { method: "Get" };
    var omdbJSON;

    // Date added
    var dateAdded = new Date();
    var dd = String(dateAdded.getDate()).padStart(2, '0');
    var mm = String(dateAdded.getMonth() + 1).padStart(2, '0');
    var yyyy = dateAdded.getFullYear();

    dateAdded = dd + '/' + mm + '/' + yyyy;

    if (episodic == true) {
        // OMDB json Read
        let url = "http://www.omdbapi.com/?t=" + seriesTitle.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
        var data;
        await fetch(url, settings)
            .then(res => res.json())
            .then((data) => { omdbJSON = data;
        });
        var season = seasonNum;
        seriesTitle = seriesTitle.replace("_", " ");
        showInfo = {seriesTitle, episodeNum, season}
    } else {
        // OMDB json Read
        let url = "http://www.omdbapi.com/?t=" + fileName.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
        var data;
        await fetch(url, settings)
            .then(res => res.json())
            .then((data) => { omdbJSON = data;
        });
    }



    // One liner variables
    var desc = omdbJSON.Plot;
    var genre = omdbJSON.Genre;
    var imdbLink = "https://www.imdb.com/title/"+omdbJSON.imdbID;
    size = roundTo(size / 1073741823.9999983, 2); // Size to gb 2dp
    var resolution = width  + "x" + height; //width and height to 0000x0000
    var fileLocation = currFile;

    // duration
    var hours = Math.floor(duration / 3600) % 24;
    duration -= hours * 3600;
    var mins = Math.floor(duration / 60) % 60;
    duration -= mins * 60;
    var secs = Math.round(duration % 60);
    var runTime = {"hours":hours, "mins":mins, "secs":secs};

    // Frame rate to FPS
    if(frameRate.indexOf('/') > -1){
        var array = frameRate.split('/'), a = array[0], b = array[1];
        frameRate = roundTo(a / b, 2);
    }

    //Download poster image
    try {
        var posterSource = omdbJSON.Poster.substring(0, omdbJSON.Poster.length -7) + "1000" + omdbJSON.Poster.substring(omdbJSON.Poster.length -4);
        image = postersLocation + title.replace(" ", "_")+".jpg";
        await download(posterSource, image, function(){});
    } catch (e) {
        console.log(red + "Film not found on OMDB. Skipping Poster" + reset);
        console.log(e);
    }

    title = title.replace("_", " ");

    tempOut = {title, runTime, locallyStored, streamable, size, fileLocation, fileName, magnet, image, imdbLink, desc, genre, resolution, ratio, keyWords, frameRate, dateAdded, searchable, viewCount, episodic, showInfo}
    filmCount = Object.size(indexJSON);
    indexJSON[filmCount+1] = tempOut;
    jsonContent = JSON.stringify(indexJSON);

    // log the outputs

    try {
      if (pos < Object.size(rawFiles)) {
          start(rawFiles, pos+1); // Start again
      } else {
          console.log("Loop complete");
      }
    } catch (err) {
        console.log(red + "Failed to write to json. Killing script" + reset);
        console.error(err);
        process.exit();
    }
    // What variables we have
    // title !
    // runTime
    // locallyStored
    // streamable !
    // size
    // filelocation
    // fileName
    // Magnet
    // image !
    // imdbLink !
    // desc
    // genre
    // resolution !
    // ratio !
    // keywords !
    // framerate
    // dateAdded
    // searchable
    // viewCount
    // Episodic
    // Show info
        // seriesTitle
        // episode !
        // episodeDesc !
        // episodeNum
        // season !
}





// Forgotten function land
// Rounds number to xDP
function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if( n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {
        n = (n * -1).toFixed(2);
    }
    return n;
}

// Time out.
function sleep(time, action){
    setTimeout(function () {
        action(0);
    }, time * 1000);
}

//Get the size of the indexJSON
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size-1;
};

// Download something from a Link
var download = async function(uri, filename, callback){
  request.head(uri, function(err, res, body){

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function userInput(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}
