//Rugs the Chef Cooking up your movies
// The requires
const fs = require("fs");
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');


// Settings
const requiredFiles = ["./data/", "./files/", "./files/posters/", "./data/AAmovieIndex.json", "./data/FormatFiles.json" ]; // Required files
const requireCleanFiles = ["./data/FormatFiles.json"]; // The files that the script needs to be empty at the start
const jsonFile = './data/AAmovieIndex.json'; // Where the Movie metadata will be saved
const dir = './files'; // DIR that will be scanned
const sortExtKeepWhite = ["mp4"]; // Whitelist for streamable extensions
const sortExtFormatWhite = ["mkv", "avi"]; // Whitelist for Formatable extesions
const fileBlack = ["AAindex.js", "posters"]; // A file blacklist. The script will ignore the folders and files/
const extBlack = ["txt", "php", "css", "scss", "json", "md", "js", "zip"]; // Extension blacklist. The script will ignore these file types


// Blank variable setters
var rawFiles = [];
var indexJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8')); // Reads the json file


//Colors for console log
const reset = "\x1b[0m"; // Back to normal Color
const red = "\x1b[31m"; // Error
const green = "\x1b[32m"; // Done
const yellow = "\x1b[33m"; // Warning
const blue = "\x1b[36m"; // Notification
const magenta = "\x1b[35m"; // State Change Message



// ---------------
console.log(magenta + "Starting File Check" + reset); //State message
// ---------------

