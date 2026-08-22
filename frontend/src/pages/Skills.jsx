import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

const initialForm = { skillName: '', level: 'Beginner', yearsOfExperience: 0 };

const levelPercent = { Beginner: 33, Intermediate: 66, Advanced: 100 };
const levelColor = { Beginner: 'var(--color-warning)', Intermediate: 'var(--color-info)', Advanced: 'var(--color-success)' };

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/skills');
      setSkills(data);
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.skillName) {
      setError('Skill name is required');
      return;
    }
    setError('');
    try {
      await api.post('/skills', form);
      setForm(initialForm);
      setShowForm(false);
      fetchSkills();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert('Failed to delete skill');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Skills</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close' : '+ Add Skill'}
        </button>
      </div>

      {error && <p style={{ color: 'var(--color-danger)', marginBottom: '1rem' }}>{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input name="skillName" placeholder="Skill name (e.g. React)" value={form.skillName} onChange={handleChange} style={{ flex: '2 1 200px' }} required />
          <select name="level" value={form.level} onChange={handleChange} style={{ flex: '1 1 150px' }}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input type="number" name="yearsOfExperience" placeholder="Years" min="0" value={form.yearsOfExperience} onChange={handleChange} style={{ flex: '1 1 100px' }} />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      )}

      {loading ? (
        <Loader />
      ) : skills.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="text-muted">No skills added yet.</p>
        </div>
      ) : (
        <div className="grid grid-2 grid-3">
          {skills.map((skill) => (
            <div key={skill._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <h3 style={{ fontSize: '1rem' }}>{skill.skillName}</h3>
                <button onClick={() => handleDelete(skill._id)} style={{ background: 'none', color: 'var(--color-danger)', fontSize: '0.8rem' }}>✕</button>
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                {skill.level} · {skill.yearsOfExperience} yr(s)
              </p>
              <div style={{ height: 6, backgroundColor: 'var(--color-border)', borderRadius: 999 }}>
                <div style={{
                  height: '100%',
                  width: `${levelPercent[skill.level]}%`,
                  backgroundColor: levelColor[skill.level],
                  borderRadius: 999,
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;
