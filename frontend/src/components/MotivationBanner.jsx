import { useEffect, useState } from 'react';

const QUOTES = [
  "Every application you send is a step closer to your offer letter.",
  "Rejections are redirections — the right company is still ahead.",
  "Consistency beats intensity. One application a day adds up fast.",
  "Your next 'yes' could be one application away.",
  "Track your progress, trust your process.",
  "The job search is a numbers game and a patience game — you've got both.",
  "Skills compound. Keep learning while you keep applying.",
  "Interviews are conversations, not exams. You've got this.",
];

function MotivationBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container" style={{ maxWidth: 700 }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-nude-700)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Daily Motivation
        </p>
        <p
          key={index}
          style={{
            fontSize: '1.4rem',
            fontWeight: 600,
            color: 'var(--color-nude-100)',
            lineHeight: 1.5,
            minHeight: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.6s ease',
          }}
        >
          "{QUOTES[index]}"
        </p>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}

export default MotivationBanner;
