const mongoose = require("mongoose");

//GET
//Home Page
exports.homepage = async (req, res) => {
  const name = "Cases";
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
  const name = "Prediction Cases";
  res.render("predmain", { page_name: "prediction-main", name });
};

exports.getTheData = async (req, res) => {
  const name = "Prediction Cases";
    console.log("hii boys");
    const body = await req.body;
    console.log(req.body);
    const location = body.location;
    const from = body.from;
    const to = body.to;
   const response = await fetch(
     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${from}/${to}?unitGroup=metric&key=EJ36RA47MPQKB6JB39SDUEKV8&contentType=json`
   );
       const data = await response.json();
    let arr = data.days;
    console.log(data.timezone);
    for (let i = 0; i < arr.length; i++){
        console.log(arr[i].datetime, arr[i].temp);
    }
//    console.log(data);
  res.redirect("/predict");
};
