const express = require('express');
const multer = require('multer');
const path = require('path');

const { getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { getUserCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { placeOrder, getUserOrders, updateOrder, removeOrder } = require('../controllers/orderController');
const { processPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { errorHandler } = require('../middleware/errorMiddleware');

const router = express.Router();


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Save files to the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use timestamp to avoid filename collisions
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }
});

//user routes
router.get('/users/', protect, getAllUsers);
router.get('/users/:id',protect, getUserById);
router.put('/users/:id',protect,  updateUser);
router.delete('/users/:id',protect,  deleteUser);

// Book routes
router.get('/books',protect, getAllBooks);
router.post('/addbook',protect, upload.single('image'), addBook); // Expecting image in 'image' field
router.put('/books/:id',protect, upload.single('image'), updateBook);
router.delete('/books/:id',protect, deleteBook);

// Cart routes
router.get('/cart',protect, getUserCart);
router.post('/addtocart',protect, addItemToCart);
router.delete('/cart/:bookId',protect, removeItemFromCart);

// Order routes
router.post('/addorders',protect, placeOrder);
router.get('/orders',protect,  getUserOrders);
router.delete('/orders/:orderId',protect, removeOrder);
router.put('/orders/:orderId',protect, updateOrder);


// Payment routes
router.post('/payment',protect, processPayment);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
