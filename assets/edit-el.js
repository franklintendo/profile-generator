// const gitHubInfo = require('../index.js');
// const html = require("./basic.html");
const fs = require("fs");

// return the contents of 'data.csv' as a string in the variable "data"
// "utf8" encodes the raw buffer data in human-readable format
fs.readFile("basic.html", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    console.log(data);
    console.log(data.getElementById('user-name').innerHTML);
  
  });

// console.log(html)


// function changeEl() {
//     document.getElementById("user-name").innerHTML = gitHubInfo.name;
// }

// changeEl();

