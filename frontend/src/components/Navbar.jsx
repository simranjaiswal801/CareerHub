import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--color-nude-500)' : 'var(--color-text-muted)',
    fontWeight: 500,
    fontSize: '0.9rem',
  });

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        backgroundColor: 'rgba(36, 31, 27, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Link to="/" style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--color-nude-300)', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
        Career<span style={{ color: 'var(--color-nude-500)' }}>Hub</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {!user && (
          <>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/about" style={linkStyle}>About</NavLink>
            <NavLink to="/login" style={linkStyle}>Login</NavLink>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}

        {user && (
          <>
            <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
            <NavLink to="/applications" style={linkStyle}>Applications</NavLink>
            <NavLink to="/jobs" style={linkStyle}>Explore Jobs</NavLink>
            <NavLink to="/interviews" style={linkStyle}>Interviews</NavLink>
            <NavLink to="/skills" style={linkStyle}>Skills</NavLink>
            <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
