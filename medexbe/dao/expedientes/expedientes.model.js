const getDB = require('../db');
let db = null;

class Expediente {

    constructor() {
        this.initDB();
    }

    async initDB(){
        try{
            db = await getDB();
            if (process.env.MIGRATE === 'true') {
                const createStatement = `CREATE TABLE IF NOT EXISTS expedientes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        identidad TEXT, 
                        fecha TEXT,
                        descripcion TEXT,
                        observacion TEXT,
                        registros INTEGER,
                        ultimaActualizacion TEXT
                    );`;
                db.run(createStatement);
            }
        }catch (err){
            console.error(err);
        }
    }

    getAll() {
        return new Promise( (resolve, reject) => {
            db.all(
                'SELECT * FROM expedientes;',
                (err, rows) => {
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                }
            )
        });
    }

    getById(id) {
        return new Promise( (resolve, reject) =>{
            db.get(
                'SELECT * FROM expedientes WHERE id = ?;',
                [id],
                (err, row) => {
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        resolve(row);
                    }
                }
            );
        });
    }

    new (identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
        return new Promise( (resolve, reject) => {
            db.run(
                `INSERT INTO expedientes (
                    identidad,
                    fecha, 
                    descripcion, 
                    observacion, 
                    registros, 
                    ultimaActualizacion
                ) VALUES (?,?,?,?,?,?);`,
                [identidad, fecha, descripcion, observacion, registros, ultimaActualizacion],
                (err, rslt)=>{
                    if(err) {
                      console.error(err);
                      reject(err);
                    }
                    resolve(rslt);
                }
            );
        });
    }

    update(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
        return new Promise( (resolve, reject) =>{
            const sqlUpdate = 'UPDATE expedientes SET identidad = ?, fecha = ?, descripcion = ?, observacion = ?, registros = ?, ultimaActualizacion = ? WHERE id = ?;'
            db.run(
                sqlUpdate,
                [identidad, fecha, descripcion, observacion, registros, ultimaActualizacion, id],
                function (err) {
                    if(err){
                      console.error(err);
                      reject(err);
                    }else{
                      resolve(this);
                    }
                }
            );
        });
    }// END UPDATE

    deleteOne(id) {
        return new Promise( (resolve, reject) => {
            const sqlDelete = 'DELETE FROM expedientes WHERE id = ?;';
            db.run(
                sqlDelete,
                [id],
                function (err) {
                    if(err){
                      console.error(err);
                      reject(err);
                    }else{
                      resolve(this);
                    }
                }
            );
        });
    }
}

module.exports = Expediente;