import db from "../public/scripts/db.mjs";
const table = "poi_reviews"

class revDAO{

    constructor(){
        this.db = db
        this.table = table
    }

    getAllRevs(){
        const sql = `SELECT * FROM ${table}`
        return this.db.prepare(sql).all()
    }

    getRevById(id){
        const sql = `SELECT * FROM ${table} WHERE poi_id=? ORDER BY id DESC`
        return this.db.prepare(sql).all(id)
    }

    postRev(poi_id,review){
        const sql = this.db.prepare(`INSERT INTO ${table} (poi_id,review) VALUES (?,?)`);
        const info = sql.run(poi_id,review);
        return info;
    }

    postRev2(poi_id,review){
        const sql = this.db.prepare(`INSERT INTO ${table} (poi_id,review) VALUES (?,?)`);
        const info = sql.run(poi_id,review);
        return info;
    }



}

export default revDAO;