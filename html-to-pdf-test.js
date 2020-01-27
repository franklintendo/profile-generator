
const HTML5ToPDF = require("./node_modules/html5-to-pdf/lib");
const path = require("path");





const run = async () => {
    

    const html5ToPDF = new HTML5ToPDF({
      inputPath: path.join(__dirname, "assets", "basic.html"),
    //   inputTemplate: "htmlbootstrap",
    //   inputBody: "<div id='test' style='text-align: center'>Test</div>" +
    //   "",
      outputPath: path.join(__dirname, "assets", "testing.pdf"),
    //   templatePath: path.join(__dirname, "assets", "basic"),
      include: [
        path.join(__dirname, "assets", "basic.css"),
        // path.join(__dirname, "assets", "custom-margin.css"),
      ],
    })
  
    await html5ToPDF.start()
    await html5ToPDF.build() 
    await html5ToPDF.close()
    console.log("DONE")
    process.exit(0)
  }

  

  return run();