const express = require('express');
const router = express.Router();
const {kreirajOglas, sviOglasi , izmijeniOglas, obrisiOglas} = require('../controllers/jobController');

router.post('/', kreirajOglas);
router.get('/',sviOglasi);
router.put('/:id',izmijeniOglas);
router.delete('/:id',obrisiOglas);

module.exports = router;
