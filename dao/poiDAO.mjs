import db from "../public/scripts/db.mjs";
const table = "pointsofinterest"

class poiDAO{

    constructor(){
        this.db = db
        this.table = table
    }

    getAllPoi(){   // testing purposes 
        const sql = this.db.prepare( `SELECT * FROM ${table}`);
        const rows = sql.all();
        return rows;
    }

    postPoi(name,type,country,region,lon,lat,description,recommendations){
        const sql = this.db.prepare(`INSERT INTO ${table} (name,type,country,region,lon,lat,description,recommendations) VALUES (?,?,?,?,?,?,?,?)`);
        const info = sql.run(name,type,country,region,lon,lat,description,recommendations);
        return info;
    }

    getPoiById(id){
        const sql = this.db.prepare(`UPDATE ${table} SET recommendations=recommendations+1 WHERE id=?`);
        const row = sql.run(id);
        return row;
    }

    getPoiById2(id){       
        const sql = this.db.prepare(`SELECT * FROM ${table} WHERE id=?`);
        const row = sql.all(id);
        return row;
    }

    getPoiByRegion(region){
        const sql = this.db.prepare(`SELECT * FROM ${table} WHERE region=?`);
        const row = sql.all(region);
        return row;
    }


}
export default poiDAO;