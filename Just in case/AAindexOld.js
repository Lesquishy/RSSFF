//Working on:
//Current problem is that It asks for the series name every single time, It need to write to the file before continueing to the next file

//Rugs the Chef Cooking up your movies
// The requires
const fs = require("fs");
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fetch = require('node-fetch');
const request = require('request');
const readline = require('readline');


// Settings
const requiredFiles = ["./data/", "./files/", "./files/posters/", "./data/AAmovieIndex.json", "./data/FormatFiles.json", "./files/Episodic_Shows/" ]; // Required files
const requireCleanFiles = ["./data/FormatFiles.json"]; // The files that the script needs to be empty at the start
const jsonFile = './data/AAmovieIndex.json'; // Where the Movie metadata will be saved
const dir = './files'; // DIR that will be scanned
const tvShowLocation = dir + '/Episodic_Shows/'; // Where the Episodic shows should be stored
const postersLocation = './files/posters/' // Where the poster photos will be stored
const sortExtKeepWhite = ["mp4"]; // Whitelist for streamable extensions
const sortExtFormatWhite = ["mkv", "avi"]; // Whitelist for Formatable extesions
const fileBlack = ["AAindex.js", "posters"]; // A file blacklist. The script will ignore the folders and files/
const extBlack = ["txt", "php", "css", "scss", "json", "md", "js", "zip"]; // Extension blacklist. The script will ignore these file types
const skip = false; // Choose to skip file renaming.
var metadata = true;


//Colors for console log
const reset = "\x1b[0m"; // Back to normal Color
const red = "\x1b[31m"; // Error
const green = "\x1b[32m"; // Done
const yellow = "\x1b[33m"; // Warning
const blue = "\x1b[36m"; // Notification
const magenta = "\x1b[35m"; // State Change Message


// Blank variable setters
var rawFiles = [];
try {
    var indexJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8')); // Reads the json file
} catch(e) {
    console.log(yellow + "Error reading JSON. Assuming Empty" + reset);
    var indexJSON = JSON.parse("{}");
}






// ---------------
console.log(magenta + "\nStarting File Check" + reset); //State message
// ---------------

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

// ---------------
console.log(magenta + "Finished File Check\n" + reset); // State message
// ---------------

start();
var someData;
async function start(){
    //New New File seatching
    //This will get every file that is in the dir
    // ---------------
    console.log(magenta + "Starting Scan" + reset); // State message
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
    console.log(green + "Scan Completed\n" + reset); //State message
    // ---------------

    //This gets the results from the search
    readJSON(dir, function(err, results) {
        if (err) throw err;

        //We have the output called results
        // For every item, Cleanup the excess.
        for(var a = 0; a <= results.length - 1; a++){
            results[a] = results[a].substring(results[a].indexOf("\\files") + 1); // remove everything before 'files'
            results[a] = "./" + results[a].replace(new RegExp('\\\\', 'g'), "/"); // replace all the \\ with /
            results[a] = results[a].toLowerCase()
        }
        //Send output to Check format
        someData = results;
    });
}

setTimeout(function () {
    checkFormat(someData);
}, 1000);


// Used to check what format the files are and what to do with them.
async function checkFormat(rawFileNames) {
    for(var a = 0; a <= rawFileNames.length - 1; a++){
        sortByExtension = rawFileNames[a].substr(rawFileNames[a].length - 3); // Grabs the last 3 char. Doesnt include the .
        if(fileBlack.includes(rawFileNames[a] || extBlack.includes(sortByExtension))){
            //We do nothing here, It stops the program from doing anything with those files and will just move on
            console.log("Skipping File");
        } else if(sortExtKeepWhite.includes(sortByExtension)){ // If we need to keep it for processing, It goes here.
            await checkForDoubleUps(rawFileNames[a]);
        } else if(sortExtFormatWhite.includes(sortByExtension)){ // If we need to format it, It'll be picked up here
            await format(rawFileNames[a]);
        }
    }
}





