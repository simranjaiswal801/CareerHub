<div align="center">

# 🚀 CareerHub

### Take Control of Your Career Journey

A full-stack MERN application that helps students and job seekers track job applications,
interviews, and skills — all in one organized, beautiful dashboard.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>


live demo: https://career-hub-seven-iota.vercel.app/



---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## 📖 About

Job hunting is chaotic — dozens of applications spread across spreadsheets, sticky notes, and
memory. **CareerHub** fixes that by giving you one clean place to:

- Track every job application from "Wishlist" to "Offer"
- Schedule and manage interviews
- Track skills you're building
- Browse and apply to curated openings across top companies
- See real, live statistics on your job search — not guesses

Built as a full-stack learning + portfolio project using the MERN stack.

---

## ✨ Features

| Category | What it does |
|---|---|
| 🔐 **Authentication** | Secure JWT-based auth with bcrypt password hashing |
| 📋 **Application Tracking** | Full CRUD — create, view, edit, delete job applications |
| 🔍 **Search & Filter** | Search by company/role, filter by status or job type, sort by date |
| 🎯 **Interview Tracker** | Log interview type, date, time, meeting link, and status |
| ⚡ **Skills Tracker** | Track skills with proficiency level and years of experience |
| 🧑 **Profile Management** | Update bio, contact info, resume link, and photo link |
| 💼 **Explore & Apply** | 30+ curated openings across top companies — apply in one click, auto-logged to your tracker |
| 📊 **Live Dashboard** | Real-time stats pulled straight from the database |
| 🔒 **Data Ownership** | Users can only access and modify their own data |
| 🎨 **Dark Nude UI** | Fully responsive, custom-themed interface with hover interactions throughout |

---

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite
- React Router
- Axios
- Context API for auth state

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT for authentication
- bcryptjs for password hashing

**Tooling**
- Postman (API testing)
- Git & GitHub
- Render (backend hosting) · Vercel (frontend hosting)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A free [MongoDB Atlas](https://mongodb.com/atlas) cluster

### 1. Clone the repo
```bash
git clone https://github.com/simranjaiswal801/CarrerHub.git
cd CarrerHub
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```
Backend runs at `http://localhost:5000`

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs at `http://localhost:5173`

> ⚠️ Both servers must run **simultaneously** in separate terminals for the app to work.

---

## 🔑 Environment Variables

**`backend/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Reference

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Private |

### Applications
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/applications` | Private |
| GET | `/api/applications` | Private |
| GET | `/api/applications/stats/summary` | Private |
| GET | `/api/applications/:id` | Private |
| PUT | `/api/applications/:id` | Private |
| DELETE | `/api/applications/:id` | Private |

### Interviews
| Method | Endpoint | Access |
|---|---|---|
| POST / GET | `/api/interviews` | Private |
| GET / PUT / DELETE | `/api/interviews/:id` | Private |

### Skills
| Method | Endpoint | Access |
|---|---|---|
| POST / GET | `/api/skills` | Private |
| PUT / DELETE | `/api/skills/:id` | Private |

### Profile
| Method | Endpoint | Access |
|---|---|---|
| GET / PUT | `/api/profile` | Private |

---

## ☁️ Deployment

| Layer | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://mongodb.com/atlas) |

After deploying, set:
- `CLIENT_URL` on Render → your deployed Vercel URL (for CORS)
- `VITE_API_URL` on Vercel → your deployed Render URL + `/api`

---

<div align="center">

Built with ❤️ by **Simran Jaiswal**

</div>
