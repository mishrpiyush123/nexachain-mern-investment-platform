# MERN Investment & Referral Platform

## Project Setup Steps

### Backend
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm run dev

---

## Environment Variables

Backend .env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

## API Documentation

POST /api/auth/register
Register User

POST /api/auth/login
Login User

GET /api/dashboard
Get Dashboard Data

POST /api/investments
Create Investment

GET /api/referrals
Get Referral History

POST /api/withdraw
Create Withdrawal Request

---

## Assumptions Made During Development

1. ROI is generated daily through cron job.
2. Referral income is generated when referred users invest.
3. JWT authentication is used.
4. MongoDB is the primary database.
5. Each user has a unique referral code.
6. The admin dashboard is intended for authorized admin users.
