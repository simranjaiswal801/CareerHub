import { useMemo, useState } from 'react';
import api from '../services/api';

// Curated list of real company career-page domains. Editable — add more anytime.
const JOB_LISTINGS = [
  { companyName: 'TCS', jobTitle: 'Frontend Developer (Fresher)', location: 'Pan India', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://www.tcs.com/careers' },
  { companyName: 'Infosys', jobTitle: 'React Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://www.infosys.com/careers.html' },
  { companyName: 'Wipro', jobTitle: 'Web Developer', location: 'Hyderabad', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://careers.wipro.com' },
  { companyName: 'Cognizant', jobTitle: 'UI Developer', location: 'Pune', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://careers.cognizant.com' },
  { companyName: 'Accenture', jobTitle: 'Frontend Engineer', location: 'Multiple Cities', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://www.accenture.com/in-en/careers' },
  { companyName: 'Capgemini', jobTitle: 'React.js Developer', location: 'Mumbai', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://www.capgemini.com/careers' },
  { companyName: 'HCLTech', jobTitle: 'Web Developer Fresher', location: 'Noida', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://www.hcltech.com/careers' },
  { companyName: 'Tech Mahindra', jobTitle: 'UI/UX Developer', location: 'Pune', jobType: 'Full Time', domain: 'IT Services', jobUrl: 'https://careers.techmahindra.com' },
  { companyName: 'Zoho', jobTitle: 'UI Developer', location: 'Chennai', jobType: 'Full Time', domain: 'Product', jobUrl: 'https://www.zoho.com/careers' },
  { companyName: 'Freshworks', jobTitle: 'Frontend Engineer', location: 'Chennai', jobType: 'Full Time', domain: 'Product', jobUrl: 'https://www.freshworks.com/company/careers' },
  { companyName: 'Razorpay', jobTitle: 'Frontend Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'Fintech', jobUrl: 'https://razorpay.com/jobs' },
  { companyName: 'CRED', jobTitle: 'React Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'Fintech', jobUrl: 'https://careers.cred.club' },
  { companyName: 'Paytm', jobTitle: 'Web Developer', location: 'Noida', jobType: 'Full Time', domain: 'Fintech', jobUrl: 'https://paytm.com/careers' },
  { companyName: 'PhonePe', jobTitle: 'Frontend Engineer', location: 'Bangalore', jobType: 'Full Time', domain: 'Fintech', jobUrl: 'https://www.phonepe.com/careers' },
  { companyName: 'Swiggy', jobTitle: 'React Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'Consumer Tech', jobUrl: 'https://careers.swiggy.com' },
  { companyName: 'Zomato', jobTitle: 'Frontend Developer', location: 'Gurugram', jobType: 'Full Time', domain: 'Consumer Tech', jobUrl: 'https://www.zomato.com/careers' },
  { companyName: 'Flipkart', jobTitle: 'SDE - Frontend', location: 'Bangalore', jobType: 'Full Time', domain: 'E-commerce', jobUrl: 'https://www.flipkartcareers.com' },
  { companyName: 'Myntra', jobTitle: 'UI Engineer', location: 'Bangalore', jobType: 'Full Time', domain: 'E-commerce', jobUrl: 'https://careers.myntra.com' },
  { companyName: 'Meesho', jobTitle: 'Frontend Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'E-commerce', jobUrl: 'https://careers.meesho.io' },
  { companyName: 'Nykaa', jobTitle: 'Web Developer', location: 'Mumbai', jobType: 'Full Time', domain: 'E-commerce', jobUrl: 'https://www.nykaa.com/careers' },
  { companyName: 'BYJU\'S', jobTitle: 'Frontend Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'EdTech', jobUrl: 'https://byjus.com/careers' },
  { companyName: 'Unacademy', jobTitle: 'React Developer', location: 'Bangalore', jobType: 'Full Time', domain: 'EdTech', jobUrl: 'https://unacademy.com/careers' },
  { companyName: 'upGrad', jobTitle: 'Frontend Engineer', location: 'Mumbai', jobType: 'Full Time', domain: 'EdTech', jobUrl: 'https://www.upgrad.com/careers' },
  { companyName: 'Amazon', jobTitle: 'SDE - Frontend', location: 'Hyderabad', jobType: 'Full Time', domain: 'Big Tech', jobUrl: 'https://www.amazon.jobs' },
  { companyName: 'Microsoft', jobTitle: 'Software Engineer (UI)', location: 'Bangalore', jobType: 'Full Time', domain: 'Big Tech', jobUrl: 'https://careers.microsoft.com' },
  { companyName: 'Google', jobTitle: 'Frontend Software Engineer', location: 'Bangalore', jobType: 'Full Time', domain: 'Big Tech', jobUrl: 'https://careers.google.com' },
  { companyName: 'Adobe', jobTitle: 'UI Engineer', location: 'Noida', jobType: 'Full Time', domain: 'Big Tech', jobUrl: 'https://careers.adobe.com' },
  { companyName: 'Salesforce', jobTitle: 'Frontend Developer', location: 'Hyderabad', jobType: 'Full Time', domain: 'Big Tech', jobUrl: 'https://careers.salesforce.com' },
  { companyName: 'Internshala', jobTitle: 'MERN Stack Intern', location: 'Remote', jobType: 'Internship', domain: 'Internship Portal', jobUrl: 'https://internshala.com' },
  { companyName: 'LinkedIn Jobs', jobTitle: 'Browse Frontend Openings', location: 'Various', jobType: 'Full Time', domain: 'Job Portal', jobUrl: 'https://www.linkedin.com/jobs' },
  { companyName: 'Naukri.com', jobTitle: 'Browse Frontend Developer Jobs', location: 'Various', jobType: 'Full Time', domain: 'Job Portal', jobUrl: 'https://www.naukri.com/frontend-developer-jobs' },
  { companyName: 'Indeed', jobTitle: 'Browse Web Developer Jobs', location: 'Various', jobType: 'Full Time', domain: 'Job Portal', jobUrl: 'https://in.indeed.com' },
  { companyName: 'AngelList (Wellfound)', jobTitle: 'Startup Frontend Roles', location: 'Various', jobType: 'Full Time', domain: 'Job Portal', jobUrl: 'https://wellfound.com' },
  { companyName: 'Cuvette', jobTitle: 'Fresher Tech Openings', location: 'Various', jobType: 'Internship', domain: 'Internship Portal', jobUrl: 'https://www.cuvette.tech' },
];

const DOMAINS = ['All', ...new Set(JOB_LISTINGS.map((j) => j.domain))];

function Jobs() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [appliedIds, setAppliedIds] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    return JOB_LISTINGS.filter((job) => {
      const matchesDomain = domain === 'All' || job.domain === domain;
      const matchesSearch =
        !search ||
        job.companyName.toLowerCase().includes(search.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(search.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [search, domain]);

  const handleApply = async (job, key) => {
    setError('');
    setMessage('');
    window.open(job.jobUrl, '_blank', 'noopener,noreferrer');

    try {
      await api.post('/applications', {
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        location: job.location,
        jobType: job.jobType,
        jobUrl: job.jobUrl,
        status: 'Applied',
        appliedDate: new Date().toISOString().slice(0, 10),
      });
      setAppliedIds((prev) => [...prev, key]);
      setMessage(`Added "${job.jobTitle}" at ${job.companyName} to your tracker.`);
    } catch (err) {
      setError('Opened the job page, but failed to add it to your tracker.');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.9rem', marginBottom: '0.4rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
        Explore & Apply
      </h1>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        {JOB_LISTINGS.length}+ openings across top companies — apply with one click, we log it in your tracker automatically.
      </p>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '2 1 220px' }}
        />
        <select value={domain} onChange={(e) => setDomain(e.target.value)} style={{ flex: '1 1 180px' }}>
          {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {message && <p style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="text-muted">No openings match your search.</p>
        </div>
      ) : (
        <div className="grid grid-2 grid-3">
          {filtered.map((job) => {
            const key = `${job.companyName}-${job.jobTitle}`;
            return (
              <div key={key} className="card job-listing-card">
                <span className="badge" style={{
                  backgroundColor: 'rgba(201,168,136,0.1)', color: 'var(--color-nude-500)',
                  border: '1px solid var(--color-border)', marginBottom: '0.7rem', fontSize: '0.7rem'
                }}>
                  {job.domain}
                </span>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{job.jobTitle}</h3>
                <p className="text-muted" style={{ fontSize: '0.88rem', marginBottom: '0.6rem', fontWeight: 500 }}>{job.companyName}</p>
                <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.78rem', color: 'var(--color-text-faint)', marginBottom: '1.1rem' }}>
                  <span>{job.location}</span>
                  <span>·</span>
                  <span>{job.jobType}</span>
                </div>
                <button
                  onClick={() => handleApply(job, key)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={appliedIds.includes(key)}
                >
                  {appliedIds.includes(key) ? 'Applied ✓' : 'Apply Now ↗'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Jobs;
