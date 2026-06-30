import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Page.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('kandidat');
  const [greska, setGreska] = useState('');
  const [uspjeh, setUspjeh] = useState('');
  const navigate = useNavigate();

  const posaljiRegistraciju = async () => {
    setGreska('');
    setUspjeh('');
    try {
      await api.post('/auth/register', { name, email, password, role });
      setUspjeh('Uspješna registracija!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setGreska(err.response?.data?.message || 'Greška pri registraciji');
    }
  };

  return (
    <div className="page">
      <h1>Registracija</h1>
      <div className="forma">
        <input
          type="text"
          placeholder="Ime i prezime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="kandidat">Kandidat</option>
          <option value="poslodavac">Poslodavac</option>
        </select>
        {greska && <p className="greska">{greska}</p>}
        {uspjeh && <p className="uspjeh">{uspjeh}</p>}
        <button onClick={posaljiRegistraciju}>Registruj se</button>
      </div>
    </div>
  );
}

export default Register;