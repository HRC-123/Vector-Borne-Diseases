const express = require('express');
const app = express();
const path = require("path");
let port = 5678;
let hostname = '0.0.0.0';
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const static_path = path.join(__dirname, "/public");
app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/Templates"));
app.set("layout", "../Templates/main");

app.use('/', require('./server/routes/route'));
require('dotenv').config();
const connectDB = require("./server/config/db");
connectDB();

app.listen(process.env.PORT || port,hostname,()=>{
    console.log('Server is running on port : 1234');
    // console.log(__dirname);
})
