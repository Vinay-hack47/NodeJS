# 📁 Advance Express File Upload & Trending Repos App

![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb) ![Multer](https://img.shields.io/badge/Multer-File_Upload-blue) ![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-yellow)

## 🚀 Project Overview

Advance Express is a robust, full-stack Node.js application for secure file uploads, management, and trending GitHub repository discovery. Built with Express, Multer, and MongoDB, it features a modern frontend and a clean REST API. Ideal for learning, demos, or as a foundation for production-ready file management systems.

---

## 🎬 Demo / Preview

> _"Upload, list, download, and delete files with ease. Discover trending GitHub repositories in real time!"_

![App Demo Screenshot](screenshots/demo.png)

---

## ✨ Features

- 📤 **File Upload**: Upload files (images, PDFs, text, zip) with Multer
- 🛡️ **Validation**: Enforces file type and 5MB size limit
- 📚 **File Listing**: View all uploaded files with metadata
- ⬇️ **Download**: Download files by ID
- 🗑️ **Delete**: Remove files from server and database
- ⚡ **Trending Repos**: Fetch top trending GitHub repositories (last 7 days)
- 🧩 **REST API**: Clean, well-structured endpoints
- 💾 **MongoDB**: Stores file metadata
- 🖥️ **Frontend**: Responsive UI with HTML, CSS, and Vanilla JS
- 🛠️ **Error Handling**: Centralized error middleware

---

## 📂 Folder Structure

```text
Advance Express/
│
├── index.js                # Main server entry point
├── package.json            # Project metadata & dependencies
├── README.md               # Project documentation
│
├── config/
│   └── multerConfig.js     # Multer storage & validation config
│
├── controllers/
│   ├── trendingController.js   # GitHub trending repos logic
│   └── uploadController.js     # File upload/list/download/delete logic
│
├── db/
│   └── connectDB.js        # MongoDB connection setup
│
├── models/
│   └── model.file.js       # File metadata Mongoose model
│
├── public/
│   ├── index.html          # Frontend HTML
│   ├── css/
│   │   └── style.css       # Frontend styles
│   └── js/
│       └── main.js         # Frontend logic
│
├── routes/
│   └── uploadRoutes.js     # API route definitions
│
├── uploads/                # Uploaded files storage
└── ...
```

---

## 🛠️ Tech Stack

| Layer      | Technology                |
|------------|---------------------------|
| Backend    | Node.js, Express          |
| Database   | MongoDB, Mongoose         |
| File Upload| Multer                    |
| Frontend   | HTML, CSS, Vanilla JS     |
| API        | GitHub REST API           |

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/advance-express.git
   cd advance-express
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start MongoDB** (ensure it's running locally on default port)
4. **Run the app**
   ```bash
   npm start
   ```
5. **Open in browser**
   - Visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### File Management

| Method | Endpoint           | Description                | Body/Form Data         |
|--------|--------------------|----------------------------|------------------------|
| POST   | `/api/upload`      | Upload a file              | `myFile` (form-data)   |
| GET    | `/api/files`       | List all files             | -                      |
| GET    | `/api/download/:id`| Download file by ID        | -                      |
| DELETE | `/api/delete/:id`  | Delete file by ID          | -                      |

### Trending GitHub Repos

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | `/api/trending`    | Top 10 trending repos      |

---


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open source. See `LICENSE` for details.
