const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registracija novog korisnika
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Sva polja su obavezna' });
    }

    const [postojeci] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (postojeci.length > 0) {
      return res.status(400).json({ message: 'Email vec postoji' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upis korisnika u bazu
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'kandidat']
    );

    res.status(201).json({
      message: 'Korisnik uspjesno registrovan',
      userId: result.insertId
    });
  } catch (err) {
    console.log('Greska pri registraciji:', err.message);
    res.status(500).json({ message: 'Greska na serveru' });
  }
};

//Prijava (login) korisnika
// Prijava (login) korisnika
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email i lozinka su obavezni' });
    }

    // Trazim korisnika po emailu
    const [korisnici] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (korisnici.length === 0) {
      return res.status(400).json({ message: 'Pogresan email ili lozinka' });
    }

    const korisnik = korisnici[0];

    // Uporedi unijetu lozinku sa sifrovanom u bazi
    const tacnaLozinka = await bcrypt.compare(password, korisnik.password);
    if (!tacnaLozinka) {
      return res.status(400).json({ message: 'Pogresan email ili lozinka' });
    }

    // Napravi JWT token
    const token = jwt.sign(
      { id: korisnik.id, role: korisnik.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Uspjesna prijava',
      token,
      user: {
        id: korisnik.id,
        name: korisnik.name,
        email: korisnik.email,
        role: korisnik.role
      }
    });
  } catch (err) {
    console.log('Greska pri prijavi:', err.message);
    res.status(500).json({ message: 'Greska na serveru' });
  }
};




module.exports = { register, login };