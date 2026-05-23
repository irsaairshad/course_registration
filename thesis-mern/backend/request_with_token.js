require('dotenv').config();
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

async function run() {
  const base = 'http://localhost:5000';
  const userId = process.argv[2] || '6a0c6c58e8c37cd95e06ee24'; // irsairshad
  const paperId = process.argv[3] || '6a0cfe83979ab4f865e270af';
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const res = await fetch(base + '/api/papers/request-reviewer', {
    method: 'POST', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ paper_id: paperId })
  });
  const data = await res.json();
  console.log('Status', res.status, data);
}

run().catch(err => { console.error(err); process.exit(1); });
