const express = require('express');
const app = express();
const path = require("path");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const static_path = path.join(__dirname, "/public");
app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/Templates"));
app.set("layout", "../Templates/main");

app.use('/',require('./server/routes/route'));

app.listen(1234,()=>{
    console.log('Server is running on port : 1234');
    // console.log(__dirname);
})