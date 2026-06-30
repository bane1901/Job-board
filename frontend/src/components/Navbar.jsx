import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const odjava = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

 
  let desniDio;

    if (user) {
    desniDio = (
      <div className="navbar-desno">
        {(user.role === 'poslodavac' || user.role === 'admin') && (
          <Link to="/dodaj-oglas">Dodaj oglas</Link>
        )}
        <span className="pozdrav">Zdravo, {user.name}</span>
        <button onClick={odjava} className="odjava-btn">Odjava</button>
      </div>
    );
  } else {
    desniDio = (
      <div className="navbar-desno">
        <Link to="/login">Prijava</Link>
        <Link to="/register">Registracija</Link>
      </div>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Poslovi</Link>
      {desniDio}
    </nav>
  );
}

export default Navbar;