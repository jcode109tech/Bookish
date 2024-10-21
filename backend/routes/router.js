const express = require('express');

const { getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { getUserCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const { processPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { errorHandler } = require('../middleware/errorMiddleware');

const router = express.Router();


//user routes
router.get('/users/',protect, getAllUsers);
router.get('/users/:id',protect, getUserById);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id',protect,  deleteUser);

// Book routes
router.get('/books',protect, getAllBooks);
router.post('/books', protect, addBook);
router.put('/books/:id', protect, updateBook);
router.delete('/books/:id', protect, deleteBook);

// Cart routes
router.get('/cart', protect, getUserCart);
router.post('/cart', protect, addItemToCart);
router.delete('/cart/:bookId', protect, removeItemFromCart);

// Order routes
router.post('/orders',protect, placeOrder);
router.get('/orders', protect, getUserOrders);

// Payment routes
router.post('/payment',protect, processPayment);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