async function checkForDoubleUps(currFile, duration, size, width, height, frameRate, ratio){
    // This checks the files names incase of double ups. If its already been processed, It wont be processed again
    var cleanupForPotentialNames = currFile.split('/')[(currFile.split('/').length-1)].slice(0, -4).replace(new RegExp("\\.", 'g'), "_");
    var potentialNames = cleanupForPotentialNames.split('_');
    var z = 0;
    var match = -1;
    while (true) {
        try {
            var c;
            for (var x = 0; x < potentialNames.length; x++) {
                console.log(z);
                if (indexJSON[z.toString()].title.toLowerCase().includes(potentialNames[x].toLowerCase())) { // Compare the title with this files words
                    //Check the words that are matching to the entirety of a show title
                    if (c == undefined) {
                        c = potentialNames[x].toLowerCase()
                    } else {
                        c = c + " " + potentialNames[x].toLowerCase()
                    }
                    if (indexJSON[z.toString()].title.toLowerCase() == c) {
                        // We got a full match
                        console.log(magenta + "Starting Double Up Check" + reset); //State message
                        console.log(blue + "Working File : " + reset + currFile); // State Message
                        console.log(blue + "Existing Film Found, Checking if its a TV show" + reset);
                        //Check for a show
                        match = await showMatchCheck(currFile, c);
                        if (match == 0) {
                            // We have the show, Not the episode
                            console.log(green + "We dont have this episode" + reset);
                            console.log(magenta + "Finished Double Up Check\n" + reset); //State message
                            await renameShow(currFile, z)
                        } else if (match == 1) {
                            // We have the show and the episode
                            console.log(yellow + "We already have the Episode. Ignoring" + reset); //State message
                            console.log(magenta + "Finished Double Up Check\n" + reset); //State message
                        } else if (match == 2) {
                            // We already have this Movie
                            console.log(yellow + "We already have the Movie. Ignoring" + reset); //State message
                            console.log(magenta + "Finished Double Up Check\n" + reset); //State message
                        } else if (match == 3) {
                            // Generally confused. It sees an episodic show but the matching indexJSON movie is not episodic
                            console.log(red + "Error : " + reset + "File is episodic but the matching indexJSON movie is not episodic");
                        } else if (match == 4) {
                            // We found no matches
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
                try {
                    var ifQuery = parseInt(currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].replace('e',''))
                    if ( ifQuery > 0 ) {
                        await start();
                        // Definately episodic. Whats the show name?
                        console.log(metadata);
                        while (metadata !== true) {

                        }
                        console.log(blue + "New episodic show found" + reset);
                        var userShowName = await userInput(red + "'" + currFile + "' ; " + "Please input series name : " + reset);
                        metadata = false;
                        userShowName = userShowName.toLowerCase();
                        userShowName = userShowName.replace(/ /g, "_")
                        var d = 0;
                        var falseMatch = 0;
                        for(var i=0; Object.size(indexJSON) > i; i++){
                            if(indexJSON[i].episodic == true){
                                d++;
                                var strippedName = indexJSON[i].showInfo["seriesTitle"].replace(/[^A-Z0-9]+/ig, '').slice(0, -3).toLowerCase();
                                var tally = 0;
                                var strippedSeriesName = userShowName.match(/[A-Z0-9]{1,}/ig);
                                for(var a=0; strippedSeriesName.length > a; a++){
                                    if(strippedName.includes(strippedSeriesName[a])){
                                        //match a number of times
                                        tally++;
                                    } else {
                                        break;
                                    }
                                }
                                if(tally == strippedSeriesName.length){
                                    console.log(blue + "Found existing show: " + reset + indexJSON[i].showInfo["seriesTitle"]);

                                    break;
                                } else {
                                    falseMatch++;
                                }
                            }
                        }
                        if (falseMatch == d) {
                            console.log(yellow + "No Series found with that name. Setting: '" + reset + userShowName + yellow + "' as show name" + reset);
                            // Rename TV show
                            await renameShow(currFile, false, userShowName)
                        }
                    }
                } catch (e) {
                    console.log(green + "Movie is not in the index" + reset) // State message
                    await renameMovie(currFile)
                }
            }
            break;
        }
        z++;
    }

}

async function showMatchCheck(currFile, showName){

    var z = 1;
    while (true) {
        var episodeNumFind;
        var seasonFind;
        var notEpisode = false;

        try {
            episodeNumFind = parseInt(currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].substr(1));
            seasonFind = parseInt(currFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].substr(1));
        } catch (e) {
            notEpisode = true;
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


// RENAME SHOW

async function renameShow(currFile, showID, customShowName){
    //--------------------
    console.log(magenta + "Starting Renaming Show" + reset ); //State message
    console.log(blue + "Working File : " + reset + currFile); // State Message
    //--------------------

    var showName;

    if (showID == false) {
        showName = customShowName;
    } else {
        showName = indexJSON[showID].title; // Gets the name of the show
    }

    //Rename a file thats a show
    var episodeNum = currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].replace('e',''); // Gets the episode number
    var season = currFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].replace('s',''); // Gets the season number
    var outputName = showName.replace(/ /g, "_") + "_s" + season + "e" + episodeNum + "." + currFile.substr(currFile.length - 3); // final file name
    var fileLocation = currFile.substring(0, currFile.lastIndexOf("/")) + "/"; // Gets the location of the file

    if (skip !== true) {
        fs.rename(currFile, filelocation+outputName, await collectMetaData(fileLocation+outputName, true, showName, showID));
        /*
        var counter;
        while (true) {
            if (fs.exists(fileLocation+outputName)) {
                console.log(green + "Finished Renaming Show to : " + fileLocation+outputName + reset);
                await collectMetaData(fileLocation+outputName, true, showName, showID);
                break;
            } else {
                counter++;
                if (counter => 10000) {
                    console.log(red + "Timed out waiting for file rename.  Killing script" + reset);
                    process.exit();
                    break;
                }
            }
        } */
    } else {
        console.log(yellow + "Skipped file renaming" + reset);
        console.log("Would have renamed to : " + fileLocation+outputName);
        await showDirectoryConstruction(currFile, true, showName, showID);
    }

}


//  RENAME A MOVIE

async function renameMovie(currFile){
    //--------------------
    console.log(magenta + "Starting Renaming Movie" + reset ); //State message
    console.log(blue + "Working File : " + reset + currFile); // State Message
    //--------------------
    var fileLocation = currFile.substring(0, currFile.lastIndexOf("/")) + "/"; // Gets the location of the file
    var fileName = currFile.split('/')[(currFile.split('/').length-1)];; // Gets the file name
    var extension = fileName.substr(fileName.length - 4);
    var trimmed = fileName;
    try {
        trimmed = fileName.substring(0, fileName.indexOf(fileName.match(/(19|20)([0-9][0-9])/g)[0]));
    } catch (e) {
        console.log(yellow + "No year found. Skipping trimming. Check Repo for update..." + reset);
        trimmed = trimmed.substring(0, trimmed.length - 4);
    }

    if(trimmed.slice(-1) == "." || trimmed.slice(-1) == "_"){
        trimmed = trimmed.substring(0, trimmed.length - 1);
        trimmed = trimmed.replace(".", "_");
    }
    var outputName = trimmed;
    var justName = outputName;
    outputName = fileLocation+outputName+extension
    var showID = false;

    // Decides if it should actually change the file names
    // Allowes debugging without actually effecting the file structure
    if (skip !== true) {
        fs.rename(currFile, outputName, async function (err) {
            if (err) throw err;
            console.log(green + "Finished Renaming Movie to : " + outputName + reset);
            await collectMetaData(outputName, false, justName, showID);
        });
    } else {
        console.log(yellow + "Skipped file renaming" + reset);
        console.log("Would have renamed to : " + outputName);
        await collectMetaData(outputName, false, justName, showID);
    }

}


async function showDirectoryConstruction(currentFile, episodic, seriesTitle, showID) {

    var seasonFolder = "/Season_" + parseInt(currentFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].substr(1));
    var showFolder = seriesTitle.replace(" ", "_").toLowerCase();

    if (skip !== true) {
        if (!fs.existsSync(showFolder)){
            fs.mkdirSync(showFolder);
        }
        if (!fs.existsSync(seasonFolder)){
            fs.mkdirSync(seasonFolder);
        }
    } else {
        console.log(yellow + "Skipped making folders" + reset);
        console.log("Would have made : ");
        console.log(tvShowLocation + showFolder);
        console.log(tvShowLocation + showFolder + seasonFolder + "\n");
    }

    var outputLocation = tvShowLocation + showFolder + seasonFolder;

    await collectMetaData(currentFile, episodic, seriesTitle, showID)
}


