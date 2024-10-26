# Bookish
Found of Learning! Inspire curiosity, spark imagination, deepen understanding.

# MERN Bookstore Application

## Overview
The **MERN Bookstore Application** is a [full-stack] Backend web application designed to manage a collection of books. It features user authentication, authorization, and logging capabilities, built using the **MERN stack**: MongoDB, Express, React, and Node.js.

## Features
- **User Authentication & Authorization**: Secure user registration, login, and role-based access control.
- **Book Management**: CRUD operations (Create, Read, Update, Delete) for books.
- **Search & Filter**: Users can search for books by title, author, and genre.
- **Logging**: System logs for key actions to ensure tracking and debugging.
- **Responsive Design**: Optimized UI for mobile and desktop devices.

## Technology Stack
### Frontend:
- **React**: JavaScript library for building user interfaces.
- **React Router**: Client-side routing.
- **Redux (optional)**: State management.
- **CSS / SCSS**: Styling the application.

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

### Additional Tools:
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt**: For password hashing.
- **Winston / Morgan**: Logging libraries.
- **Dotenv**: Environment variable management.

## Prerequisites
- **Node.js** (v14+)
- **MongoDB** (Local or hosted, e.g., MongoDB Atlas)
- **npm** or **yarn**

## Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/mern-bookstore.git
   cd mern-bookstore


## Project structure

### BACKEND

/backend
|   |--- config        # Configuration files (e.g., database connection)
│   |--- controllers/  # Request handling logic
│   |--- middleware/   # Authentication and validation middleware
│   |--- models /      # Mongoose models
│   ├── routes         # Express routes
│   ├── utils/         # Utility functions and helpers
│   ├── services/
│   └── uploads/      # Entry point for the server
|_____ index.js



# Bookish API Documentation

## Overview
This section provides detailed information on the API routes available in the MERN Bookstore application, covering user management, books, cart, orders, and payment processing.

## Table of Contents
- [User Routes](#user-routes)
- [Auth Routes](#auth-routes)
- [Book Routes](#book-routes)
- [Cart Routes](#cart-routes)
- [Order Routes](#order-routes)
- [Payment Routes](#payment-routes)
- [Error Handling Middleware](#error-handling-middleware)
- [Authentication Handling Middleware](#auth-handling-routes)
---

### User Routes

| Method | Endpoint            | Description                        | Access    | Request Arguments       |
|--------|----------------------|------------------------------------|-----------|-------------------------|
| GET    | `/users/`            | Get all users                      | Protected | -                       |
| GET    | `/users/:id`         | Get user details by ID             | Protected | `id` (URL param)        |
| PUT    | `/users/:id`         | Update user details                | Protected | `id` (URL param), `username`, `email`, `password` (body) |
| DELETE | `/users/:id`         | Delete a user                      | Protected | `id` (URL param)        |

### Auth Routes

| Method | Endpoint             | Description                        | Access    | Request Arguments       |
|--------|-----------------------|------------------------------------|-----------|-------------------------|
| POST   | `/register`           | Register a new user                | Public    | `username`, `email`, `password` (body) |
| POST   | `/login`              | User login                         | Public    | `email`, `password` (body) |
| POST   | `/send-otp`           | Send OTP for verification          | Public    | `email` (body)           |
| POST   | `/verify-otp`         | Verify OTP and complete action     | Public    | `email`, `otp` (body)    |

### Book Routes

| Method | Endpoint             | Description                        | Access    | Request Arguments       |
|--------|-----------------------|------------------------------------|-----------|-------------------------|
| GET    | `/books`              | Get all books                      | Protected | -                       |
| POST   | `/addbook`            | Add a new book (with image upload) | Protected | `title`, `author`, `description`, `price`, `category`, `stock` , `image` (form-data) |
| PUT    | `/books/:id`          | Update book details (with image)   | Protected |  `title`, `author`, `description`, `price`, `category`, `stock` , `image` (form-data) |
| DELETE | `/books/:id`          | Delete a book by ID                | Protected | `id` (URL param)        |

**Note**: The `/addbook` and `/books/:id` routes expect an image file in the `image` field.

### Cart Routes

| Method | Endpoint             | Description                        | Access    | Request Arguments       |
|--------|-----------------------|------------------------------------|-----------|-------------------------|
| GET    | `/cart`               | Get the current user's cart        | Protected | -                       |
| POST   | `/addtocart`          | Add a book to the cart             | Protected | `bookId`, `quantity` (body) |
| DELETE | `/cart/:bookId`       | Remove a book from the cart        | Protected | `bookId` (URL param)    |

### Order Routes

| Method | Endpoint             | Description                        | Access    | Request Arguments       |
|--------|-----------------------|------------------------------------|-----------|-------------------------|
| POST   | `/addorders`          | Place a new order                  | Protected | `** get from cart**`, (body) |
| GET    | `/orders`             | Get the current user's orders      | Protected | -                       |
| DELETE | `/orders/:orderId`    | Remove an order                    | Protected | `orderId` (URL param)   |
| PUT    | `/orders/:orderId`    | Update an order                    | Protected | `orderId` (URL param), `items`, `totalAmount`,`shippingAddress` (body) |

### Payment Routes

| Method | Endpoint             | Description                        | Access    | Request Arguments       |
|--------|-----------------------|------------------------------------|-----------|-------------------------|
| POST   | `/payment`            | Process a payment                  | Protected | `orderId`, `paymentMethod`, `amount` (body) |

### Error Handling Middleware

All routes are protected with authentication middleware, and the application uses an error-handling middleware to catch and process errors across the application.

---

## Middleware
- **Protect Middleware**: Ensures that routes are accessible only to authenticated users.
- **Error Handling**: Catches errors and returns appropriate responses to the client.

### Example Error Response:
```json
{
  "message": "ROUTE NOT FOUND"
}
