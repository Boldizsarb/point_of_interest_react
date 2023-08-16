import express from 'express';
const revRouter = express.Router();
import db from '../public/scripts/db.mjs';
import revController from "../controllers/revController.mjs";
const revControl = new revController(db)

revRouter.use(express.json())

revRouter.get("/getAllrev", revControl.apiGetAllRevs.bind(revControl));

revRouter.get("/getrev/:id", revControl.apiGetRevById.bind(revControl));

revRouter.post("/postrev", revControl.apiPostRev.bind(revControl));

revRouter.get("/getSes", revControl.apiGetSession.bind(revControl));

revRouter.get("/return/:id", revControl.apiReturnRevById.bind(revControl));

revRouter.post("/postrev/:id/:review", revControl.apiPost2.bind(revControl));


export default revRouter;