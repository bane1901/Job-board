import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Page.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [greska, setGreska] = useState('');
  const navigate = useNavigate();

  const posaljiPrijavu = async () => {
    setGreska('');
    try {
      const res = await api.post('/auth/login', { email, password });
      // sačuvaj token i podatke korisnika
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/'); // vrati na početnu
    } catch (err) {
      setGreska(err.response?.data?.message || 'Greška pri prijavi');
    }
  };

  return (
    <div className="page">
      <h1>Prijava</h1>
      <div className="forma">
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
        {greska && <p className="greska">{greska}</p>}
        <button onClick={posaljiPrijavu}>Prijavi se</button>
      </div>
    </div>
  );
}

export default Login;