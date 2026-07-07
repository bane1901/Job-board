import { useState, useEffect } from 'react';
import api from '../api';
import './Page.css';
import { Link } from 'react-router-dom';

function Home() {
  const [oglasi, setOglasi] = useState([]);
  const [greska, setGreska] = useState('');

  // polja za pretragu
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');


  // ucitaj sve oglase na pocetku
  useEffect(() => {
    ucitajOglase();
  }, []);

  const ucitajOglase = async () => {
    try {
      const res = await api.get('/jobs');
      setOglasi(res.data);
    } catch (err) {
      setGreska('Greška pri učitavanju oglasa');
    }
  };

  const pretrazi = async () => {
    setGreska('');
    try {
      // sastavi parametre samo od popunjenih polja
      const params = {};
      if (q) params.q = q;
      if (location) params.location = location;
      if (jobType) params.job_type = jobType;
      //if (salaryMin) params.salary_min = salaryMin;

      const res = await api.get('/jobs/search', { params });
      setOglasi(res.data);
    } catch (err) {
      setGreska('Greška pri pretrazi');
    }
  };

  const resetuj = () => {
    setQ('');
    setLocation('');
    setJobType('');
    ucitajOglase();
  };

  return (
    <div className="page">
      <h1>Oglasi za posao</h1>

      <div className="pretraga">
        <input
          placeholder="Pretraži po nazivu..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          placeholder="Lokacija"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Svi tipovi</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
        </select>
       
        <button onClick={pretrazi}>Pretraži</button>
        <button onClick={resetuj} className="reset-btn">Reset</button>
      </div>

      {greska && <p className="greska">{greska}</p>}

      {oglasi.length === 0 && !greska && <p>Nema oglasa za date kriterijume.</p>}

      {oglasi.map((oglas) => (
        <div key={oglas.id} className="oglas-kartica">
          <h3><Link to={`/oglas/${oglas.id}`} className="oglas-link">{oglas.title}</Link></h3>
          <p className="firma">{oglas.poslodavac} · {oglas.location}</p>
          <p>{oglas.description}</p>
          <p className="detalji">
            {oglas.kategorija} · {oglas.job_type} · {oglas.salary_min}–{oglas.salary_max}€
          </p>
        </div>
      ))}
    </div>
  );
}

export default Home;