for (var i = 0; i < requiredFiles.length; i++) {
    if (!fs.existsSync(requiredFiles[i])) {
        // ---------------
        console.log(yellow + "File Missing : " + requiredFiles[i] + reset); //State message
        // ---------------
        if (requiredFiles[i].slice(-1) == "/") {
            fs.mkFileSync(requiredFiles[i]);
        } else {
            fs.writeFile(requiredFiles[i], "", function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
        }
        // ---------------
        console.log(yellow + "File Created : " + requiredFiles[i] + reset); //State message
        // ---------------
    }
}

for (var i = 0; i < requireCleanFiles.length; i++) {
    fs.closeSync(fs.openSync(requireCleanFiles[i], 'w'));
}

// ---------------
console.log(magenta + "Finished File Check\n" + reset); //State message
// ---------------




//New New File seatching
//This will get every file that is in the dir
// ---------------
console.log(magenta + "Starting Scan" + reset); //State message
// ---------------
var readJSON = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    readJSON(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

// ---------------
console.log(magenta + "Completed Scan\n" + reset); //State message
// ---------------

//This gets the results from the search
readJSON(dir, function(err, results) {
    // ---------------
    console.log(magenta + "Starting to orginize" + reset); //State message
    // ---------------
    if (err) throw err;

    //We have the output called results
    // For every item, Cleanup the excess.
    for(var a = 0; a <= results.length - 1; a++){
        results[a] = results[a].substring(results[a].indexOf("\\files") + 1); // remove everything before 'files'
        results[a] = "./" + results[a].replace(new RegExp('\\\\', 'g'), "/"); // replace all the \\ with /
    }
    //Send output to Check format
    checkFormat(results);
});

// Used to check what format the files are and what to do with them.
async function checkFormat(rawFileNames) {
    for(var a = 0; a <= rawFileNames.length - 1; a++){
        sortByExtension = rawFileNames[a].substr(rawFileNames[a].length - 3); // Grabs the last 3 char. Doesnt include the .
        if(fileBlack.includes(rawFileNames[a] || extBlack.includes(sortByExtension))){
            //We do nothing here, It stops the program from doing anything with those files and will just move on
            console.log("Skipping File");
        } else if(sortExtKeepWhite.includes(sortByExtension)){ // If we need to keep it for processing, It goes here.
            await collectMetaData(rawFileNames[a]);
        } else if(sortExtFormatWhite.includes(sortByExtension)){ // If we need to format it, It'll be picked up here
            await format(rawFileNames[a]);
        }
    }
    //--------------------
    console.log(magenta + "Finished orginization\n" + reset); //State message
    //--------------------
}




async function collectMetaData(currentFile) {
    // Collect, process and save the movie metadata
    // This collects the movie data
    await ffmpeg.ffprobe(currentFile, async function(err, data) {
        //error catching
        if(err) {
            console.log(err);return;
        }
        await checkForDoubleUps(currentFile, data.format.duration, data.format.size, data.streams[0].width, data.streams[0].height, data.streams[0].avg_frame_rate, data.streams[0].display_aspect_ratio)

    });
}



async function checkForDoubleUps(currFile, duration, size, width, height, frameRate, ratio){
    //--------------------
    console.log(magenta + "Starting Double Up Check" + reset); //State Message
    console.log(blue + "Working File : " + reset + currFile); // State Message
    //--------------------
    // This checks the files names incase of double ups. If its already been processed, It wont be processed again
    var cleanupForPotentialNames = currFile.split('/')[(currFile.split('/').length-1)].slice(0, -4).replace(new RegExp("\\.", 'g'), "_");
    var potentialNames = cleanupForPotentialNames.split('_');
    var z = 0;
    var match = -1;
    while (true) {
        try {
            var c;
            for (var x = 0; x < potentialNames.length; x++) {
                if (indexJSON[z.toString()].title.toLowerCase().includes(potentialNames[x].toLowerCase())) { // Compare the title with this files words
                    //Check the words that are matching to the entirety of a show title
                    if (c == undefined) {
                        c = potentialNames[x].toLowerCase()
                    } else {
                        c = c + " " + potentialNames[x].toLowerCase()
                    }
                    if (indexJSON[z.toString()].title.toLowerCase() == c) {
                        // We got a full match
                        console.log(blue + "Existing Film Found, Checking if its a TV show" + reset);
                        //Check for a show
                        match = await showMatchCheck(currFile, c);
                        if (match == 0) {
                            // We have the show, Not the episode
                            console.log(green + "We dont have this episode" + reset);
                            await rename(currFile, duration, size, width, height, frameRate, ratio)
                        } else if (match == 1) {
                            // We have the show and the episode
                            console.log(yellow + "We already have the Episode. Ignoring" + reset); //State message
                        } else if (match == 2) {
                            // We already have this Movie
                            console.log(yellow + "We already have the Movie. Ignoring" + reset); //State message
                        } else if (match == 3) {
                            // Generally confused. It sees an episodic show but the matching indexJSON movie is not episodic
                            console.log(red + "Error : " + reset + "File is episodic but the matching indexJSON movie is not episodic");
                        } else if (match == 4) {
                            // We have a match
                            console.log("match == 4 in checkForDoubleUps");
                        } else {
                            console.log(red + "Error : " + reset + "showMatchCheck returned nothing. ");
                        }
                    } else {
                        // see if its the last item in the array
                        // if its the last item, guess that it doesnt exsist in the database.
                    }

                }
            }
        } catch (e) {
            if (match == -1) {
                console.log(green + "Not a double up" + reset);
                await rename(currFile, duration, size, width, height, frameRate, ratio)
            }
            break;
        }
        z++;
    }
    //--------------------
    console.log(magenta + "Finished Double Up Check\n" + reset); //State message
    //--------------------
}










async function showMatchCheck(currFile, showName){

    var z = 0;
    while (true) {
        var episodeNumFind;
        var seasonFind;
        var notEpisode = false;
        try {
            episodeNumFind = parseInt(currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].substr(1));
            seasonFind = parseInt(currFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].substr(1));
        } catch (e) {
            notEpisode = true
        }

        if (episodeNumFind !== null && notEpisode == false) {
            // It is a show find if we have the episode
            if(indexJSON[z.toString()].episodic == true && indexJSON[z.toString()].title.toLowerCase() == showName){
                if (indexJSON[z.toString()].showInfo["episodeNum"] == episodeNumFind) {
                    // There is a match on the Episode number
                    if (indexJSON[z.toString()].showInfo["season"] == seasonFind) {
                        // It is an existing tv show and we already have this episode in this season
                        return 1;
                        break;
                    }
                } else {
                    // We have this tv show but not this episode
                    return 0;
                    break;
                }
            } else if (indexJSON[z.toString()].title.toLowerCase() == showName) {
                // Generally confused. It sees an episodic show but the matching indexJSON movie is not episodic
                return 3;
                break;
            }

        } else if (showName == indexJSON[z.toString()].title.toLowerCase()) {
            // We found a Movie with the same name
            return 2;
            break;
        } else if (z == indexJSON.length){
            return 4; // Stop. We found no matches of TV shows
            break;
        }
        z++;
    }
}


async function rename(currFile, duration, size, width, height, frameRate, ratio){


    // One liner variables
    const locallyStored = true; // We're searching locally so this doesnt change
    var fileName = currFile.split('/')[(currFile.split('/').length-1)]; // Trim dir
    var fileLocation = currFile;
    //var title = currFile.split('/')[(currFile.split('/').length-1)].slice(0, -4) // Trim the dir and extension
    size = roundTo(size / 1073741823.9999983, 2); // Size to gb
    var extension = fileName.substr(fileName.length - 3);

    //default values
    var showInfo = false;
    var episodic = false;

    // Duration to hous mins sec
    // Calculation
    var hours = Math.floor(duration / 3600) % 24;
    duration -= hours * 3600;
    var mins = Math.floor(duration / 60) % 60;
    duration -= mins * 60;
    var secs = Math.round(duration % 60);


    //Working variables
    // secs             runtime Seconds
    // mins             runtime Minutes
    // hours            runtime Hours
    // locallyStored    If its locally stored
    // fileName         Just file Name with extension
    // fileLocation     The directory path to the video
    // size             File size in Gigabytes
    // extension        File Extension

}



async function format(currFile){
    console.log(currFile + " : Format");
    // Save file names to a file for the formatting script to see.
}




//Forgotten Function land
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
