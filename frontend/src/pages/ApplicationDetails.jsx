import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const { data } = await api.get(`/applications/${id}`);
        setApp(data);
      } catch (err) {
        setError('Failed to load application details');
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.delete(`/applications/${id}`);
      navigate('/applications');
    } catch (err) {
      alert('Failed to delete application');
    }
  };

  if (loading) return <Loader />;
  if (error || !app) return <p style={{ padding: '2rem', color: 'var(--color-danger)' }}>{error}</p>;

  const rows = [
    ['Company', app.companyName],
    ['Job Title', app.jobTitle],
    ['Location', app.location || '—'],
    ['Job Type', app.jobType],
    ['Status', app.status],
    ['Salary', app.salary || '—'],
    ['Applied Date', app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : '—'],
    ['Deadline', app.deadline ? new Date(app.deadline).toLocaleDateString() : '—'],
    ['Job URL', app.jobUrl || '—'],
  ];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: 700 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem' }}>{app.jobTitle}</h1>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <Link to={`/applications/edit/${id}`} className="btn btn-secondary">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>

      <div className="card">
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '1px solid var(--color-border)' }}>
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>{label}</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{value}</span>
          </div>
        ))}
        {app.notes && (
          <div style={{ paddingTop: '1rem' }}>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>Notes</p>
            <p style={{ fontSize: '0.9rem' }}>{app.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationDetails;
