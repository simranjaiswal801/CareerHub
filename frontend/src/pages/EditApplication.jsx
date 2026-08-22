import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await api.get(`/applications/${id}`);
        setForm({
          ...data,
          appliedDate: data.appliedDate ? data.appliedDate.slice(0, 10) : '',
          deadline: data.deadline ? data.deadline.slice(0, 10) : '',
        });
      } catch (err) {
        setError('Failed to load application');
      } finally {
        setFetching(false);
      }
    };
    fetchApplication();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.put(`/applications/${id}`, form);
      navigate('/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update application');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loader />;
  if (!form) return <p style={{ padding: '2rem', color: 'var(--color-danger)' }}>{error || 'Application not found'}</p>;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: 700 }}>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Edit Application</h1>

      {error && (
        <p style={{ backgroundColor: 'rgba(201,111,94,0.15)', color: 'var(--color-danger)', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Company Name *</label>
          <input name="companyName" value={form.companyName} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Job Title *</label>
          <input name="jobTitle" value={form.jobTitle} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Job Type</label>
          <select name="jobType" value={form.jobType} onChange={handleChange}>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Job URL</label>
          <input name="jobUrl" value={form.jobUrl} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Salary</label>
          <input name="salary" value={form.salary} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Wishlist</option>
            <option>Applied</option>
            <option>Screening</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Withdrawn</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Applied Date</label>
          <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Deadline</label>
          <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Application'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/applications')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditApplication;
