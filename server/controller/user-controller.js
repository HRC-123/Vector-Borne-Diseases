const mongoose = require("mongoose");
const PredictedCases = require("../models/predicted");
const Cases = require("../models/train");
const fs = require("fs");

// import("../controller/requirements.txt")
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
  // Train data must be fetfched
  const Training_Cases = await Cases.find()
    .then((Training_Cases) => {
      const filePath = "./train_data/final_merged_data.json";

      // Convert data to JSON string
      const jsonData = JSON.stringify(Training_Cases);

      // Write data to the JSON file
      fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("Data saved to", filePath);
        }
      });

      const { exec } = require("child_process");

      // Execute pip install command with requirements.txt
      exec(
        "python -m pip install -r requirements.txt",
        (error, stdout, stderr) => {
          if (error) {
            console.error(
              `Error installing Python libraries: ${error.message}`
            );
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }

          console.log("Successfully installed Python libraries");
           res.render("predmain", { page_name: "prediction-main", name });
        }
      );

     
    })
    .catch((err) => {
      console.log("Some error in user-controller ", err);
    });
  // console.log(Training_Cases);
};

exports.getTheData = async (req, res) => {
  const name = "Predicted Cases";
  console.log("hii boys");
  const body = await req.body;
  console.log(req.body);
  // const location1 = "moga%2Cpunjab";
  const location = body.location;
  const from = body.from;
  const to = body.to;
  let key = "GSPTME74QY4MCLVEWAYKFNZHH";

  //   key1 = 'GSPTME74QY4MCLVEWAYKFNZHH'
  // key2 = 'WSNQZWEZNE5AQP2XZQ59X6UQY'

  //  key1 = 'PBFXZFMNYFBEKACLKZCXK4GH6'
  //  key2 = 'LXWFVR47A3GE9W8PKRU3UGGG6'

  console.log(location, from, to);
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${from}/${to}?unitGroup=metric&include=days&key=${key}&contentType=json`
  );
  const data = await response.json();

  // console.log(data)
  // const { exec } = require("child_process");

  // Function to install Python dependencies using pip
  // function installPythonDependencies() {
  //   exec("pip install pandas scikit-learn numpy", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error installing files required for python: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });
  // }

  // await installPythonDependencies();

  //   const fs = require("fs");

  //   // Specify the path to the JSON file you want to delete
  //   const filePath = "../../pred_data/merged_predicted_data.json";
  //   const filePath2 = "../../pred_data/merged_predicted_data.csv";

  //   // Use fs.unlink to delete the file
  //  await fs.unlink(filePath, (err) => {
  //     if (err) {
  //       console.error("Error deleting file:", err);
  //       return;
  //     }
  //     console.log("File deleted successfully");
  //  });

  //    await fs.unlink(filePath2, (err) => {
  //      if (err) {
  //        console.error("Error deleting file2:", err);
  //        return;
  //      }
  //      console.log("File2 deleted successfully");
  // });

  const { spawn } = require("child_process");
  const childPython = spawn("python", ["pred.py", location]);
  let pythonFinished = false;
  let jsonData = "";
  // Pass the JSON data to the Python script through stdin
  childPython.stdin.write(JSON.stringify(data));
  childPython.stdin.end();

  childPython.stdout.on("data", (data) => {
    jsonData += data.toString();
    console.log(`stdout : ${data}`);
  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr : ${data}`);
  });

  childPython.on("close", async (code) => {
    console.log(`child process exited with code :  ${code}`);

    // if (code == 0) {
    //    pythonFinished = true;
    // }
    let parsedData;
    try {
      parsedData = JSON.parse(jsonData);
      // Use parsedData as needed
      console.log(parsedData);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }

    pythonFinished = true;
    await uploadToMongoDB(parsedData);
  });

  // Upload to mongodb

  async function uploadToMongoDB(predicteddata) {
    if (!pythonFinished) {
      setTimeout(uploadToMongoDB, 1000); // Check again after 1 second
      return;
    }

    console.log("!!Function of mongodb is called!!");
    await PredictedCases.deleteMany({})
      .then(async () => {
        console.log("Collection cleared");

        // const predicteddata = require("../../pred_data/merged_predicted_data.json");

        await new Promise((resolve) => setTimeout(resolve, 4000));

        console.log("Delayed for 4 seconds for getting data.");

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

  await setTimeout(() => {
    console.log("Shimmering");
    res.redirect("/predict");
  }, 6000);
};
