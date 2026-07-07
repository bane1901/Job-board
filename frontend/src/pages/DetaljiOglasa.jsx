import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './Page.css';

function DetaljiOglasa() {
  const { id } = useParams();
  const [oglas, setOglas] = useState(null);
  const [greska, setGreska] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then((res) => setOglas(res.data))
      .catch(() => setGreska('Oglas nije pronađen'));
  }, [id]);

  if (greska) {
    return <div className="page"><p className="greska">{greska}</p></div>;
  }

  if (!oglas) {
    return <div className="page"><p>Učitavanje...</p></div>;
  }

  return (
    <div className="page">
      <button onClick={() => navigate('/')} className="nazad-btn">← Nazad</button>
      <div className="detalji-oglas">
        <h1>{oglas.title}</h1>
        <p className="firma">{oglas.poslodavac} · {oglas.location}</p>
        <p className="detalji">
          {oglas.kategorija} · {oglas.job_type} · {oglas.salary_min}–{oglas.salary_max}€
        </p>
        <h3>Opis posla</h3>
        <p>{oglas.description}</p>

        {user && user.role === 'kandidat' && (
          <button className="prijavi-btn" onClick={() => navigate(`/prijava/${oglas.id}`)}>
            Prijavi se
          </button>
        )}
      </div>
    </div>
  );
}

export default DetaljiOglasa;