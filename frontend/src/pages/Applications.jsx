import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ApplicationCard from '../components/ApplicationCard';
import Loader from '../components/Loader';

const STATUS_OPTIONS = ['Wishlist', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];
const JOB_TYPE_OPTIONS = ['Full Time', 'Part Time', 'Internship', 'Contract'];

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [jobType, setJobType] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      if (jobType) params.jobType = jobType;
      if (sort) params.sort = sort;

      const { data } = await api.get('/applications', { params });
      setApplications(data);
      setError('');
    } catch (err) {
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchApplications, 300); // debounce search
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, jobType, sort]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert('Failed to delete application');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Applications</h1>
        <Link to="/applications/add" className="btn btn-primary">+ Add Application</Link>
      </div>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by company or job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '2 1 220px' }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ flex: '1 1 150px' }}>
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)} style={{ flex: '1 1 150px' }}>
          <option value="">All Job Types</option>
          {JOB_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ flex: '1 1 150px' }}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      {loading ? (
        <Loader />
      ) : applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="text-muted">No applications found. Start by adding one!</p>
        </div>
      ) : (
        <div className="grid grid-2 grid-3">
          {applications.map((app) => (
            <ApplicationCard key={app._id} application={app} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
