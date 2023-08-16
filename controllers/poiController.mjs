import poiDAO from "../dao/poiDAO.mjs";

class poiController{

    constructor(db){
        this.dao = new poiDAO(db,"pointsofinterest")
    }


    apiGetAllPoi(req,res,next){    /// get all poi  (1)
        try{
            const poi = this.dao.getAllPoi()
        res.status(200).json(poi)

        }catch(e){
            res.status(500).json({error: e});
        }
        
    }

    apiGetPoiById(req,res,next){   /// get poi by id     (3)                /// idea: this instant adds a recomendation on review, shouldnt it increase after update? 
        const id = req.params.id;
        try{
            const poi = this.dao.getPoiById(id)
            if (poi){
                //res.json(poi)
                res.status(200).json({massage: "Recomendation added!"});
            }else{
                res.status(404).json({ error: "Point of interest not found" });
            }
           
        }catch(e){
            res.status(500).json({error: e});
        }
        
    }

    apiGetPoiById2(req,res,next){   /// get poi by id     (3)                /// idea: this instant adds a recomendation on review, shouldnt it increase after update? 
        const id = req.params.id;
        try{
                const poi = this.dao.getPoiById2(id)
                if (poi.lenght === 0){
                    res.status(404).json("404")
                }else{
                    console.log(poi)
                    res.status(200).json(poi)
                    //res.status(200).json({massage: "POI Found"});
                    
                }
           
        }catch(e){
            res.status(500).json({error: e});
        }
        
    }
 
    apiPostPoi(req,res){     /// Add poi  (2)
        const {name,type,country,region,lon,lat,description,recommendations} = req.params;
        try{
            let uname = req.session.username;
            if(uname){
            if(!name || !type || !country || !region || !lon || !lat || !description || !recommendations){   // checking for empty spaces
                res.status(400).json({error: "Empty space! Please fill up all of them!"});
                return;
            }
            this.dao.postPoi(name,type,country,region,lon,lat,description,recommendations);
            res.status(201).json({ message: 'Artist added successfully' });
            }else{
                res.status(401).json({error: "You're not logged in. Please log in first!"})
            }
        }catch(e){
            res.status(500).json({error: e});
        }
        //bigger than 1 
    }

    apiPostPoi2(req, res, next) { ///// picture
        const { name, type, country, region, lon, lat, description, recommendations } = req.params;
        try {
          let uname = req.session.username;
          if (uname) {
            if (!name || !type || !country || !region || !lon || !lat || !description || !recommendations) {
              res.status(400).json({ error: "Empty space! Please fill up all of them!" });
              return;
            }
            const newPoiId = this.dao.postPoi(name, type, country, region, lon, lat, description, recommendations);
            res.status(201).json({ message: 'POI added successfully', id: newPoiId });
          } else {
            res.status(401).json({ error: "You're not logged in. Go away!" })
          }
        } catch (e) {
          res.status(500).json({ error: e });
        }
    }




    apiGetPoiByRegion(req,res,next){   /// get poi by region     (4)
        const region = req.params.region;
        try{
            const poi = this.dao.getPoiByRegion(region)
            if (poi){
                res.status(200).json(poi)
            }else{
                res.status(404).json({ error: "Point of interest not found" });
            }
            
        }catch(e){
            res.status(500).json({error: e});
        }   
    }

    conveyPoi(req,res,next){ //////////// for reviews (12)
        
        res.redirect( "/public/revAdd.html")
    }

    













}
export default poiController;