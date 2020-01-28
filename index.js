const inquirer = require("inquirer");
const axios = require("axios");
const HTML5ToPDF = require("./node_modules/html5-to-pdf/lib");
const path = require("path");

let userColor = "";
let gitHubUsername = "";
let gitHubImg = "";
let gitHubBio = "";
let gitHubLocation = "";
let gitHubBlog = "";
let gitHubPage = "";
let gitHubRepos = "";
let gitHubFollowing = "";
let gitHubFollowers = "";

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
    userColor = response.color;
    // response.username;

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
        gitHubLocation = gitResponse.data.location;

        // User GitHub profile
        console.log(gitResponse.data.html_url);
        gitHubPage = gitResponse.data.html_url;

        // User blog
        console.log(gitResponse.data.blog);
        gitHubBlog = gitResponse.data.blog;

        // User bio
        console.log(gitResponse.data.bio);
        gitHubBio = gitResponse.data.bio;

        // Number of public repositories
        console.log(gitResponse.data.public_repos);
        gitHubRepos = gitResponse.data.public_repos;

        // Number of followers
        console.log(gitResponse.data.followers);
        gitHubFollowers = gitResponse.data.followers;

        // Number of GitHub stars
        // console.log(gitResponse.data.);

        // Number of users following
        console.log(gitResponse.data.following);
        gitHubFollowing = gitResponse.data.following;


        return run();
    });


});



const run = async () => {
    

    const html5ToPDF = new HTML5ToPDF({
      inputPath: path.join(__dirname, "assets", "basic.html"),
      inputTemplate: "htmlbootstrap",
      inputBody: `
      <div class="text-center ${userColor}">
        <img class="profile-pic" src="${gitHubImg}" alt="" />
        <h1>${gitHubUsername}</h1>
        <p>${gitHubBio}</p>
        <span><a href="https://maps.google.com/?q=${gitHubLocation}">${gitHubLocation}</a></span> <span><a href="${gitHubPage}">GitHub</a></span>
        <span><a href="${gitHubBlog}">Blog</a></span>
      </div>
      <div class="text-center">
        <div style="" class="text-center bucket">
                <h2>Public Repositories</h2>
                <h3>${gitHubRepos}</h3>
        </div>
        <div style="" class="text-center bucket">
                <h2>Followers</h2>
                <h3>${gitHubFollowers}</h3>
        </div>
      </div>
      <div class="text-center">
        <div style="" class="text-center bucket">
            <h2>GitHub Stars</h2>
            <h3></h3>
        </div>
        <div style="" class="text-center bucket">
            <h2>Following</h2>
            <h3>${gitHubFollowing}</h3>
        </div>
      </div>
      `,
      outputPath: path.join(__dirname, "assets", gitHubUsername + ".pdf"),
      renderDelay: 5000,
    //   templatePath: path.join(__dirname, "assets", "basic"),
      include: [
        path.join(__dirname, "assets", "basic.css")
      ]
    })
  
    await html5ToPDF.start()
    await html5ToPDF.build() 
    await html5ToPDF.close()
    console.log("DONE")
    process.exit(0)
  }

