import userDAO from "../dao/userDAO.mjs";
import express from 'express';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

class userController{

    constructor(db){
        this.dao = new userDAO(db,"poi_users")
    }

    apiLogin(req,res){   /// get user by username and password     (5)

        const {username,password} = req.body;
        try{
            const user = this.dao.getUserByUsernameAndPassword(username,password)
            if (user.length > 0){
                req.session.username = username;
                res.json({ success: 1 });
                console.log("login success")
                console.log(req.session.username)
            }else{
                console.log("login failed")
                res.status(401).json({ error: "Incorrect login!" });
            }
            
        }catch(e){
            res.status(500).json({error: e});
        }
    }

    apiGetSession(req,res){
        res.json({username: req.session.username || null} );
    }


    apiLogout(req,res){   ///      (10)
            req.session = null;
            res.json({ success: 1 });
            console.log("logged out")
    }
        

    
}
export default userController;