import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const statusBadge = s => {
  const map = {
    'Submitted':             'badge-submitted',
    'Under Review':          'badge-review',
    'Accepted':              'badge-accepted',
    'Rejected':              'badge-rejected',
    'Accepted with Revision':'badge-revision'
  };
  return <span className={`badge ${map[s] || ''}`}>{s}</span>;
};

export default function AuthorPanel() {
  const { user } = useAuth();
  const [papers,  setPapers]  = useState([]);
  const [msg, setMsg] = useState({ type:'', text:'' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/papers/my')
      .then(res => setPapers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const requestReviewer = async (paperId) => {
    try {
      const res = await axios.post('/api/papers/request-reviewer', { paper_id: paperId });
      setMsg({ type:'success', text: res.data.message });
      // refresh list
      const r = await axios.get('/api/papers/my');
      setPapers(r.data);
    } catch (err) {
      setMsg({ type:'danger', text: err.response?.data?.message || 'Request failed' });
    }
  };

  return (
    <>
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <h1 className="page-title">✍️ Author Panel</h1>
      <div className="card">
        <p><strong>Welcome, {user?.name}!</strong></p>
        <p style={{color:'#666', fontSize:'0.9rem'}}>University: {user?.author_profile?.university_name}</p>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
        <h2 style={{color:'#1a237e'}}>My Submitted Papers</h2>
        <Link to="/submit-thesis" className="btn btn-primary">+ Submit New Thesis</Link>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading">Loading papers...</div>
        ) : papers.length === 0 ? (
          <div style={{textAlign:'center', padding:'2rem', color:'#666'}}>
            <p>No papers submitted yet.</p>
            <Link to="/submit-thesis" className="btn btn-primary" style={{marginTop:'1rem'}}>Submit Your First Paper</Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((p, i) => (
                  <tr key={p._id}>
                    <td>{i + 1}</td>
                    <td>{p.title}</td>
                    <td style={{textTransform:'capitalize'}}>{p.paper_type}</td>
                    <td>{statusBadge(p.status)}</td>
                    <td>{new Date(p.upload_date).toLocaleDateString()}</td>
                    <td>
                      <div style={{display:'flex', gap:'6px'}}>
                        <Link to={`/view-paper/${p._id}`} className="btn btn-secondary btn-sm">View</Link>
                        {p.status === 'Submitted' && (
                          <button className="btn btn-warning btn-sm" onClick={() => requestReviewer(p._id)}>Request Reviewer</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