async function collectMetaData(currentFile, episodic, seriesTitle, showID) {
    // -----------------
    console.log(magenta + "Starting Meta Data" + reset); // State Message
    console.log(blue + "Working File : " + reset + currentFile); // State Message
    // -----------------
    // Collect, process and save the movie metadata
    // This collects the movie data
    await ffmpeg.ffprobe(currentFile, async function(err, data) {
        //error catching
        if(err) {console.log(err);return;}
        await metaDataExport(currentFile, data.format.duration, data.format.size, data.streams[0].width, data.streams[0].height, data.streams[0].avg_frame_rate, data.streams[0].display_aspect_ratio, episodic, seriesTitle, showID)
    });
}





async function metaDataExport(currFile, duration, size, width, height, frameRate, ratio, episodic, seriesTitle, showID){

    console.log(seriesTitle)
    //default values
    const locallyStored = true; // We're searching locally so this doesnt change
    const viewCount = 0;
    const magnet = "";
    var episode = "";
    var showInfo;
    let settings = { method: "Get" };

    // Episodic dependant info
    if (episodic == true) {

        var episodeNum = parseInt(currFile.match(/(e[0-9][0-9]|e[0-9]){1,}/g)[0].substr(1));
        var season = parseInt(currFile.match(/(s[0-9][0-9]|s[0-9]){1,}/g)[0].substr(1));

        // Get the episode information from OMDB
        let seasUrl = "http://www.omdbapi.com/?t=" + seriesTitle.replace(" ", "+") + "&Season=" + season + "&plot=full&apikey=ca1e71d3";
        await fetch(seasUrl, settings)
            .then(res => res.json())
            .then((data) => { episodeJSON = data;
        });

        //Get this episodes information
        for (var i = 0; i < Object.size(episodeJSON); i++) {
            if (episodeJSON.Response == "True") {
                if (episodeJSON.Episodes[i].Episode == episodeNum) {
                    episode = episodeJSON.Episodes[i].Title
                    break;
                }
            } else {
                console.log(red + "Returned error from Episode OMDB" + reset);

            }
        }
        showInfo = {seriesTitle,episode,episodeNum,season};
    } else {

    }

    //OMDB json Read
    let url = "http://www.omdbapi.com/?t=" + seriesTitle.replace(" ", "+") + "&plot=full&apikey=ca1e71d3";
    var data;
    await fetch(url, settings)
        .then(res => res.json())
        .then((data) => { omdbJSON = data;
    });


    // One liner variables
    var fileName = currFile.split('/')[(currFile.split('/').length-1)]; // Trim dir
    var desc = omdbJSON.Plot;
    var genre = omdbJSON.Genre;
    var fileLocation = currFile;
    var title = seriesTitle;
    //var title = currFile.split('/')[(currFile.split('/').length-1)].slice(0, -4) // Trim the dir and extension
    size = roundTo(size / 1073741823.9999983, 2); // Size to gb 2dp
    var extension = fileName.substr(fileName.length - 3); // Gets the file extension
    var resolution = width  + "x" + height; //width and height to 0000x0000
    var keyWords = seriesTitle.split(" ");
    var searchable;
    if (showID !== false) {
        searchable = indexJSON[showID].searchable; // If the show is searchable
    } else {
        searchable = true;
    }


    // Duration to hous mins sec
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

    //Date added
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    dateAdded = dd + '.' + mm + '.' + yyyy;

    //Download poster image
    try {
        var posterSource = omdbJSON.Poster.substring(0, omdbJSON.Poster.length -7) + "5000" + omdbJSON.Poster.substring(omdbJSON.Poster.length -4);
        var image = postersLocation + seriesTitle.replace(" ", "_")+".jpg";
        await download(posterSource, image, function(){
            console.log(green + "Download Complete" + reset);
        });
    } catch (e) {
        console.log(red + "Film not found on OMDB. Skipping Poster" + reset);
    }

    // Use OMDB to find

    // Write this data

    // Working variables
    // title            Title of the series
    // runtime          Runtime in Hours, Mins, Seconds
    // locallyStored    If its locally stored
    // size             File size in Gigabytes
    // fileLocation     The directory path to the video
    // fileName         Just file Name with extension
    // magnet           Magnet link for the torrent
    // image            Poster image location
    // imdbLink         Link to the imdb page
    // desc             A description of the film
    // genre            Array of genres this film falls under
    // resolution       The Resolution of the film in 'hieght x width'
    // ratio            The ratio of the video
    // keyWords         Key words for the search function to follow
    // framerate        The framerate of the film
    // dateAdded        The date this script ran
    // searchable       If the site should list this film
    // viewCount        Counter for how many views it has
    // episodic         If its Episodic
    // showInfo         The show info in seriesTitle, episode, episodeNum, season
    var tempOut = {title, runTime, locallyStored, size, fileLocation, fileName, magnet, image, desc, genre, resolution, ratio, keyWords, frameRate, dateAdded, searchable, viewCount, episodic, showInfo};

    var filmCount = Object.size(indexJSON)
    indexJSON[filmCount+1] = tempOut;
    var jsonContent = JSON.stringify(indexJSON);

    try {
      const data = fs.writeFileSync(jsonFile, jsonContent)
      //file written successfully
    } catch (err) {
      console.error(err)
    }

    //console.log(tempOut)

    // Write out to file


    // -----------------
    console.log(magenta + "Finished Meta Data\n" + reset); // State Message
    metadata = true;
    // -----------------


}



async function format(currFile){
    // console.log(currFile + " : Format");
    // Save file names to a file for the formatting script to see.
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
