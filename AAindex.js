//Rugs the Chef Cooking up your movies

// Plan of action
// Focus on promises. The scrpt shouldnt proceed without the promis being met.
// This allowed the script to work on one film at a time.
// By doing this, It should make it clear what film causes error.
// Less console output is better atm. Only errors should be logged. (exception, completions)
// Remember OMDB is amazing

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
const postersLocation = './files/posters/' // Where the poster photos will be stored

//Colors for console log
const reset = "\x1b[0m"; // Back to normal Color
const red = "\x1b[31m"; // Error
const green = "\x1b[32m"; // Done
const yellow = "\x1b[33m"; // Warning
const blue = "\x1b[36m"; // Notification
const magenta = "\x1b[35m"; // State Change Message

// Blank variable setters
var rawFiles = [];

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

    //Reads the Json
    try {
        var indexJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8')); // Reads the json file
    } catch(e) {
        console.log(yellow + "Error reading JSON. Assuming Empty" + reset);
        var indexJSON = JSON.parse("{}");
    } finally {

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
