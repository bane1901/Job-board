import { useState, useEffect } from 'react';
import api from '../api';
import './Page.css';

function Home() {
  const [oglasi, setOglasi] = useState([]);
  const [greska, setGreska] = useState('');

  useEffect(() => {
    api.get('/jobs')
      .then((res) => setOglasi(res.data))
      .catch(() => setGreska('Greška pri učitavanju oglasa'));
  }, []);

  return (
    <div className="page">
      <h1>Oglasi za posao</h1>
      {greska && <p>{greska}</p>}
      {oglasi.map((oglas) => (
        <div key={oglas.id} className="oglas-kartica">
          <h3>{oglas.title}</h3>
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