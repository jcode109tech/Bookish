const Cart = require('../models/CartModel');
const Book = require('../models/BookModel');

// Get user cart
exports.getUserCart = async (req, res) => {
    const { userId } = req.user;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.bookId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { userId } = req.user;
    const { bookId, quantity } = req.body;
    // const { bookId, quantity, userId } = req.body; == bypass auth
    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $addToSet: { items: { bookId, quantity } }, $inc: { totalAmount: book.price * quantity } },
            { new: true, upsert: true }
        );

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    const { userId } = req.user;
    const { bookId } = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { bookId } } },
            { new: true }
        );

        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
