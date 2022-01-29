const express = require("express");
const router = express.Router();

const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');

router.use('/pacientes', pacientesRoutes);
router.use('/expedientes',expedientesRoutes);

module.exports = router;
