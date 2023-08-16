import express from 'express';
const poiRouter = express.Router(); // creating a router object
import db from '../public/scripts/db.mjs';
const poiControl = new poiController(db)
import poiController from "../controllers/poiController.mjs";




poiRouter.get("/Allpoi", poiControl.apiGetAllPoi.bind(poiControl));  // Get all poi    (1)
poiRouter.post("/recommend/:id",poiControl.apiGetPoiById.bind(poiControl));   // Recomend poi  (3)
poiRouter.post("/addpoi/:name/:type/:country/:region/:lon/:lat/:description/:recommendations",poiControl.apiPostPoi.bind(poiControl));   // Add poi (2)
poiRouter.get("/region/:region",poiControl.apiGetPoiByRegion.bind(poiControl));   // Get poi by region (4)

poiRouter.get("/review", poiControl.conveyPoi.bind(poiControl));  // not used 

poiRouter.post("/poid/:id", poiControl.apiGetPoiById2.bind(poiControl)); ///12 

poiRouter.post("/addpoi2/:name/:type/:country/:region/:lon/:lat/:description/:recommendations", poiControl.apiPostPoi2.bind(poiControl)); //picture



poiRouter.post('*',(req,res,next) => {   /////// (11)

    if(req.session.username == null) {        /// if there is no user it wont post 
        console.log(req.session.username)
        res.status(401).json({error: "You're not logged in. Please login first"})
        console.log("no user")
    } else {
        console.log(`Received a POST request at ${Date.now()} milliseconds. By ${req.session.username}`);
        next();
    }
});

export default poiRouter;