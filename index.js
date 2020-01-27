var inquirer = require("inquirer");
var axios = require("axios");
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./pdf-template.html', 'utf8');
var options = { format: 'Letter' };


inquirer.prompt([
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: ["red", "green", "blue", "pink"]
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"    
    }
]).then(function(response){
    // Store user's favorite color and their entered 
    // username into variables
    var color = response.color;
    var username = response.username;

    axios.get("https://api.github.com/users/" + response.username).catch(function(error){
        console.log("no user found");
    }).then(function(gitResponse){

        // console.log(gitResponse)
        // User name
        // console.log(gitResponse.data.login);

        // Profile pic
        console.log(gitResponse.data.avatar_url);
        
        module.exports = {
            src: gitResponse.data.avatar_url
        }
        // Links to the following:
        // User location via Google Maps
        // console.log(gitResponse.data.location);

        // User GitHub profile
        // console.log(gitResponse.data.html_url);

        // User blog
        // console.log(gitResponse.data.blog);

        // User bio
        // console.log(gitResponse.data.bio);

        // Number of public repositories
        // console.log(gitResponse.data.public_repos);

        // Number of followers
        // console.log(gitResponse.data.followers);

        // Number of GitHub stars
        // console.log(gitResponse.data.);

        // Number of users following
        // console.log(gitResponse.data.following);

        // Get list of stars
        // axios.get("https://api.github.com/users/" + response.username + "/starred").then(function(starResponse){
        //     console.log(starResponse);
        // });

        // pdf.create(html, options).toFile('./github-user.pdf', function(err, res) {
        //     if (err) return console.log(err);
        //     console.log(res); // { filename: '/github-user.pdf' }
        //   });

        
    });


});