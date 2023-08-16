import Database from 'better-sqlite3';
import 'dotenv/config';    

const {DB_DATABASE}  = process.env
const db = new Database(DB_DATABASE);

export default db;