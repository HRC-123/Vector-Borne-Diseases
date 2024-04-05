const mongoose = require("mongoose");
const PredictedCases = require("../models/predicted");

//GET
//Home Page
exports.homepage = async (req, res) => {
  const name = "Analysed Cases";
  res.render("main", { page_name: "main", name });
};
exports.vaccines = async (req, res) => {
  const name = "Vaccines";
  res.render("vaccines", { page_name: "vaccines", name });
};
exports.variants = async (req, res) => {
  const name = "Variants";
  res.render("variants", { page_name: "variants", name });
};
exports.about = async (req, res) => {
  const name = "About";
  res.render("about", { page_name: "about", name });
};
exports.data = async (req, res) => {
  const name = "Data";
  res.render("data", { page_name: "data", name });
};

exports.predmain = async (req, res) => {
  const name = "Predicted Cases";
  res.render("predmain", { page_name: "prediction-main", name });
};

exports.getTheData = async (req, res) => {
  const name = "Predicted Cases";
  console.log("hii boys");
  const body = await req.body;
  console.log(req.body);
  const location = body.location;
  const from = body.from;
  const to = body.to;

  console.log(location, from, to);
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${from}/${to}?unitGroup=metric&include=days&key=MLUDFLSH2DWH4PJ8HWDFPCSNB&contentType=json`
  );
  const data = await response.json();

  // console.log(data)

  const { spawn } = require("child_process");
  const childPython = spawn("python", ["pred.py", data]);
let pythonFinished = false;
  // Pass the JSON data to the Python script through stdin
  childPython.stdin.write(JSON.stringify(data));
  childPython.stdin.end();

  childPython.stdout.on("data", (data) => {
    console.log(`stdout : ${data}`);
  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr : ${data}`);
  });

  childPython.on("close", async (code) => {
    console.log(`child process exited with code :  ${code}`);
     pythonFinished = true;
     uploadToMongoDB();
  });

  // Upload to mongodb

  async function uploadToMongoDB() {
    if (!pythonFinished) {
      setTimeout(uploadToMongoDB, 1000); // Check again after 1 second
      return;
    }
    
    const predicteddata = require("../../pred_data/merged_predicted_data.json");
    console.log("!!Function of mongodb is called!!");
    await PredictedCases.deleteMany({})
      .then(async () => {
        console.log("Collection cleared");

        await PredictedCases.insertMany(predicteddata)
          .then((docs) => {
            console.log(`${docs.length} documents inserted`);
          })
          .catch((err) => {
            console.error("Error inserting documents:", err);
          });
      })
      .catch((err) => {
        console.error("Error clearing collection:", err);
      });
    // res.redirect("/predict");

    console.log("Uploading done");
  }

 
  res.redirect("/predict");
};

