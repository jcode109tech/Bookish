const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');

// Place an order
exports.placeOrder = async (req, res) => {
    const { userId } = req.user;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

        const newOrder = await Order.create({
            userId,
            items: cart.items,
            totalAmount: cart.totalAmount,
            shippingAddress: req.body.shippingAddress,
        });

        // Clear the cart after order placement
        await Cart.deleteOne({ userId });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    const { userId } = req.user;
    try {
        const orders = await Order.find({ userId }).populate('items.bookId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
