const fs = require('fs');
const dotEnv = require('dotenv').config(); //read and set any environment variables with the dotenv package
const keys = require("./keys.js"); //API keys imported
const Spotify = require('node-spotify-api'); //spotify package for API
var spotify = new Spotify(keys.spotify);
var userCmd = process.argv[2]; //get user command to switch
console.log(userCmd);
var userQuery = process.argv[3]; //get user input to switch
//switch statement to display the verious cases
commandSorter(userCmd, userQuery);

function commandSorter(userCmd, userQuery) {
    switch (userCmd) {
        case 'concert-this':
            console.log('concert-this');
            break;
        case 'spotify-this-song':
            spotifyThis(userQuery);
            break;
        case 'movie-this':
            console.log('movie-this');
            break;
        case 'do-what-it-says':
            console.log('do-what-it-says');
            break;
            //default case
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

//Funtion for Music Info: Spotify
function spotifyThis(userQuery) {
    if (userQuery === undefined) {
        userQuery = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: userQuery,
            limit: 1 //limit to 1
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;//access within the object

            for (var i = 0; i < songs.length; i++) {
                fs.appendFileSync("log.txt", `${userCmd}\n`);
                console.log(`**********SONG INFO*********`);
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log(`Song name:  ${songs[i].name}`);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log(`Album:  + ${songs[i].album.name}`);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log(`Artist(s):  ${songs[i].artists[0].name}`);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log(`*****************************`);  
                fs.appendFileSync("log.txt", "*****************************\n");
             }
        }
    );
};