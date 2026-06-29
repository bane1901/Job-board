const pool = require('../db');

//Kreiram novi oglas
const kreirajOglas = async (req, res) => {
    try{
        const{employer_id,category_id,title,description,location,job_type,salary_min,salary_max} = req.body;

        if(!title || !employer_id){
            return res.status(400).json({message:'Naslov i poslodavac su obavezni'});

        }

        const [result] = await pool.query(
            `INSERT INTO jobs (employer_id,category_id,title,description,location,job_type,salary_min,salary_max)
             VALUES(?,?,?,?,?,?,?,?)`,
             [employer_id,category_id || null, title, description,location,job_type,salary_min,salary_max]
        );
    res.status(201).json({message:'Oglas kreiran',jobId: result.insertId});

    }catch(err){
        console.log('Greska pri kreiranju oglasa',err.message);
        res.status(500).json({message:'Greska na serveru'})
    }

};

//Vrati sve oglase
const sviOglasi = async(req,res)=>{
    try{
        const[oglasi] = await pool.query(
            `SELECT jobs.*, users.name AS poslodavac, categories.name AS kategorija
             FROM jobs
             LEFT JOIN users ON jobs.employer_id = users.id
             LEFT JOIN categories ON jobs.category_id = categories.id
             ORDER BY jobs.created_at DESC`
        );
        res.json(oglasi);
    }catch (err){
        console.log('Greska pri citanju oglasa', err.message);
        res.status(500).json({message:'Greska na serveru'})
    }
};

// Izmijeni oglas
const izmijeniOglas = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, title, description, location, job_type, salary_min, salary_max } = req.body;

    const [result] = await pool.query(
      `UPDATE jobs SET category_id=?, title=?, description=?, location=?, job_type=?, salary_min=?, salary_max=?
       WHERE id=?`,
      [category_id || null, title, description, location, job_type, salary_min, salary_max, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Oglas nije pronadjen' });
    }
    res.json({ message: 'Oglas izmijenjen' });
  } catch (err) {
    console.log('Greska pri izmjeni oglasa:', err.message);
    res.status(500).json({ message: 'Greska na serveru' });
  }
};

// Obrisi oglas
const obrisiOglas = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM jobs WHERE id=?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Oglas nije pronadjen' });
    }
    res.json({ message: 'Oglas obrisan' });
  } catch (err) {
    console.log('Greska pri brisanju oglasa:', err.message);
    res.status(500).json({ message: 'Greska na serveru' });
  }
};
module.exports = {kreirajOglas, sviOglasi, izmijeniOglas,obrisiOglas};