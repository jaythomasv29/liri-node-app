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

function spotifyThis(userQuery) {
    //default case
    if (userQuery === undefined) {
        userQuery = "shallow"; //default song query
    } //else
    //run spotify api call
    spotify
        .search({
            type: 'track',
            query: userQuery,
            limit: 1 //limit 
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
}