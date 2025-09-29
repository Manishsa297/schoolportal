# School Portal (MERN Stack)

This is a full-stack MERN web application for a School Portal with three user roles: Teacher, Student, and Super Admin.

## Features

- **3 User Roles:** Super Admin, Teacher, Student
- **Authentication:** JWT-based login system.
- **Authorization:** Role-based access control.
- **Teacher Dashboard:** View assigned students.
- **Student Dashboard:** View assigned teachers.
- **Super Admin Dashboard:** Manage users and teacher-student mappings.

## Project Structure

```
/school-portal
  /client     # React Frontend
  /server     # Node.js/Express Backend
```

## Prerequisites

- Node.js
- npm
- MongoDB (local or Atlas)

## Getting Started

### 1. Backend Setup

```bash
# Navigate to the server directory
cd school-portal/server

# Install dependencies
npm install

# Create a .env file in the server directory and add the following:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

# Seed the database with initial data
npm run seed

# Start the backend server
npm start
```

The backend will be running on `http://localhost:5000`.

### 2. Frontend Setup

```bash
# Navigate to the client directory
cd school-portal/client

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will be running on `http://localhost:3000`.

## Default Login Credentials

- **Super Admin:**
  - **Email:** `admin@school.com`
  - **Password:** `123456`

- **Teachers:**
  - **Email:** `teacher1@school.com`, `teacher2@school.com`
  - **Password:** `123456`

- **Students:**
  - **Email:** `student1@school.com`, `student2@school.com`, `student3@school.com`
  - **Password:** `123456`
