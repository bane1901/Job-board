const express = require('express');
const router = express.Router();
const { kreirajOglas, sviOglasi, izmijeniOglas, obrisiOglas, pretragaOglasa, jedanOglas } = require('../controllers/jobController');
const upload = require('../middleware/upload');
const { vjerujToken, dozvoliUloge } = require('../middleware/auth');

// Javno - svako moze da vidi i pretrazuje
router.get('/search', pretragaOglasa);
router.get('/:id', jedanOglas);
router.get('/', sviOglasi);


// Zasticeno - samo poslodavac ili admin
router.post('/', vjerujToken, dozvoliUloge('poslodavac', 'admin'), upload.single('logo'), kreirajOglas);
router.put('/:id', vjerujToken, dozvoliUloge('poslodavac', 'admin'), izmijeniOglas);
router.delete('/:id', vjerujToken, dozvoliUloge('poslodavac', 'admin'), obrisiOglas);

module.exports = router;