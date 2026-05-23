// Simple script to test registration endpoint using global fetch
require('dotenv').config();
(async () => {
  try {
    const url = 'http://localhost:5000/api/auth/register';
    const body = {
      name: 'Irsa Irshad',
      gmail: 'irsa@gmail.com',
      password: 'password123',
      role: 'author',
      address: 'Test Address',
      phone_no: '0300-1112223',
      university_name: 'Test University',
      blood_group: 'A+'
    };

    const res = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Error calling register:', err);
  }
})();
