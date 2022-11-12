const express = require("express"); // importing express
//const res = require("express/lib/request");
const app = express();

app.set("view engine", "ejs"); // seting up ejs views enginge
app.use(express.static("static"));  // static elements whereabouts
app.use("/static", express.static('./static/'));

app.get("/", (req,res)=>{
    res.render("index")
});

app.get("/contact", (req,res)=>{
    res.render("contact")
});

app.get("/thankyou", (req,res)=>{
    res.render("thankyou")
});

app.get("/faq", (req,res)=>{
    res.render("faq")
});

app.get("/work", (req,res)=>{
    res.render("work")
});

app.get("/about", (req,res)=>{
    res.render("about")
});

app.get("/tips", (req,res)=>{
    res.render("particles/tips")
});

app.get("/faq2", (req,res)=>{
    res.render("particles/faq2")
});

app.get("/car", (req,res)=>{
    res.render("particles/car")
});

app.get("/bus", (req,res)=>{
    res.render("particles/bus")
});

app.get("/lorry", (req,res)=>{
    res.render("particles/lorry")
});

app.get("/adverts", (req,res)=>{
    res.render("particles/adverts")
});

app.listen(3000, ()=>{console.log("Server started!")});