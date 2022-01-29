const getDb = require('../db');
let db = null;

class Pacientes {

  constructor() {
    getDb()
    .then( (database) => {
      db = database;
      if (process.env.MIGRATE === 'true') {
        const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombres TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
        db.run(createStatement);
      }
    })
    .catch((err) => { console.error(err)});
  }

  //Add new "paciente"
  new ( nombres, apellidos, identidad, telefono, correo) {
    return new Promise( (accept, reject)=> {
      db.run(
        'INSERT INTO pacientes (identidad, nombres, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);',
        [identidad, nombres, apellidos, correo, telefono],
        (err, rslt)=>{
          if(err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });
  }

  //Get all "pacientes"
  getAll() {
    return new Promise ( (accept, reject) => {
      db.all( 'SELECT * FROM pacientes;', (err, rows) => {
          if(err){
              console.error(err);
              reject(err);
          }else{
              accept(rows);
          }
      });
    });
  }

  //Get one "paciente" by id
  getById(id) {
    return new Promise ( (accept, reject) => {
      db.get( 'SELECT * FROM pacientes where id = ?;', 
      [id], 
      (err, row) => {
          if(err){
              console.error(err);
              reject(err);
          }else{
              accept(row);
          }
      });
    });
  }

  update (id, nombres, apellidos, identidad, telefono, correo) {
    return new Promise( (resolve, reject) => {
      const sqlUpdate = `UPDATE pacientes 
                          SET nombres = ?,
                          apellidos = ?,
                          telefono = ?,
                          identidad = ?,
                          email = ? 
                          WHERE id = ?;`;
      db.run(
        sqlUpdate,
        [nombres, apellidos, telefono, identidad, correo, id],
        function (err) {
          if(err){
            console.error(err);
            reject(err);
          }else{
            resolve(this);
          }
        }
      )
    });
  }

  deleteOne (id) {
    return new Promise ((resolve, reject) => {
      const sqlDeleteOne = 'DELETE FROM pacientes WHERE id = ?;';
      db.run(
        sqlDeleteOne,
        [id],
        function (err) {
          if(err){
            console.error(err);
            reject(err);
          }else{
            resolve(this);
          }
        }
      )
    })
  }

}//FIN CLASE PACIENTES

module.exports = Pacientes;