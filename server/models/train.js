
const mongoose = require("mongoose");
// const { Number } = require("mongodb");
const Schema = mongoose.Schema;
const Train_Schema = new Schema({
  District: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Month: {
    type: Number,
  },
  Avg_Temp: {
    type: Number,
  },
  Avg_Feelslike: {
    type: Number,
  },
  Avg_Dew: {
    type: Number,
  },
  Avg_Humidity: {
    type: Number,
  },
  Avg_Precipitation: {
    type: Number,
  },
  Avg_Precipitation_Probability: {
    type: Number,
  },
  Avg_Precipitation_Coverage: {
    type: Number,
  },
  Avg_Snowfall: {
    type: Number,
  },
  Avg_Snow_Depth: {
    type: Number,
  },
  Avg_Wind_Gust: {
    type: Number,
  },
  Avg_Wind_Speed: {
    type: Number,
  },
  Avg_Wind_Direction: {
    type: Number,
  },
  Avg_Pressure: {
    type: Number,
  },
  Avg_Cloud_Cover: {
    type: Number,
  },
  Avg_Visibility: {
    type: Number,
  },
  Avg_Solar_Radiation: {
    type: Number,
  },
  Avg_Solar_Energy: {
    type: Number,
  },
  Avg_UV_Index: {
    type: Number,
  },
  Cases: {
    type: Number,
  },
});

module.exports = mongoose.model("Cases", Train_Schema);
