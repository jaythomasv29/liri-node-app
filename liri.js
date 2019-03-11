const fs = require('fs');
var request = require('request');
const dotEnv = require('dotenv').config(); //read and set any environment variables with the dotenv package
const keys = require("./keys.js"); //API keys imported
const Spotify = require('node-spotify-api'); //spotify package for API
var spotify = new Spotify(keys.spotify);
var userCmd = process.argv[2]; //get user command to switch
console.log(userCmd);
var userQuery = process.argv[3]; //get user input to switch
//switch statement to display the verious cases
commandSorter(userCmd, userQuery);

function commandSorter(userCmd, userQuery) { //sort various commands to run different functions
    switch (userCmd) {
        case 'concert-this':
            concertThis(userQuery);
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
        default://default if user types none of the following commands
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}
//Function for Concert Info: 
function concertThis(userQuery) {
    request(`https://rest.bandsintown.com/artists/${userQuery}/events?app_id=codingbootcamp`, function (error, response, data) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', JSON.parse(data)); // Print the HTML for the Google homepage.
        var eventInfo = JSON.parse(data);
        console.log(`*****HERE ARE 5 EVENTS TO BE PERFORMED BY ${userQuery}*****`)
        for (var i=0; i<6; i++){
            console.log(i + eventInfo[i].description);
            console.log(eventInfo[i].datetime);
            console.log(eventInfo[i].venue.name);
            console.log(eventInfo[i].venue.country);
            console.log(eventInfo[i].venue.city)
        }
      });
}
//Funtion for Music Info: Spotify
function spotifyThis(userQuery) {
    if (userQuery === undefined) {
        userQuery = "The Sign"; //default Song
    }
    spotify.search({
            type: "track",
            query: userQuery,
            limit: 1 //limit to 1
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items; //access within the object
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            for (var i = 0; i < songs.length; i++) {
                fs.appendFileSync("log.txt", `*********${userCmd}*********\n`);
                console.log(dateTime);
                fs.appendFileSync("log.txt", `${dateTime} \n`);
                // console.log(`**********SONG INFO*********`);
                // fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(`Song name:  ${songs[i].name}`);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
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