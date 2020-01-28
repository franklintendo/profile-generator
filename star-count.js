const axios = require("axios");
const fs = require("fs");

axios.get("https://api.github.com/users/franklintendo/repos").catch(function(error){
        console.log("there was an error");
    }).then(function(repos){
        // console.log(stars.length);
        // stars.forEach(stars => {

        // })

        let reposArr = repos.data;
        let stargazerCount = 0;
        
        reposArr.forEach(repo => {
            stargazerCount += repo.stargazers_count;
        });
        // starParse = JSON.stringify(stars);
        console.log(stargazerCount);
        // fs.writeFile("stars.json", stars, function(){
        //     console.log("Stars file was written.")
        // });
    });