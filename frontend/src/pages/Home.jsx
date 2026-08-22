import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MotivationBanner from '../components/MotivationBanner';

function Home() {
  const { user } = useAuth();

  const features = [
    { icon: '📋', title: 'Application Tracking', desc: 'Log every job you apply to with company, role, status and dates in one organized place.' },
    { icon: '🎯', title: 'Interview Scheduler', desc: 'Never miss an interview — track type, time, meeting links and outcomes.' },
    { icon: '⚡', title: 'Skills Tracker', desc: 'Track skills you are building and your proficiency level over time.' },
    { icon: '📊', title: 'Career Dashboard', desc: 'Real-time statistics on your applications, interviews and offers.' },
  ];

  const advantages = [
    { title: 'One place, zero chaos', desc: 'Stop juggling spreadsheets, notes apps and messages. Every application lives in one dashboard.' },
    { title: 'Never miss a deadline', desc: 'Deadlines and interview dates are tracked so nothing slips through the cracks.' },
    { title: 'See your real progress', desc: 'Live stats show exactly how many applications, interviews and offers you actually have — not guesses.' },
    { title: 'Apply faster', desc: 'Browse curated openings across dozens of companies and apply in one click — logged automatically.' },
  ];

  const steps = [
    { n: '01', title: 'Create your account', desc: 'Sign up in seconds and set up your career profile.' },
    { n: '02', title: 'Track applications', desc: 'Add every job application with all the details that matter.' },
    { n: '03', title: 'Stay organized', desc: 'Update statuses, schedule interviews, and monitor your progress.' },
  ];

  const guidance = [
    { do: true, text: 'Apply within 24-48 hours of a job posting going live — early applicants get noticed first.' },
    { do: true, text: 'Tailor your resume keywords to match the job description before applying.' },
    { do: true, text: 'Follow up politely after 5-7 days if you hear nothing back.' },
    { do: true, text: 'Track every application — untracked applications are opportunities you\'ll forget to follow up on.' },
    { do: false, text: 'Don\'t apply to 50 jobs a day with the same generic resume — quality beats quantity.' },
    { do: false, text: 'Don\'t skip preparing for common HR questions before a scheduled interview.' },
    { do: false, text: 'Don\'t ignore your skill gaps — check the Skills tab and keep it updated as you learn.' },
    { do: false, text: 'Don\'t go silent after rejection — ask for feedback when possible, it compounds over time.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero-section" style={{ padding: '7rem 1.5rem 5.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block', padding: '0.4rem 1rem', borderRadius: 999,
            border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-card)',
            fontSize: '0.8rem', color: 'var(--color-nude-500)', marginBottom: '1.5rem', letterSpacing: '0.03em'
          }}>
            ✦ Built for students & job seekers
          </span>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--color-nude-100)', letterSpacing: '-0.02em' }}>
            Take Control of Your{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--color-nude-500), var(--color-nude-300))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Career Journey
            </span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: 620, margin: '0 auto 2.5rem' }}>
            CareerHub helps students and job seekers manage applications, interviews, skills and
            career progress — all in one clean, organized dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '0.95rem' }}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '0.95rem' }}>
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.85rem 2.2rem', fontSize: '0.95rem' }}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '2.5rem' }}>
            Everything you need to job hunt smarter
          </h2>
          <div className="grid grid-2 grid-4">
            {features.map((f) => (
              <div key={f.title} className="card feature-card">
                <div style={{
                  width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'rgba(201,168,136,0.12)', fontSize: '1.4rem', marginBottom: '1rem'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.02rem' }}>{f.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CareerHub / Advantages */}
      <section style={{ padding: '4.5rem 1.5rem', backgroundColor: 'var(--color-bg-elevated)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '0.6rem' }}>
            Why use CareerHub?
          </h2>
          <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            The job search gets messy fast. Here's what changes when you organize it.
          </p>
          <div className="grid grid-2">
            {advantages.map((a) => (
              <div key={a.title} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{
                  color: 'var(--color-nude-500)', fontSize: '1.1rem', width: 32, height: 32, flexShrink: 0,
                  borderRadius: '50%', border: '1px solid var(--color-nude-700)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}>✓</span>
                <div>
                  <h3 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>{a.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '4.5rem 1.5rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '2.5rem' }}>
            How CareerHub works
          </h2>
          <div className="grid grid-3">
            {steps.map((s) => (
              <div key={s.n} className="card">
                <p style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-nude-700)', marginBottom: '0.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.n}</p>
                <h3 style={{ marginBottom: '0.5rem' }}>{s.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation - rotating quotes */}
      <MotivationBanner />

      {/* Career guidance - do's and don'ts */}
      <section style={{ padding: '4.5rem 1.5rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '0.6rem' }}>
            What to follow, what to avoid
          </h2>
          <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Practical job-search guidance worth following.
          </p>
          <div className="grid grid-2">
            {guidance.map((g, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <span style={{
                  color: g.do ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 700, fontSize: '0.9rem',
                  width: 26, height: 26, flexShrink: 0, borderRadius: '50%',
                  border: `1px solid ${g.do ? 'var(--color-success)' : 'var(--color-danger)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {g.do ? '✓' : '✕'}
                </span>
                <p style={{ fontSize: '0.9rem' }}>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5.5rem 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.1rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '1rem' }}>
            {user ? 'Jump back into your dashboard' : 'Ready to organize your job search?'}
          </h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            {user ? 'Pick up right where you left off.' : "Join CareerHub today — it's free."}
          </p>
          <Link to={user ? '/dashboard' : '/register'} className="btn btn-primary" style={{ padding: '0.85rem 2.4rem' }}>
            {user ? 'Go to Dashboard →' : 'Create Free Account'}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
