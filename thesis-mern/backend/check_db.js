require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Paper = require('./models/Paper');
const { Assignment, Review } = require('./models/Assignment');

async function checkDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!\n');

    // Count collections
    const userCount = await User.countDocuments();
    const paperCount = await Paper.countDocuments();
    const assignmentCount = await Assignment.countDocuments();
    const reviewCount = await Review.countDocuments();

    console.log('📊 Database Statistics:');
    console.log(`   Users:        ${userCount}`);
    console.log(`   Papers:       ${paperCount}`);
    console.log(`   Assignments:  ${assignmentCount}`);
    console.log(`   Reviews:      ${reviewCount}\n`);

    // Show sample data
    if (userCount > 0) {
      const users = await User.find().limit(3);
      console.log('👥 Sample Users:');
      users.forEach(u => console.log(`   - ${u.name} (${u.gmail}) [${u.role}]`));
      console.log();
    }

    if (paperCount > 0) {
      const papers = await Paper.find().populate('author_id', 'name gmail').limit(3);
      console.log('📄 Sample Papers:');
      papers.forEach(p => console.log(`   - ${p.title} by ${p.author_id?.name} [${p.status}]`));
      console.log();
    }

    if (assignmentCount > 0) {
      const assignments = await Assignment.find().populate('paper_id reviewer_id').limit(3);
      console.log('✓ Sample Assignments:');
      assignments.forEach(a => {
        console.log(`   - Paper: ${a.paper_id?.title} → Reviewer: ${a.reviewer_id?.name} [${a.status}]`);
      });
      console.log();
    }

    console.log('✅ Database is working and data is being saved!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database Error:', err.message);
    process.exit(1);
  }
}

checkDB();
