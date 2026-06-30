
const pool = require('../db');

// prijava za oglas
const prijaviSe = async (req, res) => {
    try{
        const {job_id, candidate_id, message} = req.body;
        const cv_file = req.file ? req.file.filename : null;

        if(!job_id|| !candidate_id) {
            return res.status(400).json({message:'Oglas i kandidat su oibavezni'});

        }

        const [result] = await pool.query(
            `INSERT INTO applications (job_id, candidate_id, cv_file, message)
             VALUES (?, ?, ?, ?)`,
             [job_id,candidate_id,cv_file,message]
        );

        res.status(201).json({message:'Prijava poslata', applicationId:result.insertId});

    }catch (err){
        console.log('Greska pri prijavi', err.message);
        res.status(500).json({message:'Greska na serveru'});
    }
};

//prijave za odredjeni oglas (za poslodavca/admina)

const prijaveZaOglas = async(req,res) => {
    try{
        const {jobId} = req.params;
        const [prijave] = await pool.query(
            `SELECT applications.*,users.name AS kandidat,users.email
             FROM applications
             LEFT JOIN users ON applications.candidate_id = users.id
             WHERE applications.job_id = ?
             ORDER BY applications.created_at DESC`,
             [jobId]
        );
        res.json(prijave);
    }catch(err){
        console.log('Greska pri citanju prijava', err.message);
        res.status(500).json({message:'Greska na serveru'})
    }
};

//Promijeni status prijave
const promijeniStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;

        const [result] = await pool.query(
            `UPDATE applications SET status = ? WHERE id = ?`,
            [status,id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({message:'PRijava nije prodnadjena'});
        }
        res.json({message:'Status promijenjen'});
    }catch(err){
        console.log('Greska pri promjeni statusa:', err.message);
        res.status(500).json({message:'GReska na serveru'});
    }
};

module.exports = {prijaviSe,prijaveZaOglas,promijeniStatus};    
