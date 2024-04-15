const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Predicted_Schema = new Schema({
  Year: {
    type: Number,
    required: true,
  },
  Month: {
    type: Number,
    required: true,
  },
  Predicted_Cases: {
    type: Number,
    required: true,
  },
});



module.exports = mongoose.model("PredictedCases", Predicted_Schema);
