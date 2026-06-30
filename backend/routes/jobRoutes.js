const express = require('express');
const router = express.Router();
const { kreirajOglas, sviOglasi, izmijeniOglas, obrisiOglas, pretragaOglasa } = require('../controllers/jobController');
const upload = require('../middleware/upload');

router.get('/search', pretragaOglasa);
router.post('/', upload.single('logo'), kreirajOglas);
router.get('/', sviOglasi);
router.put('/:id', izmijeniOglas);
router.delete('/:id', obrisiOglas);

module.exports = router;