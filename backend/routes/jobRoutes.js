const express = require('express');
const router = express.Router();
const {kreirajOglas, sviOglasi , izmijeniOglas, obrisiOglas, pretragaOglasa} = require('../controllers/jobController');

router.post('/', kreirajOglas);
router.get('/',sviOglasi);
router.put('/:id',izmijeniOglas);
router.delete('/:id',obrisiOglas);
router.get('/search', pretragaOglasa);

module.exports = router;
