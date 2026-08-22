import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      await api.put('/profile', { password });
      setMessage('Password updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: 600 }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Settings</h1>

      {message && <p style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      <form onSubmit={handleChangePassword} className="card" style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
        <h3>Change Password</h3>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>New Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      <div className="card">
        <h3 style={{ marginBottom: '0.8rem' }}>Account</h3>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </div>
  );
}

export default Settings;
