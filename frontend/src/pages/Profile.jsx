import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', location: '', bio: '', resumeUrl: '', profileImage: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile');
      setProfile(data);
      setForm({
        name: data.name || '',
        phone: data.phone || '',
        location: data.location || '',
        bio: data.bio || '',
        resumeUrl: data.resumeUrl || '',
        profileImage: data.profileImage || '',
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const { data } = await api.put('/profile', form);
      setProfile(data);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: 700 }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Profile</h1>

      {message && <p style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', backgroundColor: 'var(--color-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          border: '2px solid var(--color-nude-500)', flexShrink: 0,
        }}>
          {profile?.profileImage ? (
            <img src={profile.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '1.5rem', color: 'var(--color-nude-500)' }}>{profile?.name?.[0]?.toUpperCase()}</span>
          )}
        </div>
        <div>
          <p style={{ fontWeight: 600 }}>{profile?.name}</p>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>{profile?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="card" style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>
            Profile Photo URL <span className="text-muted">(paste an image link)</span>
          </label>
          <input name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="https://..." />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>
            Resume Link <span className="text-muted">(Google Drive / Dropbox share link)</span>
          </label>
          <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="https://..." />
          {form.resumeUrl && (
            <a href={form.resumeUrl} target="_blank" rel="noreferrer" className="hover-link" style={{ fontSize: '0.8rem', color: 'var(--color-nude-500)', marginTop: '0.4rem', display: 'inline-block' }}>
              Open current resume
            </a>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
