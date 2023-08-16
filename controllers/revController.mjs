import revDAO from "../dao/revDAO.mjs";

class revController{

    constructor(db){
        this.dao = new revDAO(db,"poi_reviews")
    }

    apiGetAllRevs(req,res,next){     /// get all revs  (1)
        const revs = this.dao.getAllRevs()
        res.json(revs)
    }

    apiGetRevById(req,res,next){   /// get rev by id     (3)                /// idea: this instant adds a recomendation on review, shouldnt it increase after update?
        const id = req.params.id;
        try{
            const rev = this.dao.getRevById(id)
            if (rev){
                //res.json(rev)
                res.status(200).json({massage: "Found!"});
            }else{
                res.status(404).json({ error: "Review not found" });
            }
        }catch(e){
            res.status(500).json({error: e});
        }
    }

    apiPostRev(req, res, next) {
        try {
          let uname = req.session.username;
          if (uname) {
            const { id, review } = req.body; // use req.body instead of req.params
              //console.log(id);
             // console.log(review);
              this.dao.postRev(id, review);
              res.status(201).json({ message: 'Review added successfully' });
              return;
            
          } else {
            res.status(401).json({ error: "You're not logged in. Go away!" });
          }
        } catch (e) {
          res.status(500).json({ error: e });
        }
    }

    apiReturnRevById(req,res,next){ 
      const id = req.params.id;
        try{
            const rev = this.dao.getRevById(id)
            if (rev){
                //res.json(rev)
                res.status(200).json(rev);
            }else{
                res.status(404).json({ error: "Review not found" });
            }
        }catch(e){
            res.status(500).json({error: e});
        }
    }

    apiPost2(req,res,next){
        const {id,review} = req.params
        let uname = req.session.username;
        if (uname) {
            try{
                if(review){
                    this.dao.postRev(id,review)
                res.status(201).json({message: "Review added successfully"});
                }else{
                    res.status(400).json({error: "Bad request"});
                }
            }catch(e){
                res.status(500).json({error: e});
            }
        }else{
            res.status(401).json({ error: "You're not logged in. Please log in first" });
            }
    }
    
    apiGetSession(req,res){

        res.json({poid: req.session.poid|| null} );   /// making it an integer 
    }

   

}
export default revController;