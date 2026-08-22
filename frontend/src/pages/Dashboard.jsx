import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appsRes, interviewsRes] = await Promise.all([
          api.get('/applications/stats/summary'),
          api.get('/applications?sort=newest'),
          api.get('/interviews'),
        ]);
        setStats(statsRes.data);
        setRecentApps(appsRes.data.slice(0, 5));
        setUpcomingInterviews(
          interviewsRes.data
            .filter((i) => i.status === 'Scheduled' && new Date(i.date) >= new Date())
            .slice(0, 5)
        );
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Welcome back, {user?.name}</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Here's an overview of your career progress.</p>

      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      {stats && (
        <div className="grid grid-2 grid-4" style={{ marginBottom: '2.5rem' }}>
          <StatCard label="Total Applications" value={stats.total} />
          <StatCard label="Applied" value={stats.applied} color="var(--color-info)" />
          <StatCard label="Interviews" value={stats.interview} color="var(--color-nude-500)" />
          <StatCard label="Offers" value={stats.offer} color="var(--color-success)" />
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <Link to="/applications/add" className="btn btn-primary">+ Add Application</Link>
        <Link to="/interviews" className="btn btn-secondary">+ Add Interview</Link>
        <Link to="/profile" className="btn btn-secondary">Update Profile</Link>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Recent Applications</h3>
          {recentApps.length === 0 && <p className="text-muted" style={{ fontSize: '0.9rem' }}>No applications yet.</p>}
          {recentApps.map((app) => (
            <div key={app._id} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{app.jobTitle}</p>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>{app.companyName} · {app.status}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Upcoming Interviews</h3>
          {upcomingInterviews.length === 0 && <p className="text-muted" style={{ fontSize: '0.9rem' }}>No upcoming interviews.</p>}
          {upcomingInterviews.map((iv) => (
            <div key={iv._id} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{iv.jobTitle} — {iv.companyName}</p>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>{new Date(iv.date).toLocaleDateString()} · {iv.interviewType}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
