import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>Welcome back</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Login to access your dashboard
        </p>

        {error && (
          <p style={{ backgroundColor: 'rgba(201,111,94,0.15)', color: 'var(--color-danger)', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-nude-500)' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
