# 🗳️ Online Voting System - PERN Stack Project

A powerful, secure, and fully functional **online voting system** built using the **PERN Stack** (PostgreSQL, Express.js, React, Node.js). This system allows users to register, vote, and view candidates, while admins manage elections and monitor real-time results.

---

## 🚀 Features

- 🔐 User registration & login with **JWT Authentication**
- 🧑‍💼 Role-based system: `admin` and `voter`
- 🗳️ Single secure vote per voter
- 📋 Admin CRUD operations on candidates
- 📊 Real-time vote count display
- 📷 Profile image support for candidates and users
- 🌐 Fully responsive frontend using **React.js** and **Tailwind CSS**
- ☁️ PostgreSQL cloud-hosted database with image uploads using **Multer**
- 📧 Email verification using Nodemailer before login — only verified users can access the system


---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- React Router DOM  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- PostgreSQL  
- Multer (for image uploads)  
- Nodemailer (Email verification using Nodemailer)
- JWT + bcrypt (for security)  

---

## 🧠 How It Works

### 👤 Voter
- Register or log in
- Verify email before login
- View all candidates with details and images
- Cast one vote securely

### 🛡️ Admin
- Log in as admin
- Add, update, delete, or view candidates
- Access real-time voting results
- Manage users (future update)

---

## 🔐 Security Highlights

- **JWT Auth**: Tokens validate secure user sessions
- **Role-based access**: Only admins can manage candidates
- **bcrypt**: Passwords are hashed before saving
- **HTTP-only Cookies**: Prevents XSS attacks
- **Voting integrity**: User can vote only once

---

## 📁 Folder Structure

voting-app/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
| ├── uploads/ (for profile images)
| ├── .env
| ├── util/ (for nodemailer)
│ └── index.js (server entry)
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ └── App.js
├── README.md


---

## 🌍 Live Demo

🔗 [Live Hosted App](https://voting-app-git-main-raj-dubeys-projects.vercel.app/)

## 📦 GitHub Repository

🔗 [GitHub - Voting App](https://github.com/rajgit2024/Voting-App)

---

## 🧪 Local Setup Instructions
1. Setup Backend -
cd backend
npm install
npm run dev  #or nodemon index.js if nodemon is installed globally

2. Frontend Setup-
cd ../frontend
npm install
npm start

### 3. Create a `.env` file in the `backend/` folder
```env
PORT=5000
DATABASE_URL=your_postgresql_connection_url
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000



### 4. Clone the Repository
```bash
git clone https://github.com/rajgit2024/Voting-App
cd  Voting-App


## 👨‍💻 Developer

- **Raj Dubey**
- BCA Student at M.I.M.I.T College
- 📧 Email: rajdu590@gmail.com
- 💼 GitHub: [rajgit2024](https://github.com/rajgit2024)
- 🌐 LinkedIn: [https://www.linkedin.com/in/raj-dubey-21a650258](https://www.linkedin.com/in/raj-dubey-21a650258)