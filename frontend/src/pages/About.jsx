function About() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: 800 }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>About CareerHub</h1>
      <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
        CareerHub was built to solve a simple but common problem: job seekers apply to dozens of
        positions and quickly lose track of where they stand. Spreadsheets get messy, sticky
        notes get lost, and important interviews slip through the cracks.
      </p>
      <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
        CareerHub gives you one organized place to log every application, schedule and track
        interviews, monitor the skills you're building, and see your career progress through a
        real-time dashboard.
      </p>
      <p className="text-muted" style={{ lineHeight: 1.8 }}>
        Built with the MERN stack (MongoDB, Express, React, Node.js) as a full-stack learning and
        portfolio project.
      </p>
    </div>
  );
}

export default About;
