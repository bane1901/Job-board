import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './Page.css';

function Prijava() {
  const { jobId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState('');
  const [cv, setCv] = useState(null);
  const [poruka, setPoruka] = useState('');
  const [greska, setGreska] = useState('');
  const navigate = useNavigate();

  const posaljiPrijavu = async () => {
    setPoruka('');
    setGreska('');
    try {
      // FormData jer saljemo i fajl
      const formData = new FormData();
      formData.append('job_id', jobId);
      formData.append('candidate_id', user.id);
      formData.append('message', message);
      if (cv) formData.append('cv', cv);

      await api.post('/applications', formData);
      setPoruka('Prijava uspješno poslata!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setGreska(err.response?.data?.message || 'Greška pri prijavi');
    }
  };

  return (
    <div className="page">
      <h1>Prijava na oglas</h1>
      <div className="forma">
        <textarea
          placeholder="Poruka poslodavcu (zašto ste dobar kandidat...)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
        />
        <label className="file-label">
          CV (PDF ili slika):
          <input type="file" onChange={(e) => setCv(e.target.files[0])} />
        </label>
        {poruka && <p className="uspjeh">{poruka}</p>}
        {greska && <p className="greska">{greska}</p>}
        <button onClick={posaljiPrijavu}>Pošalji prijavu</button>
      </div>
    </div>
  );
}

export default Prijava;