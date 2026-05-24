
 Student Course Registration System (SCRS)
A full-stack web application for managing student course registrations. Built with Node.js, Express.js, and MongoDB, this system provides a clean REST API with a static HTML frontend for performing full CRUD operations on Students, Courses, and Registrations.
✨ Features
👨‍🎓 Students

Add students with name, email, roll number, department, and semester
View all students or search by ID
Update student information
Delete a student record
Unique email and roll number validation

📚 Courses

Add courses with code, title, credit hours, instructor, department, and max capacity
View all courses or search by ID
Update course details
Delete a course
Unique course code validation

📋 Registrations

Register a student in a course (with duplicate prevention via unique index)
Automatic capacity check before registration (blocks if course is full)
Update registration status: pending, approved, or dropped
Assign grades: A, B+, B, C+, C, D, F
View all registrations with populated student and course details
Delete a registration

🛠️ Tech Stack
LayerTechnologyBackendNode.js, Express.jsDatabaseMongoDB with Mongoose ODMFrontendVanilla HTML, CSS, JavaScript (static files)Environment ConfigdotenvDev Servernodemon
🗂️ Project Structure
clean_project/
├── controllers/
│   ├── studentController.js      # CRUD logic for students
│   ├── courseController.js       # CRUD logic for courses
│   └── registrationController.js # CRUD logic + capacity check for registrations
├── models/
│   ├── Student.js                # Student schema (name, email, rollNumber, dept, semester)
│   ├── Course.js                 # Course schema (code, title, credits, instructor, capacity)
│   └── Registration.js           # Registration schema (student ref, course ref, status, grade)
├── routes/
│   ├── studentRoutes.js          # GET, POST /api/students | GET, PUT, DELETE /api/students/:id
│   ├── courseRoutes.js           # GET, POST /api/courses  | GET, PUT, DELETE /api/courses/:id
│   └── registrationRoutes.js     # GET, POST /api/registrations | GET, PUT, DELETE /api/registrations/:id
├── public/
│   ├── index.html                # Home / landing page
│   ├── students.html             # Students management UI
│   ├── courses.html              # Courses management UI
│   └── registrations.html        # Registrations management UI
├── server.js                     # Express server entry point
├── package.json
└── .env                          # Environment variables
⚙️ How It Works
Student Management
Students are stored with unique email and roll number constraints. The department field is restricted to a fixed enum (Computer Science, Software Engineering, Information Technology, Electrical Engineering) and semester must be between 1 and 8.
Course Management
Each course has a unique course code (stored in uppercase). The maxCapacity field (default: 30) controls how many approved registrations are allowed per course.
Registration Flow

A student selects a course to register for.
The backend counts how many students are already approved in that course.
If the count is at or above maxCapacity, registration is blocked.
If not, the registration is created with status pending.
Admin can update the status to approved or dropped and assign a grade.
A unique compound index on (student, course) prevents duplicate registrations.

📡 API Endpoints
Students
MethodEndpointDescriptionGET/api/studentsGet all studentsPOST/api/studentsAdd a new studentGET/api/students/:idGet student by IDPUT/api/students/:idUpdate studentDELETE/api/students/:idDelete student
Courses
MethodEndpointDescriptionGET/api/coursesGet all coursesPOST/api/coursesAdd a new courseGET/api/courses/:idGet course by IDPUT/api/courses/:idUpdate courseDELETE/api/courses/:idDelete course
Registrations
MethodEndpointDescriptionGET/api/registrationsGet all registrations (with student and course details)POST/api/registrationsRegister a student in a courseGET/api/registrations/:idGet registration by IDPUT/api/registrations/:idUpdate status or gradeDELETE/api/registrations/:idDelete registration
🖥️ Installation and Setup (Local)
Prerequisites

Node.js v18+
MongoDB (local) or MongoDB Atlas (cloud)
npm

1. Clone the Repository
bashgit clone https://github.com/your-username/student-course-registration.git
cd student-course-registration
2. Install Dependencies
bashnpm install
3. Configure Environment Variables
Create a .env file in the root directory:
envPORT=3000
MONGO_URI=mongodb://localhost:27017/student_registration

For MongoDB Atlas, replace MONGO_URI with your Atlas connection string.

4. Start the Server
bash# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
Server runs at: http://localhost:3000
The frontend is served automatically as static files from the /public folder. Open http://localhost:3000 in your browser to use the UI.
📦 Dependencies
Production
express mongoose cors dotenv
Development
nodemon
