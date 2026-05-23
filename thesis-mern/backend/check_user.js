require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.argv[2] || 'irsa@gmail.com';
  const user = await User.findOne({ gmail: email });
  if (user) console.log('Found user:', user.gmail, 'role:', user.role, 'id:', user._id);
  else console.log('No user found with email', email);
  process.exit(0);
}

check().catch(err => { console.error(err); process.exit(1); });
