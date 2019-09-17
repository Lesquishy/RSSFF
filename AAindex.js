var fs = require("fs");
var ffmpeg = require('fluent-ffmpeg');
const readLine = require('readline');
var Metalib = require('fluent-ffmpeg').Metadata;

const dir = '.\\';
var blacklist = ["index.js"];
var extBlack = ["txt", "mkv"];
var movieIndex = JSON.parse(fs.readFileSync('./AAmovieIndex.json', 'utf8'));

var output = [];
var loop = 0;
var start;
var fileNames = [];

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
for(var f = 0; fileNames.length - 1 >= f; f++ ){
    ffmpeg.ffprobe(fileNames[f], function(err, data) {
        //error catching
        if(err) { return; }
        translate(data.format.filename, data.format.duration, data.format.size, data.streams[0].width, data.streams[0].height, data.streams[0].avg_frame_rate, data.streams[0].display_aspect_ratio)

        //output
    });
}



async function translate(name, duration, size, width, height, framefRate, ratio){

    // Duration to hous mins sec
    // Calculation
    var hours = Math.floor(duration / 3600) % 24;
    duration -= hours * 3600;
    var mins = Math.floor(duration / 60) % 60;
    duration -= mins * 60;
    var secs = Math.round(duration % 60);

    // Combine the time to string
    var runTime = {"hours":hours, "mins":mins, "secs":secs};

    //size to gb
    size = roundTo(size / 1073741823.9999983, 2);


    //width and height to 0000x0000
    var resolution = width  + "x" + height;

    // frame rate to fps
    if(frameRate.indexOf('/') > -1){
        var array = frameRate.split('/'), a = array[0], b = array[1];
        frameRate = roundTo(a / b, 2);
    }


    

    // check its not already used
    var s = 0;
    while(true){
        if (movieIndex[s].fileName == name){
            console.log(name + " already exists. Skipping...");
            break;
        } else if (s == Object.size(movieIndex) - 1){
            var tempOut = {name, runTime, size, resolution, frameRate};
            output[pos] = tempOut;
            break;
        } else {
            s++;
        }
    }

    // NOTE: add more data to write to the file
    /*
    that includes
        - locallyStored
        - file Location
        - title (not name. the var name is the fileName)
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


    //pos is the id number
    pos++;
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
