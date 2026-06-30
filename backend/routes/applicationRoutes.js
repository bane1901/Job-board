const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { vjerujToken, dozvoliUloge } = require('../middleware/auth');
const { prijaviSe, prijaveZaOglas, promijeniStatus } = require('../controllers/applicationController');

// Samo ulogovan kandidat se prijavljuje
router.post('/', vjerujToken, dozvoliUloge('kandidat'), upload.single('cv'), prijaviSe);

// Samo poslodavac/admin vide prijave i mijenjaju status
router.get('/job/:jobId', vjerujToken, dozvoliUloge('poslodavac', 'admin'), prijaveZaOglas);
router.put('/:id/status', vjerujToken, dozvoliUloge('poslodavac', 'admin'), promijeniStatus);

module.exports = router;