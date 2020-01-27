const inquirer = require("inquirer");
const axios = require("axios");
const HTML5ToPDF = require("./node_modules/html5-to-pdf/lib");
const path = require("path");
// const html = require("./assets/basic.html");


let gitHubUsername = "TEST";

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
        console.log("there was an error");
    }).then(function(gitResponse){

        // console.log(gitResponse)
        // User name
        console.log(gitResponse.data.login);
        gitHubUsername = gitResponse.data.login;

        // Profile image
        console.log(gitResponse.data.avatar_url);
        gitHubImg = gitResponse.data.avatar_url;

        // Links to the following:
        // User location via Google Maps
        console.log(gitResponse.data.location);

        // User GitHub profile
        console.log(gitResponse.data.html_url);

        // User blog
        console.log(gitResponse.data.blog);

        // User bio
        console.log(gitResponse.data.bio);

        // Number of public repositories
        console.log(gitResponse.data.public_repos);

        // Number of followers
        console.log(gitResponse.data.followers);

        // Number of GitHub stars
        // console.log(gitResponse.data.);

        // Number of users following
        console.log(gitResponse.data.following);
        
        module.exports = {
            name: gitHubUsername,
            image: gitHubImg
        }


        return run();
    });


});



const run = async () => {
    

    const html5ToPDF = new HTML5ToPDF({
      inputPath: path.join(__dirname, "assets", "basic.html"),
    //   inputTemplate: "htmlbootstrap",
    //   inputBody: "<div class='text-center'>" + gitHubUsername + "</div>",
      outputPath: path.join(__dirname, "assets", gitHubUsername + ".pdf"),
    //   renderDelay: 5000,
    //   templatePath: path.join(__dirname, "assets", "basic"),
      include: [
        // path.join(__dirname, "assets", "basic.css"),
        // path.join(__dirname, "assets", "custom-margin.css"),
        {
            type: "css",
            filePath: "./assets/basic.css"
        },
        {
            type: "js",
            filePath: "./assets/edit-el.js"
        }
      ],
    })
  
    await html5ToPDF.start()
    await html5ToPDF.build() 
    await html5ToPDF.close()
    console.log("DONE")
    process.exit(0)
  }

  
//   module.exports = {
//     name: gitHubUsername
//     }
