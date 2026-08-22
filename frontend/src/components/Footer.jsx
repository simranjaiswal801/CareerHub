function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        color: 'var(--color-text-faint)',
        fontSize: '0.85rem',
        marginTop: '4rem',
      }}
    >
      <p>© {new Date().getFullYear()} CareerHub. Built for tracking your career journey.</p>
    </footer>
  );
}

export default Footer;
