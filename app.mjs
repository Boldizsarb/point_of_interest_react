import express from "express";
import Database from "better-sqlite3";
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import chalk from 'chalk';   // for the green tick 
import fileUpload from 'express-fileupload';
import filePayloadExist from "./middleware/file_exist.mjs";
import fileExtLimit from "./middleware/file_extension.mjs";
import 'dotenv/config';             // dotenv

const {PORT}  = process.env


const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/public", express.static('./public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


///////////////////////////////Sessions////////Sessions

const sessDb = new Database('session.db');
const SqliteStore = betterSqlite3Session(expressSession, sessDb);
app.use(expressSession({
        // Specify the session store to be used.
      store: new SqliteStore(),    //sql lite store 
      secret: 'admin',   // purpusely not over complicated
      resave: true,  // keeping sessing active, 
      saveUninitialized: false,  // the session only saved if its not empty, if true it would be saved it even if the session is empty
      rolling: true,  // the session will be re-initialized when the browser refreshed
      unset: 'destroy',
      proxy: true,
      cookie: {
          maxAge: 600000,// 600000 ms = 10 mins expiry time
          httpOnly: false// allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
      }
}));

////////////////////////////////////////////////
// UPLOAD
app.use(fileUpload({
  limits: { fileSize: process.env.UPLOAD_LIMIT_IN_MB * 1024 * 1024 }
}));
///////// route for upload 
app.post('/photos/upload', filePayloadExist, fileExtLimit(['.png','.jpg','.jpeg']), async(req, res) => {   // with cusmtom midllawares 
  try {
      const files = req.files
      console.log(req.files)
      //console.log(req.files.userPhoto)
      res.status(200).json({success: 1});
      Object.keys(files).forEach(async (key) => {
          const filepath = './uploads/'+files[key].name
          files[key].mv(filepath,(err)=>{
              if(err){
                  return res.status(500)
                  console.log(err)
              }
          })
      })
     
  } catch(e) {
      //res.status(500).json({error: e}); // double res.json throw an error 
  }
});

app.get('/photos/:imageName', (req, res) => {   // route to GET Image 
  const imageName = req.params.imageName;
  res.sendFile(`${imageName}`, { root: 'uploads' });
});

//////////////////////POI////////Routes
import poiRouter from "./routes/poiRouter.mjs";
app.use("/poi",poiRouter);

//////////////////////USER////////Routes
import userRouter from "./routes/userRouter.mjs";
app.use("/user",userRouter);

//////////////////////REVIEWS////////Routes
import revRouter from "./routes/revRouter.mjs";
app.use("/rev",revRouter);

////////////////////////////

app.use( (req, res, next) => {     /// dont think it is working 
  if(["POST", "DELETE"].indexOf(req.method) == -1) {
      next(); // if the method post or delete, it checks if the user logged in
  } else {
      if(req.session.username) {
          next();
      } else {
          res.status(401).json({error: "You're not logged in. Go away!"});
      }
  }
});
///////////////////////////////////

app.get("/", (req, res) => {
    res.redirect( "/public/index.html"); // only this one works 
    }   
);

app.get("/addPoi", (req, res) => {
  res.redirect( "/public/poiAdd.html"); // only this one works 
  }   
);

app.get("/review", (req, res) => { ///// not used 
  res.redirect( "/public/revAdd.html"); // only this one works 
  }   
);



app.listen(PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });