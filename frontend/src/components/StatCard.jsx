function StatCard({ label, value, color }) {
  return (
    <div className="card">
      <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '2rem', fontWeight: 700, color: color || 'var(--color-nude-300)' }}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;
