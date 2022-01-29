const express = require('express');
const router = express.Router();
const Expediente = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expediente();

router.get('/all', async (req, res) => {
    try {
        const rows = await expedienteModel.getAll();
        res.status(200).json(
            {
                status: 'ok',
                expedientes: rows
            }
        );
    } catch (error) {
        res.status(503).json({status: 'failed'});
    }
});// GET /all

router.get('/byid/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const row = await expedienteModel.getById(id);
        res.status(200).json({
            status: 'ok',
            expediente: row
        });

    } catch (error) {
        res.status(500).json({status: 'failed'});
    }
});// GET /byid/:id

router.post('/new', async (req, res) => {
    const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;

    let rslt;
    try{
        rslt = await expedienteModel.new(identidad, fecha, descripcion, observacion, registros, ultimaActualizacion);
        
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
    const { id } = req.params;
    let result;
    try {
        result = await expedienteModel.update(id, ...req.body);

        res.status(200).json(
            {
                status: 'ok',
                result
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 'failed'});
    }
});//PUT /update/:id

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    let result;
    try {
        result = await expedienteModel.deleteOne(id);

        res.status(200).json(
            {
                status: 'ok',
                result
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 'failed'});
    }
});// DELETE /delete/:id

module.exports = router;