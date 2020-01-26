var inquirer = require("inquirer");


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
    console.log(response.color);
    console.log(response.username);

    // $.ajax({
    //     url: "https://api.github.com/users/" + response.username,
    //     method: "GET"
    // }).then(function(gitResponse){
    //     console.log(gitResponse);
    // });



});