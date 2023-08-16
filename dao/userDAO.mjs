import db from "../public/scripts/db.mjs";
const table = "poi_users"

class userDAO{

    constructor(){
        this.db = db
        this.table = table
    }

    getUserByUsernameAndPassword(username,password){

        const sql = this.db.prepare(`SELECT * FROM ${table} WHERE username=? AND password=?`);
        const users = sql.all(username,password);
        return users;
    }

    getAllUsers(){
        const sql = this.db.prepare(`SELECT * FROM ${table}`);
        const users = sql.all();
        return users;
    }


}
export default userDAO;