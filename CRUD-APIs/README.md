# CRUD-APIs: Node.js REST API for Users & Products

## 🚀 Overview
A production-grade RESTful API built with Node.js, Express, and MongoDB (Mongoose) for managing users (authentication) and products (CRUD). Features secure JWT authentication, robust access control, and a clean, scalable codebase.

---

## 🏁 Quick Start (5 Minutes)

1. **Clone the repo & install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd CRUD-APIs
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the root:
     ```
     SECRET_KEY=your_jwt_secret
     MONGO_URI=mongodb://localhost:27017/crud-op
     ```
3. **Start MongoDB** (locally or use Atlas)
4. **Run the server:**
   ```bash
   node index.js
   ```
   The API is now live at `http://localhost:3000`

---

## 🧩 Project Structure
```
├── index.js                # Entry point
├── controllers/            # Business logic (user, product)
├── routes/                 # API route definitions
├── model/                  # Mongoose models
├── middleware/             # Auth middleware
├── db/                     # DB connection
├── .env                    # Environment variables
├── package.json            # Dependencies
```

---

## 🔒 Authentication Flow
- **Register** → **Login** → JWT token set in HTTP-only cookie (`token`)
- **All product endpoints require authentication**
- **Logout** clears the token

---

## 📚 API Endpoints & Examples

### User Endpoints

#### 1. Register
- **POST** `/api/v1/user/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `200 OK` `{ "message": "User created successfully" }`
  - `400 Bad Request` (missing fields/email exists)

#### 2. Login
- **POST** `/api/v1/user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `200 OK` (sets HTTP-only cookie `token`)
    ```json
    {
      "message": "Welcome back John Doe",
      "success": true,
      "user": { /* user data */ }
    }
    ```
  - `400 Bad Request` (invalid credentials)

#### 3. Logout
- **POST** `/api/v1/user/logout`
- **Response:**
  - `200 OK` `{ "message": "User logged out successfully.", "success": true }`

---

### Product Endpoints (Authenticated)

> **Note:** All product endpoints require the `token` cookie (set after login).

#### 1. Create Product
- **POST** `/api/v1/product/create`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "price": "100",
    "description": "Product description",
    "stock": 10
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    {
      "message": "Product created successfully",
      "product": { /* product data */ }
    }
    ```
  - `400 Bad Request` (missing fields)

#### 2. Get All Products (Created by User)
- **GET** `/api/v1/product/getAll`
- **Response:**
  - `200 OK`
    ```json
    {
      "products": [ /* array of products */ ]
    }
    ```

#### 3. Get Single Product
- **GET** `/api/v1/product/get/product/:id`
- **Response:**
  - `200 OK` `{ "product": { /* product data */ } }`
  - `404 Not Found` (not found/not authorized)

#### 4. Update Product
- **PUT** `/api/v1/product/update/product/:id`
- **Body:** (any/all fields)
  ```json
  {
    "name": "Updated Name",
    "price": "120",
    "description": "Updated description",
    "stock": 15
  }
  ```
- **Response:**
  - `200 OK`
    ```json
    {
      "message": "Product updated successfully",
      "product": { /* product data */ }
    }
    ```
  - `404 Not Found` (not found/not authorized)

#### 5. Delete Product
- **DELETE** `/api/v1/product/delete/product/:id`
- **Response:**
  - `200 OK` `{ "message": "Product deleted successfully" }`
  - `404 Not Found` (not found/not authorized)

---

## 🛡️ Error Handling
- All endpoints return appropriate HTTP status codes and error messages for invalid input, authentication errors, and server errors.

---

## 🧪 Testing Endpoints
- Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test endpoints.
- **Login first** to get the `token` cookie, then use it for product requests.
- Example Postman flow:
  1. Register → Login → Copy cookie → Test product endpoints

---

## 📝 License
ISC License

---

## 👤 Author
Celebal Internship Assignment

---

## 💡 Tips
- For production, use HTTPS and secure cookie settings
- Extend models/controllers for more features
- Add validation, logging, and tests as needed

---

Happy Coding! 🎉
