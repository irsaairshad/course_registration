require('dotenv').config();
const mongoose = require('mongoose');
require('./models/User');
const Paper = require('./models/Paper');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const papers = await Paper.find().populate('author_id', 'gmail name');
  console.log('Total papers:', papers.length);
  papers.forEach(p => {
    console.log('-', p._id.toString(), p.title, 'author=', p.author_id?.gmail || 'N/A', 'status=', p.status);
  });
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
