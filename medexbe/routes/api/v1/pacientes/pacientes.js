const express = require('express');
const router = express.Router();

const Paciente = new require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new Paciente();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            msg: 'Pacientes',
            updates: new Date(2022, 0, 19, 18, 41)
        }
    );
}); //GET /

router.get('/all', async (req, res) => {
    try{
        const rows = await pacienteModel.getAll();
        res.status(200).json(
            {
                status: 'ok',
                pacientes: rows
            }
        );
    }catch(err){
        console.error(err);
        res.status(500).json({status: 'failed'});
    }
});// GET /all

router.get('/byid/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const row = await pacienteModel.getById(parseInt(id));
        res.status(200).json(
            {
                status: 'ok',
                pacientes: row
            }
        );
    }catch(err){
        console.error(err);
        res.status(500).json({status: 'failed'});
    }
});// GET /byid/:id

router.post('/new', async (req, res) => {
    const { nombres, apellidos, identidad, email, telefono } = req.body;
    let rslt;
    try{
        rslt = await pacienteModel.new(nombres, apellidos, identidad, telefono, email);
        
        res.status(200).json(
            {
                status: 'ok', 
                result: rslt
            }
        );
    }catch(err){
        console.error(err);
        res.status(503).json(
            {
                status: 'failed', 
                result: rslt
            }
        );
    }

});// POST /new

router.put('/update/:id', async (req, res) => {
    const { nombres, apellidos, identidad, email, telefono } = req.body;
    const { id } = req.params;
    let result;
    try {
        result =  await pacienteModel.update(id, nombres, apellidos, identidad, telefono, email);
        res.status(200).json(
            {
                status: 'ok',
                result: result
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 'failed'});
    }
});// PUT /update/:id

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    let result;
    try {
        result =  await pacienteModel.deleteOne(id);
        res.status(200).json(
            {
                status: 'ok',
                result: result
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 'failed'});
    }
});// DELETE /delete/:id


//router.post();
//router.put();
//router.delete();

module.exports = router;
