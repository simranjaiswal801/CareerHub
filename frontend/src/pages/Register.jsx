import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>Create your account</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Start tracking your career journey today
        </p>

        {error && (
          <p style={{ backgroundColor: 'rgba(201,111,94,0.15)', color: 'var(--color-danger)', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Simran Jaiswal" />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="At least 6 characters" />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-nude-500)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
