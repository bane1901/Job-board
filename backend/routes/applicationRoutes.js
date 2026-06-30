const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {prijaviSe, prijaveZaOglas,promijeniStatus} = require('../controllers/applicationController');

//upload cv prima jedan fajl iz polja cv
router.post('/', upload.single('cv'), prijaviSe);
router.get('/job/:jobId', prijaveZaOglas);
router.put('/:id/status', promijeniStatus);

module.exports = router;