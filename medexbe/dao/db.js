const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = path.resolve(__dirname, `${process.env.DB_FILENAME}.sqlite3`);

let db = null;/* new sqlite3.Database(
    dbFile,
    (err) => {
        if(err) {
            console.error(err);
        }
        console.log('Conectado');
    }
);

module.exports = db; */

const initDB = () => {
    return new Promise ( (resolve, reject) => {
        let database = new sqlite3.Database(
            dbFile,
            (err) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }
                resolve(database);
            }
        );
    });
}

const singletonGetDB = async () => {
    if(!db) {
        db = await initDB();
    }
    return db;
}

module.exports = singletonGetDB;