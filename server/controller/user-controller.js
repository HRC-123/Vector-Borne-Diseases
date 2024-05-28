const mongoose = require("mongoose");
const PredictedCases = require("../models/predicted");
const Cases = require("../models/train");
const fs = require("fs");
const path = require("path");

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
  // // Train data must be fetfched
  // const Training_Cases = await Cases.find()
  //   .then((Training_Cases) => {
  //     const filePath = "./train_data/final_merged_data.json";

  //     // Convert data to JSON string
  //     const jsonData = JSON.stringify(Training_Cases);

  //     // Write data to the JSON file
  //     fs.writeFile(filePath, jsonData, (err) => {
  //       if (err) {
  //         console.error("Error writing to file:", err);
  //       } else {
  //         console.log("Data saved to", filePath);
  //       }
  //     });

  //     const { exec } = require("child_process");

  //     // Execute pip install command with requirements.txt
  //     exec(
  //       "python -m pip install -r requirements.txt",
  //       (error, stdout, stderr) => {
  //         if (error) {
  //           console.error(
  //             `Error installing Python libraries: ${error.message}`
  //           );
  //           return;
  //         }

  //         if (stderr) {
  //           console.error(`stderr: ${stderr}`);
  //           return;
  //         }

          
  //         console.log("Successfully installed Python libraries");
  //       }
  //     );
  // })
  // .catch((err) => {
  //     console.log("Some error in user-controller ", err);
  // }).then(async() => {
    
  //   // await uploadWeatherData();
  //   res.render("predmain", { page_name: "prediction-main", name });
    

    
  // });
  
//   async function uploadWeatherData() {
       
//     const jsonFilePath = "./pred_data/pred_average_weather.json";
// console.log("Getting weather data1");
//     // Read JSON file
//     fs.readFile(jsonFilePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading JSON file:', err);
//         return;
//       }
      
//       console.log("Getting weather data");
//       // Parse JSON data
//       const weatherData = JSON.parse(data);

//       console.log(weatherData);



//     });
//   }
  //   // console.log(Training_Cases);

  res.render("predmain", { page_name: "prediction-main", name });
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
  // let key = "WSNQZWEZNE5AQP2XZQ59X6UQY";

  //  let key = 'GSPTME74QY4MCLVEWAYKFNZHH'
  // key2 = 'WSNQZWEZNE5AQP2XZQ59X6UQY'

   let key = 'PBFXZFMNYFBEKACLKZCXK4GH6'
  //  key2 = 'LXWFVR47A3GE9W8PKRU3UGGG6'

  console.log(location, from, to);
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${from}/${to}?unitGroup=metric&include=days&key=${key}&contentType=json`
  );
  const data = await response.json();

};

exports.getFileCSV = async (req, res) => {
  // console.log(__dirname);
  const filePath = path.join(__dirname, "../../pred_data","merged_predicted_data.csv");
  res.download(filePath, "Predicted_Cases.csv", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
    }
  });

}

exports.getFileJSON = async (req, res) => {
  // console.log(__dirname);
  const filePath = path.join(
    __dirname,
    "../../pred_data",
    "merged_predicted_data.json"
  );
  res.download(filePath, "Predicted_Cases.json", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
    }
  });
};




