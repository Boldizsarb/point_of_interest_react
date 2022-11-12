const express = require("express"); // importing express
//const res = require("express/lib/request");
const app = express();

app.set("view engine", "ejs"); // seting up ejs views enginge
app.use(express.static("static"));  // static elements whereabouts
app.use("/static", express.static('./static/'));

app.get("/", (req, res) =>{
    res.render("index"); // file name only. it will be rendered onto the page 
    });

app.get("/about", (req, res) =>{
    res.render("aboutme");  
    });

app.get("/contact", (req, res) =>{
    res.render("contact");  
    });

app.get("/resume", (req, res) =>{
    res.render("resume");  
    });

app.get("/after", (req, res) =>{
    res.render("after");  
    });
  
app.get("/aboutmestory", (req, res) =>{
    res.render("aboutmestory");  
    });

app.get("/try", (req, res) =>{
  res.render("try");  
  });

    app.get("/first", (req, res) =>{
      res.render("particles/first");  
      });
    
    app.get("/second", (req, res) =>{
      res.render("particles/second");  
      });

    app.get("/third", (req, res) =>{
      res.render("particles/third");  
      });
  

app.listen(3000, ()=>{console.log("Server started!")});

/////////// Email
// installing dependencies 
const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');




// body parser 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// sending the info 
app.post('/send', (req, res) => {
    console.log(req.body.name, req.body.email,req.body.enquery);
    const output = `<p>New Email from website</p>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Enquery: ${req.body.enquery}</li>
    </ul>`;
      
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //host: "smtp-relay.sendinblue.com",
    service: "Hotmail",
    //port: 587,
    //secure: false, // true for 465, false for other ports
    auth: {
      user:'askdfjsopdfjapjeg@outlook.com' , // generated ethereal user
      pass: 'Ihatemicrosoft' // generated ethereal password
    }   /* ,
    // the localhost
    tls:{
        rejectUnauthorized:false
    } */
  });

  // send mail with defined transport object
  let options = {
    from: 'askdfjsopdfjapjeg@outlook.com', // sender address
    to: "donboyszy@gmail.com", // list of receivers
    subject: "Website Email ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };
  transporter.sendMail(options, (console, (error, info)=>{
    if (error){
        return console.log(error); 
    }
    

  res.render('after');
  

}));
});