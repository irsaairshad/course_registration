require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const Paper = require('./models/Paper');
const { Assignment } = require('./models/Assignment');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Ensure uploads dir exists
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // Create sample author
  let author = await User.findOne({ gmail: 'sample_author@thesis.local' });
  if (!author) {
    author = await User.create({
      name: 'Sample Author',
      gmail: 'sample_author@thesis.local',
      password_hash: 'password123',
      role: 'author',
      author_profile: {
        address: '123 Author St', phone_no: '0300-0000000', university_name: 'Test University', blood_group: 'A+'
      }
    });
    console.log('Created sample author:', author.gmail);
  } else console.log('Sample author exists:', author.gmail);

  // Create sample reviewer
  let reviewer = await User.findOne({ gmail: 'sample_reviewer@thesis.local' });
  if (!reviewer) {
    reviewer = await User.create({
      name: 'Sample Reviewer',
      gmail: 'sample_reviewer@thesis.local',
      password_hash: 'password123',
      role: 'reviewer',
      reviewer_profile: { address: '456 Reviewer Ave', qualification: 'PhD', specialization: 'Machine Learning', max_papers: 5 }
    });
    console.log('Created sample reviewer:', reviewer.gmail);
  } else console.log('Sample reviewer exists:', reviewer.gmail);

  // Create sample file
  const sampleFile = 'sample_paper.pdf';
  const samplePath = path.join(uploadsDir, sampleFile);
  if (!fs.existsSync(samplePath)) fs.writeFileSync(samplePath, 'Sample PDF content');

  // Create sample paper
  let paper = await Paper.findOne({ title: 'Sample Paper for Assignment' });
  if (!paper) {
    paper = await Paper.create({
      title: 'Sample Paper for Assignment',
      abstract: 'This is a sample abstract used for testing assignments.',
      keywords: 'test, sample',
      paper_type: 'full',
      file_path: sampleFile,
      author_id: author._id,
      status: 'Submitted'
    });
    console.log('Created sample paper:', paper.title);
  } else console.log('Sample paper exists:', paper.title);

  // Create assignment
  let assignment = await Assignment.findOne({ paper_id: paper._id, reviewer_id: reviewer._id });
  if (!assignment) {
    assignment = await Assignment.create({ paper_id: paper._id, reviewer_id: reviewer._id, status: 'Assigned' });
    await Paper.findByIdAndUpdate(paper._id, { status: 'Under Review' });
    console.log('Created assignment for reviewer', reviewer.gmail);
  } else console.log('Assignment already exists');

  console.log('Done. You can now login as sample_reviewer@thesis.local (password: password123) or sample_author@thesis.local');
  process.exit(0);
}

run().catch(err => {
  console.error('Error creating sample data:', err);
  process.exit(1);
});
