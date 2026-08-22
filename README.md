# CareerHub

CareerHub is a full-stack MERN application that helps students and job seekers track job
applications, interviews, and skills in one organized dashboard.

## Features
- Secure authentication (JWT + bcrypt password hashing)
- Full CRUD for job applications (create, read, update, delete)
- Search, filter (by status/job type), and sort applications
- Interview tracker with status management
- Skills tracker with proficiency levels
- Profile management with photo/resume as simple shareable links (no file storage service needed)
- Explore & Apply page — curated job listings, one-click apply that auto-logs into your tracker
- Landing page with advantages, rotating motivational quotes, and job-search do's & don'ts
- Real-time dashboard statistics (from the database, not hardcoded)
- User ownership checks — a user can only access their own data
- Fully responsive dark-nude themed UI with hover interactions throughout

## Tech Stack
**Frontend:** React, Vite, React Router, Axios, Context API
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas + Mongoose
**Auth:** JWT, bcryptjs

## Folder Structure
```
careerhub/
├── backend/
│   ├── config/          # db.js, cloudinary.js
│   ├── controllers/      # business logic
│   ├── middleware/       # auth, error handling, upload
│   ├── models/            # Mongoose schemas
│   ├── routes/             # API routes
│   └── server.js
└── frontend/
    └── src/
        ├── components/    # Navbar, Footer, cards, ProtectedRoute
        ├── pages/           # all page components
        ├── context/         # AuthContext
        └── services/        # api.js (axios instance)
```

## Installation

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# fill in MONGO_URI, JWT_SECRET, CLOUDINARY_* in .env
npm run dev
```
Backend runs on `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```
Frontend runs on `http://localhost:5173`

## Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## API Overview

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Private |
| POST | /api/applications | Private |
| GET | /api/applications | Private |
| GET | /api/applications/stats/summary | Private |
| GET | /api/applications/:id | Private |
| PUT | /api/applications/:id | Private |
| DELETE | /api/applications/:id | Private |
| POST/GET | /api/interviews | Private |
| GET/PUT/DELETE | /api/interviews/:id | Private |
| POST/GET | /api/skills | Private |
| PUT/DELETE | /api/skills/:id | Private |
| GET/PUT | /api/profile | Private |

## Deployment
- **Frontend:** Vercel
- **Backend:** Render / Railway
- **Database:** MongoDB Atlas

Remember to set the deployed frontend URL as `CLIENT_URL` in the backend's environment
variables (for CORS), and the deployed backend URL as `VITE_API_URL` in the frontend.
