import { Link } from 'react-router-dom';

const statusColors = {
  Wishlist: 'var(--color-text-muted)',
  Applied: 'var(--color-info)',
  Screening: 'var(--color-warning)',
  Interview: 'var(--color-nude-500)',
  Offer: 'var(--color-success)',
  Rejected: 'var(--color-danger)',
  Withdrawn: 'var(--color-text-faint)',
};

function ApplicationCard({ application, onDelete }) {
  const { _id, companyName, jobTitle, location, status, appliedDate, jobType } = application;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.15rem' }}>{jobTitle}</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{companyName}</p>
        </div>
        <span
          className="badge"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: statusColors[status] || 'var(--color-nude-300)',
            border: `1px solid ${statusColors[status] || 'var(--color-border)'}`,
          }}
        >
          {status}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--color-text-faint)' }}>
        {location && <span>{location}</span>}
        {jobType && <span>{jobType}</span>}
        {appliedDate && <span>{new Date(appliedDate).toLocaleDateString()}</span>}
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
        <Link to={`/applications/${_id}`} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
          View
        </Link>
        <Link to={`/applications/edit/${_id}`} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
          Edit
        </Link>
        <button
          onClick={() => onDelete(_id)}
          className="btn btn-danger"
          style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;
