# AI Job Preparation & Mock Interview Platform

A full-stack, production-ready web application built to help software engineering candidates prepare for technical interviews using AI-driven question generation, real-time answer evaluation, resume analysis, skill gap mapping, and job role matching.

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Java 21 + Spring Boot 3.2.4
- **Web & Security**: Spring Web, Spring Security, JWT (HMAC-SHA256), BCrypt Password Hashing
- **Data & Persistence**: Spring Data JPA, Hibernate, MySQL Database (`ai_job_prep`)
- **PDF Extraction**: Apache PDFBox 3.0.2
- **AI Integration**: Google Gemini LLM API REST Client

### Frontend
- **Framework**: React 18 + Vite
- **Language**: JavaScript (ES6+)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with request/response interceptors
- **Icons**: Lucide React

---

## 📐 System Architecture

```
React Frontend (Vite)
       │
       ▼ (REST APIs over HTTPS with Bearer JWT)
Spring Boot Backend (Port 8080 or $PORT)
       │
  ┌────┴───────────────────────────┐
  ▼                                ▼
MySQL Database               Google Gemini AI API
(ai_job_prep schema)        (Question Gen & Evaluation)
```

---

## 🔑 Environment Variables & Configuration

### Backend Environment Variables (`backend/.env.example`)

| Variable Name | Description | Default / Example |
|---|---|---|
| `PORT` | HTTP server port for cloud hosting | `8080` |
| `DATABASE_URL` / `DB_URL` | MySQL JDBC connection string | `jdbc:mysql://localhost:3306/ai_job_prep?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC` |
| `DATABASE_USERNAME` / `DB_USERNAME` | MySQL database user | `root` |
| `DATABASE_PASSWORD` / `DB_PASSWORD` | MySQL database password | `root` |
| `JWT_SECRET` | 256-bit secret key for JWT signing | *Secure 64-char Hex/Base64 string* |
| `JWT_EXPIRATION_MS` | JWT expiration time in milliseconds | `86400000` (24 hours) |
| `GEMINI_API_KEY` | Google Gemini AI REST API key | *Your API Key* |
| `GEMINI_MODEL` | Gemini LLM model identifier | `gemini-1.5-flash` |
| `FRONTEND_URL` / `ALLOWED_ORIGINS` | Comma-separated list of CORS origins | `http://localhost:5173,http://localhost:3000` |

### Frontend Environment Variables (`frontend/.env.example`)

| Variable Name | Description | Default / Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of Spring Boot REST API | `http://localhost:8080/api` |

---

## 📑 API Endpoints Registry

### Health Check
- `GET /api/health` — Public status check endpoint.

### Authentication
- `POST /api/auth/register` — Create a new candidate account.
- `POST /api/auth/login` — Authenticate credentials and receive a JWT Bearer token.

### User Profile
- `GET /api/users/me` — Fetch currently authenticated user details.
- `GET /api/users/{id}` — Fetch user by ID (Enforces strict user isolation).

### AI Interview Practice
- `POST /api/interview/generate` — Generate ONE AI technical question (`topic`, `difficulty`).
- `POST /api/interview/evaluate` — Evaluate candidate's written answer and persist result to MySQL.
- `GET /api/interview/history` — Fetch authenticated user's complete past interview sessions.
- `GET /api/interview/{id}` — Fetch detailed evaluation breakdown for a specific session.

### Resume Analyzer
- `POST /api/resume/analyze` — Upload PDF resume (Max 5MB) for AI extraction and skill analysis.

### Skill Gap Analysis
- `POST /api/skills/analyze` — Compare candidate skills against target job role requirements.

### Job Role Matching
- `GET /api/job-roles` — List available industry job roles.
- `POST /api/job-roles/match` — Calculate percentage match, matched/missing skills, and learning plan.

### Dashboard
- `GET /api/dashboard/summary` — Aggregated real-data dashboard stats (counts, averages, top topics, skill gaps, learning steps).

---

## 🗄️ Database Schema Overview

Tables automatically created/updated via Hibernate:
1. `users` — Candidate user credentials (`id`, `name`, `email`, `password` [BCrypt], `role`, `created_at`).
2. `interviews` — Saved interview attempts (`id`, `user_id`, `topic`, `difficulty`, `question`, `user_answer`, `score`, `correctness`, `ideal_answer`, `created_at`).
3. `interview_strengths` — Element collection table mapping interview IDs to strength strings.
4. `interview_improvements` — Element collection table mapping interview IDs to improvement advice strings.

---

## 🚀 Local Production Simulation Setup

### 1. Backend Setup
```bash
cd backend
mvn clean package -DskipTests
java -jar target/interview-platform-backend-0.0.1-SNAPSHOT.jar
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run build
npm run preview
```

---

## 🔒 Security Summary
- **Stateless Authentication**: JWT bearer token verification on all protected API routes.
- **Data Isolation**: Strict user-level data scoping (`userId` resolved server-side from JWT context).
- **CORS Restricted**: Production CORS explicitly configured via `FRONTEND_URL`.
- **Upload Boundaries**: Strict PDF MIME type validation, 5MB limit, and text length truncation (15,000 characters).
- **Secret Hygiene**: Zero secret credentials committed in source code.
