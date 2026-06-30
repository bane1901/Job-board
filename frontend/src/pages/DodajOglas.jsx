import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Page.css';

function DodajOglas() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [poruka, setPoruka] = useState('');
  const navigate = useNavigate();

  const posaljiOglas = async () => {
    setPoruka('');
    try {
      await api.post('/jobs', {
        employer_id: user.id,
        category_id: 1,
        title,
        description,
        location,
        job_type: jobType,
        salary_min: salaryMin,
        salary_max: salaryMax
      });
      setPoruka('Oglas uspješno dodat!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setPoruka(err.response?.data?.message || 'Greška pri dodavanju');
    }
  };

  return (
    <div className="page">
      <h1>Dodaj oglas</h1>
      <div className="forma">
        <input placeholder="Naziv pozicije" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Opis posla" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />
        <input placeholder="Lokacija" value={location} onChange={(e) => setLocation(e.target.value)} />
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
        </select>
        <input type="number" placeholder="Plata od (€)" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
        <input type="number" placeholder="Plata do (€)" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
        {poruka && <p className="uspjeh">{poruka}</p>}
        <button onClick={posaljiOglas}>Objavi oglas</button>
      </div>
    </div>
  );
}

export default DodajOglas;