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
// add to json file

// The requires
const fs = require("fs");
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fetch = require('node-fetch');
const request = require('request');
const readline = require('readline');
const glob = require('glob')

// Settings
const skip = true;
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
var indexJSON;

//starter
initilize();

function initilize() {
    for (var i = 0; i < requiredFiles.length; i++) {
        if (!fs.existsSync(requiredFiles[i])) {
            // ---------------
            console.log(yellow + "File Missing : " + requiredFiles[i] + reset); // State message
            // ---------------
            if (requiredFiles[i].slice(-1) == "/") {
                fs.mkFileSync(requiredFiles[i]);
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
        console.log(green + 'Files were successfully cleared.' + reset);
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
        sleep(1, beforeStart)
    } catch(e) {
        console.log(yellow + "Error reading JSON. Assuming Empty" + reset);
        console.log(e);
        var indexJSON = JSON.parse("{}");
        sleep(0.1, beforeStart)
    }
}

function beforeStart(){
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
          start(res, 0);
      }
    });
}

async function start(rawFiles, pos){
    // var reset
    var stop = false;

    currFile = rawFiles[pos];
    console.log("These");
    console.log(currFile.slice(-4).includes("."));
    console.log(currFile);
    if (currFile == undefined || currFile == "" || currFile == null) {
        stop == true;
    }
    if(currFile.slice(-4).includes(".") && sortExtKeepWhite.indexOf(currFile.slice(-3)) > -1 && stop !== true){ // Is this a file
        var episodeNum;
        var seasonNum;
        var episodic;
        try {
            episodeNum = parseInt(currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].substr(1));
            seasonNum = parseInt(currFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].substr(1));
            episodic = true;
        } catch (e) {
            episodic = false;
        } finally {
            if (episodic == true) {
                console.log(episodeNum);
                console.log(seasonNum);
            }
            //Check for double ups
            if (episodic == false) {
                console.log("here");
                for (var i = 0; i < Object.size(indexJSON); i++) {
                    if(currFile.contains(indexJSON[toString(i)]["title"])){
                        console.log(yellow + "Movie already found with that name. Skipping" + reset);
                        stop = true;
                        break;
                    } else {
                        console.log("Movie not found");
                    }
                }

            } else {
                // is episodic
                // Search all known places for show
                // Basic double up check
                for (var i = 0; i < Object.size(indexJSON); i++) {
                    currSearch = currFile.replace("_", " ")
                    if(currFile.contains(indexJSON[toString(i)]["title"]) && episodeNum == indexJSON[toString(i)]["showInfo"]["episodeNum"] && seasonNum == indexJSON[toString(i)]["showInfo"]["season"]){
                        console.log(yellow + "Show found with exsisting episode in this season" + reset);
                        console.log(currFile + "\n");
                        stop = true;
                        break;
                    }
                    if (currFile.contains(indexJSON[toString(i)]["title"])) {
                        showTitle = indexJSON[toString(i)]["title"];
                    }
                }

                // Extended search for series using the local JSON
                var strippedName = currFile.replace(/(e[0-9][0-9]|e[0-9]){1,}/g, "")
                strippedName = currFile.replace(/[^A-Z]+/ig, '').slice(0, -3).toLowerCase();
                for(var i=0; Object.size(movieIndex) > i; i++){
                    if(indexJSON[i].episodic == true){
                        var tally = 0;
                        strippedSeriesName = indexJSON[i].showInfo["seriesTitle"].match(/[A-Z]{1,}/ig)
                        for(var a=0; strippedSeriesName.length > a; a++){
                            if(strippedName.includes(strippedSeriesName[a].toLowerCase())){
                                //match a number of times
                                tally++;
                            } else {
                                break;
                            }
                        }
                        if(tally == strippedSeriesName.length){
                            console.log("Found existing series in local JSON");
                            var seriesTitle = movieIndex[i].showInfo["seriesTitle"];
                            break;
                        } else {
                            console.log(yellow  + "No existing series found" + reset);

                            // Try match with OMDB
                            // OMDB json Read
                            try {
                                let url = "http://www.omdbapi.com/?t=" + strippedName.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
                                var data;
                                await fetch(url, settings)
                                    .then(res => res.json())
                                    .then((data) => { omdbJSON = data;
                                });
                            } catch (e) {
                                console.log(red + "Error Collectiing OMDB data" + reset);

                                // Get user input for finding the series.
                                console.log(red);
                                const showSearch = await userInput("Please input series name: ");
                                console.log(reset);

                                // Basically the same as above
                                for(var i=0; Object.size(movieIndex) > i; i++){
                                    if(indexJSON[i].episodic == true){
                                        var tally = 0;
                                        strippedSeriesName = indexJSON[i].showInfo["seriesTitle"].match(/[A-Z]{1,}/ig)
                                        for(var a=0; strippedSeriesName.length > a; a++){
                                            if(strippedName.includes(strippedSeriesName[a].toLowerCase())){
                                                //match a number of times
                                                tally++;
                                            } else {
                                                break;
                                            }
                                        }
                                        if(tally == strippedSeriesName.length){
                                            // match
                                            console.log(green + "User Input Matched against local JSON" + reset);
                                            seriesTitle = movieIndex[i].showInfo["seriesTitle"];
                                            break;
                                        } else {
                                            seriesTitle = strippedName;
                                        }
                                    }
                                }
                            }


                        }
                    }
                }

                // Continue
            }
        }
        // break point to allow skipping of all this jargon
        if (stop !== true) {
            // Rename the file
            if (episodic !== true) {
                // Movie rename
                var trimmed = currFile.split('/')[(currFile.split('/').length-1)];; // Gets the file name;
                var fileLocation = currFile.substring(0, currFile.lastIndexOf("/")) + "/"; // Gets the location of the file
                var extension = currFile.substr(currFile.length - 4);
                var fileName;
                try {
                    trimmed = fileName.substring(0, fileName.indexOf(fileName.match(/(19|20)([0-9][0-9])/g)[0]));
                } catch (e) {
                    console.log(yellow + "No year found. Skipping trimming. Check Repo for update..." + reset);
                    trimmed = trimmed.substring(0, trimmed.length - 4);
                } finally {
                    fileName = trimmed;
                }

                if(trimmed.slice(-1) == "." || trimmed.slice(-1) == "_"){
                    trimmed = trimmed.substring(0, trimmed.length - 1);
                    trimmed = trimmed.replace(".", "_");
                }


                var justName = trimmed;
                var outputName = fileLocation+trimmed+extension;

                // Decides if it should actually change the file names
                // Allowes debugging without actually effecting the file structure
                if (skip !== true) {
                    fs.rename(currFile, outputName, async function (err) {
                        if (err) throw err;
                    });
                } else {
                    console.log(yellow + "Skipped file renaming" + reset);
                    console.log("Would have renamed to : " + outputName);
                }
            } else {
                // Show rename
                fileName = seriesTitle;
                if (skip !== true) {
                    fs.rename(currFile, filelocation+outputName, function(err){
                        if (err) {console.log(err);}
                    });
                } else {
                    console.log(yellow + "Skipped file renaming" + reset);
                    console.log("Would have renamed to : " + fileLocation+outputName);
                    await showDirectoryConstruction(currFile, true, showName, showID);
                }
            }
            console.log(fileName + " files Name");

            // Collect metadata
            var duration;
            var size;
            var width;
            var height;
            var framerate;
            var ratio;
            await ffmpeg.ffprobe(currFile, async function(err, data) {
                //error catching
                if(err) {console.log(err);return;}
                duration = data.format.duration;
                size = data.format.size;
                width = data.streams[0].width;
                height = data.streams[0].height;
                framerate = data.streams[0].avg_frame_rate;
                ratio = data.streams[0].display_aspect_ratio;

                // Metadata processing

                //default values
                const locallyStored = true; // We're searching locally so this doesnt change
                const viewCount = 0;
                const magnet = "";
                var showInfo;
                let settings = { method: "Get" };

                if (episodic == true) {
                    //OMDB json Read
                    let url = "http://www.omdbapi.com/?t=" + seriesTitle.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
                    var data;
                    await fetch(url, settings)
                        .then(res => res.json())
                        .then((data) => { omdbJSON = data;
                    });
                } else {
                    //OMDB json Read
                    let url = "http://www.omdbapi.com/?t=" + title.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
                    var data;
                    await fetch(url, settings)
                        .then(res => res.json())
                        .then((data) => { omdbJSON = data;
                    });
                }

                // One liner variables

                var desc = omdbJSON.Plot;
                var genre = omdbJSON.Genre;
                var fileLocation = currFile;
                var title = seriesTitle;

                // duration
                var hours = Math.floor(duration / 3600) % 24;
                duration -= hours * 3600;
                var mins = Math.floor(duration / 60) % 60;
                duration -= mins * 60;
                var secs = Math.round(duration % 60);
                var runTime = {"hours":hours, "mins":mins, "secs":secs};

                // What variables we have
                // fileName
                // runTime
                // episodeNum
                // seasonNum
                // extension
                // filelocation
                // desc
                // genre
                // locallyStored
                // viewCount
                // Magnet
                // Episodic
                // Show info

            });

        }


    } else if (sortExtFormatWhite.indexOf(currFile.slice(-3)) > -1) {
        // File to format
        console.log("We gotta format this");
        start(rawFiles, pos+1);
    } else {
        // unrecognizeable file
        // Probably folder
        console.log("We dont recognise this file : Probably folder");
        start(rawFiles, pos + 1);
    }
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





// Forgotten Functions

// Time out.
function sleep(time, action){
    setTimeout(function () {
        action();
    }, time * 1000);
}

//Get the size of the movieIndex
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
    console.log(magenta + "Downloading Poster Image" + reset);
    console.log('content-type:', res.headers['content-type']);

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
