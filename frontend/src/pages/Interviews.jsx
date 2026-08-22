import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const initialForm = {
  companyName: '',
  jobTitle: '',
  interviewType: 'Technical',
  date: '',
  time: '',
  location: '',
  meetingLink: '',
  notes: '',
  status: 'Scheduled',
};

const statusColors = {
  Scheduled: 'var(--color-info)',
  Completed: 'var(--color-success)',
  Cancelled: 'var(--color-danger)',
};

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/interviews');
      setInterviews(data);
    } catch (err) {
      setError('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInterviews(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyName || !form.jobTitle || !form.date) {
      setError('Company, job title and date are required');
      return;
    }
    setError('');
    try {
      if (editingId) {
        await api.put(`/interviews/${editingId}`, form);
      } else {
        await api.post('/interviews', form);
      }
      resetForm();
      fetchInterviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save interview');
    }
  };

  const handleEdit = (interview) => {
    setForm({ ...interview, date: interview.date.slice(0, 10) });
    setEditingId(interview._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this interview?')) return;
    try {
      await api.delete(`/interviews/${id}`);
      setInterviews((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert('Failed to delete interview');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Interviews</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? 'Close' : '+ Add Interview'}
        </button>
      </div>

      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: '2rem' }}>
          <input name="companyName" placeholder="Company Name *" value={form.companyName} onChange={handleChange} required />
          <input name="jobTitle" placeholder="Job Title *" value={form.jobTitle} onChange={handleChange} required />
          <select name="interviewType" value={form.interviewType} onChange={handleChange}>
            <option>HR</option>
            <option>Technical</option>
            <option>Managerial</option>
            <option>Group Discussion</option>
            <option>Other</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="time" name="time" value={form.time} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input name="meetingLink" placeholder="Meeting Link" value={form.meetingLink} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} rows={3} style={{ gridColumn: '1 / -1' }} />
          <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>
            {editingId ? 'Update Interview' : 'Save Interview'}
          </button>
        </form>
      )}

      {loading ? (
        <Loader />
      ) : interviews.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="text-muted">No interviews scheduled yet.</p>
        </div>
      ) : (
        <div className="grid grid-2 grid-3">
          {interviews.map((iv) => (
            <div key={iv._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem' }}>{iv.jobTitle}</h3>
                <span className="badge" style={{ color: statusColors[iv.status], border: `1px solid ${statusColors[iv.status]}` }}>
                  {iv.status}
                </span>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{iv.companyName} · {iv.interviewType}</p>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                {new Date(iv.date).toLocaleDateString()} {iv.time && `at ${iv.time}`}
              </p>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button onClick={() => handleEdit(iv)} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>Edit</button>
                <button onClick={() => handleDelete(iv._id)} className="btn btn-danger" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Interviews;
