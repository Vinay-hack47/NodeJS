<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-FFB300?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

# 🧩 Node.js Auth System with JWT, Sessions, Rate-Limiter, and Multi-Device Login

---

## 📘 1. Project Overview
A fully-functional authentication backend built with Node.js, supporting:
- User registration & login
- Session-based authentication
- JWT token issuance
- Multi-device login support
- Rate-limiting to prevent brute-force
- Secure password handling
- Session storage in MongoDB
- Logout with session destruction

---

## 📦 2. Tech Stack & Tools
| Component           | Library/Tool Used           |
|---------------------|----------------------------|
| Web Framework       | Express.js                 |
| DB Connection       | Mongoose                   |
| Session Store       | express-session + connect-mongo |
| Password Hashing    | bcryptjs                   |
| JWT Auth Token      | jsonwebtoken               |
| Rate Limiting       | express-rate-limit         |
| Env Management      | dotenv                     |
| Testing             | Postman (Backend Only)     |

---

## 🧠 3. Core Concepts Used
- JWT (JSON Web Tokens) for secure user identification
- Sessions for stateful login (stored in MongoDB)
- Cookies for session tracking
- Middleware to protect routes, handle errors, and rate-limit access
- bcrypt for password hashing
- Rate-Limiting to prevent abuse
- Multi-device login by allowing multiple sessions per user

---

## 🏗️ 4. Project Structure (Suggested)
```
project/
│
├── controllers/
│   └── authController.js
│   └── productController.js
│   └── userController.js
│
├── routes/
│   └── authRoutes.js
│   └── productRoutes.js
│   └── userRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── rateLimiter.js
│   └── isAuthenticated.js
│
├── models/
│   └── User.js
│   └── Product.js
│   └── Session.js
│
├── utils/
│   └── jwtUtils.js
│   └── token.js
│
├── config/
│   └── db.js
│   └── connectDB.js
│
├── server.js
├── .env
└── package.json
```

---

## 🔧 5. Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Installation
```bash
# Clone the repo
$ git clone <repo-url>
$ cd JWT Authentication

# Install dependencies
$ npm install

# Set up environment variables
$ cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Running the Server
```bash
$ npm start
```

---

## 🔐 6. Authentication Flow (Step-by-Step)

### 🧾 A. Registration
**Endpoint:** `POST /api/v1/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourPassword"
}
```
**Sample Controller Logic:**
```js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};
```

### 🔐 B. Login
**Endpoint:** `POST /api/v1/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourPassword"
}
```
**Sample Controller Logic:**
```js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful', token });
};
```

**Rate Limiting:**
```js
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // 5 attempts
  message: 'Too many login attempts. Try again later.'
});
```

### 🌐 C. Accessing Protected Routes
**Sample Middleware:**
```js
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
```
**Usage:**
```js
app.get('/api/v1/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'You are authenticated!' });
});
```

### 🚪 D. Logout
**Endpoint:** `POST /api/v1/logout`

**Sample Controller Logic:**
```js
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  });
};
```

---

## 🧱 7. Session Handling & Multi-Device Login
- Each login (from different browser/device) gets its own session
- Sessions are saved in MongoDB (via connect-mongo)
- Multiple sessions = multiple device login
- To restrict, add logic to track and limit sessions per user

---

## 🚨 8. Rate Limiting Logic
- Middleware: `express-rate-limit`
- Applied only on login route
- Config:
```js
windowMs: 15 * 60 * 1000, // 15 mins
max: 5, // 5 attempts
```
- After 5 failed login attempts, returns:
  > "Too many login attempts. Try again later."
- To test: Send 5 wrong requests from same IP. Wait 15 mins or restart server to reset.
- You can also use `keyGenerator` to customize based on email/user/IP.

---

## 🛡️ 9. Security Measures
- ✅ Password Hashing using bcryptjs
- ✅ JWT Signed with secret from .env
- ✅ Rate Limiting to prevent brute-force
- ✅ Sessions stored securely in MongoDB
- ✅ Cookies marked with httpOnly, and optionally secure in production
- ✅ Auth Middleware to protect routes
- ✅ Centralized Error Handler for safe error responses

---

## 📥 10. Postman Collections
A ready-to-import Postman collection is available for:
- Register
- Login
- Logout
- Access protected route (session check)

> Let me know if you want this in JSON format or a sharable link.

---

## 🚀 11. Possible Improvements (Future Work)
- 🧠 Add password reset flow
- 📱 Add 2FA (OTP)
- 📌 Limit device logins per user
- 🧹 Session cleanup (expire unused ones)
- 🔁 Refresh tokens for longer JWT-based auth

---

## 🏅 Assignment & Credits

> **Assignment 7 of Celebal Technologies**


---

## 📄 License
This project is for educational purposes as part of Celebal Technologies Internship Assignment 7.
