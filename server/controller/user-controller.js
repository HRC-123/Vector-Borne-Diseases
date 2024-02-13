
const mongoose = require("mongoose");

//GET
//Home Page
exports.homepage = async(req,res)=>{
    const name  = "Cases";
    res.render("main",{page_name: 'main',name});
}
exports.vaccines = async(req,res)=>{
    const name  = "Vaccines";
    res.render("vaccines",{page_name: 'vaccines',name});
}
exports.variants = async(req,res)=>{
    const name  = "Variants";
    res.render("variants",{page_name: 'variants',name});
}
exports.about = async(req,res)=>{
    const name  = "About";
    res.render("about",{page_name: 'about',name});
}
exports.data = async(req,res)=>{
    const name  = "Data";
    res.render("data",{page_name: 'data',name});
}
