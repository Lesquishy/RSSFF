const fs = require("fs");
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

const dir = './tempvid/';
const outputFolder = "./outputTest/"
var blacklist = ["index.js", "placeholder.mp4"];
var extBlack = ["txt", "php", "css", "scss", "json", "md", "js"];
var movieIndex = JSON.parse(fs.readFileSync('./data/AAmovieIndex.json', 'utf8'));

var output = [];
var loop = 0;
var start;
var fileNames = [];

//Colors
reset = "\x1b[0m"
black = "\x1b[30m"
red = "\x1b[31m"
green = "\x1b[32m"
yellow = "\x1b[33m"
blue = "\x1b[34m"
magenta = "\x1b[35m"
cyan = "\x1b[36m"
white = "\x1b[37m"

//Start Message
console.log(magenta + "\nStarting to Scan\n" + reset)
//console.log(red + "This could take a while\n" + reset)
//console.log("Please Wait...\n")

//Get the size of the movieIndex
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size-1;
};

// For every title in the folder
fs.readdirSync(dir).forEach(title => {
    var i = 0;

    title = title.toLowerCase();

    //Blacklist filter
    while(true) {
        blacklist[i] = blacklist[i].toLowerCase();
        if(blacklist[i] == title){
            break;
        } else if (blacklist.length - 1 == i){
            fileNames.push(title);
            i++;
            break;
        } else {
            i++;
        }
    }
    //blacklist extensions
    var a = 0;
    while(true){
        if(title.includes(extBlack[a])){
            fileNames.splice(fileNames.length - 1, 1);
            break;
        } else if (extBlack.length - 1 == a){
            a++;
            break
        } else {
            a++;
        }
    }

    loop++;
});


// collect, process and save the movie metadata

var l = Object.size(movieIndex) + 1
var pos = l
for(var f = 0; fileNames.length -1  >= f; f++ ){
    ffmpeg.ffprobe(dir + fileNames[f], function(err, data) {
        //error catching
        if(err) { console.log(err);return; }
        translate(data.format.filename, data.format.duration, data.format.size, data.streams[0].width, data.streams[0].height, data.streams[0].avg_frame_rate, data.streams[0].display_aspect_ratio)

        //output
    });
}



async function translate(name, duration, size, width, height, frameRate, ratio){

    // NOTE: We're gonna have to break down the file name in here somewhere.


    // One liner variables
    const locallyStored = true; // We're searching locally so this doesnt change
    var fileName = name.split('/')[(name.split('/').length-1)]; // Trim dir
    var fileLocation = name;
    var title = name.split('/')[(name.split('/').length-1)].slice(0, -4) // Trim the dir and extension
    size = roundTo(size / 1073741823.9999983, 2); // Size to gb
    //default values
    var showInfo = false;
    var episodic = false;

    //get the ratio
    var r = gcd (width, height);
    var ratio = width/r + ":" + height/r;


    // Duration to hous mins sec
    // Calculation
    var hours = Math.floor(duration / 3600) % 24;
    duration -= hours * 3600;
    var mins = Math.floor(duration / 60) % 60;
    duration -= mins * 60;
    var secs = Math.round(duration % 60);

    // Combine the time to string
    var runTime = {"hours":hours, "mins":mins, "secs":secs};


    //width and height to 0000x0000
    var resolution = width  + "x" + height;

    // frame rate to fps
    if(frameRate.indexOf('/') > -1){
        var array = frameRate.split('/'), a = array[0], b = array[1];
        frameRate = roundTo(a / b, 2);
    }

    // Check if its a episodic show
    //if (name.includes( /([e|s][0-9]|[0-9]|[e|s][0-9]|[0-9]){1,}/g) ) {}

    var nameProcess = name.split('/')[(name.split('/').length-1)];
    var episodeFind = nameProcess.match(/(e[0-9][0-9]|e[0-9]){1,}/g)
    var seasonFind = nameProcess.match(/(s[0-9][0-9]|s[0-9]){1,}/g)
    var season;
    var episode;

    if(episodeFind.length >= 1) {
        var episodic = true;
        var season = nameProcess.match(/(s[0-9][0-9]|s[0-9]){1,}/g)
        if(season.length >= 1){
            console.log("Found series in file name. Searching for exsiting series" + reset)
            var seriesTitle = await findShow(nameProcess);
            episodeNum = episodeFind[0].replace('e','');
            season = seasonFind[0].replace('s','')
            showInfo = {seriesTitle, episodeNum, season};
        }
    }


    // check its not already used
    var s = 0;
    while(true){
        if (movieIndex[s].fileName == name){
            console.log(name + " already exists. Skipping...");
            break;
        } else if (s == Object.size(movieIndex) - 1){
            var tempOut = {title, locallyStored, runTime, size, fileLocation, fileName, resolution, ratio, frameRate, episodic, showInfo};
            output[pos] = tempOut;
            break;
        } else {
            s++;
        }
    }

    // NOTE: add more data to write to the file
    /*
    that includes
        - Detect if its episodic and the proceeding info
        - formatting info
    site will need to be able to
        - add descriptions
        - add genres
        - add keyWords
        - add poster images?
    */


    // NOTE: write to the json file without replaceing everything on it

    // NOTE: backup this file before doing these and make sure everything above is done
    // NOTE: rename the files
    // NOTE: reformat the files
    // NOTE: easily changeable input and output directories
    console.log(output[pos])
    //pos is the id number
    pos++;
}






function gcd (a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}

async function findShow(nameProcess){
    var strippedName = nameProcess.replace(/[^A-Z0-9]+/ig, '').slice(0, -3);
    for(var i=0; Object.size(movieIndex) > i; i++){
        if(movieIndex[i].episodic == true){
            var tally = 0;
            strippedSeriesName = movieIndex[i].showInfo["seriesTitle"].match(/[A-Z0-9]{1,}/ig)
            for(var a=0; strippedSeriesName.length > a; a++){
                if(strippedName.includes(strippedSeriesName[a].toLowerCase())){
                    //match a number of times
                    tally++;
                } else {
                    break;
                }
            }
            if(tally == strippedSeriesName.length){
                console.log("Found existing series");
                return movieIndex[i].showInfo["seriesTitle"];
                break;
            } else {
                console.log(red + "No existing series found")
                const showSearch = await userInput("Please input series name: ");
                console.log(reset);
                return customSearch(nameProcess, showSearch);
            }
        }
        //console.log(movieIndex[i].showInfo["seriesTitle"])
    }
}

function customSearch(nameProcess, showSearch){
    var strippedName = nameProcess.replace(/[^A-Z0-9]+/ig, '').slice(0, -3);
    for(var i=0; Object.size(movieIndex) > i; i++){
        if(movieIndex[i].episodic == true){
            var tally = 0;
            strippedSeriesName = showSearch.match(/[A-Z0-9]{1,}/ig)
            for(var a=0; strippedSeriesName.length > a; a++){
                if(strippedName.includes(strippedSeriesName[a].toLowerCase())){
                    //match a number of times
                    tally++;
                } else {
                    break;
                }
            }
            if(tally == strippedSeriesName.length){
                console.log("Found existing show");
                return movieIndex[i].showInfo["seriesTitle"];
                break;
            } else {
                console.log(magenta + "Search Failed, Setting '" + showSearch + "' As show name" + reset);
                return showSearch;
            }
        }
        //console.log(movieIndex[i].showInfo["seriesTitle"])
    }
}

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

function readTextFile(file){
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + file);
        return data;
    });
}

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
