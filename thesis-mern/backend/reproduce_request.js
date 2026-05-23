require('dotenv').config();
const fetch = require('node-fetch');

async function run() {
  const base = 'http://localhost:5000';
  // Login as irsa (ensure account exists)
  const loginRes = await fetch(base + '/api/auth/login', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ gmail: 'irsa@gmail.com', password: 'password123' })
  });
  const loginData = await loginRes.json();
  console.log('Login status', loginRes.status, loginData.message || loginData);
  if (!loginRes.ok) return;
  const token = loginData.token;

  // Get my papers
  const papersRes = await fetch(base + '/api/papers/my', { headers: { Authorization: `Bearer ${token}` } });
  const papers = await papersRes.json();
  console.log('Papers count', papers.length);
  if (!papers.length) return console.log('No papers to request');
  const paperId = papers[0]._id;

  // Request reviewer
  const reqRes = await fetch(base + '/api/papers/request-reviewer', {
    method: 'POST', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ paper_id: paperId })
  });
  const reqData = await reqRes.json();
  console.log('Request status', reqRes.status, reqData);
}

run().catch(err => { console.error(err); process.exit(1); });
