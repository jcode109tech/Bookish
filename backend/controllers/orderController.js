const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
const Book = require('../models/BookModel');


exports.placeOrder = async (req, res) => {
    const { userId } = req.user // Get userId from authenticated request
    // const { userId } = req.body;
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.bookId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty or not found' });
        }

        // Prepare items for the order
        const orderItems = cart.items.map(item => {
            return {
                bookId: item.bookId._id,
                quantity: item.quantity,
                price: item.bookId.price // Assuming price is in the Book model
            };
        });

        // Calculate total amount
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Create the order
        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount
        });

        await newOrder.save();

        // Optionally clear the cart
        await Cart.deleteOne({ userId }); // Or update the cart to clear items

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get user's orders
exports.getUserOrders = async (req, res) => {
    const { userId } = req.user
    // const { userId } = req.body; 

    try {
        const orders = await Order.find({ userId }).populate('items.bookId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update an order
exports.updateOrder = async (req, res) => {
    const { userId } = req.user;
    const { orderId } = req.params; // Get orderId from request parameters
    const { items, totalAmount, shippingAddress } = req.body; // Get updated fields from the request body

    try {
        // Find the order by ID and userId
        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found or does not belong to user' });
        }

        // Update the order fields
        if (items) order.items = items; // Update items if provided
        if (totalAmount) order.totalAmount = totalAmount; // Update total amount if provided
        if (shippingAddress) order.shippingAddress = shippingAddress; // Update shipping address if provided

        await order.save(); // Save the updated order

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Remove an order
exports.removeOrder = async (req, res) => {
    const { userId } = req.user;
    const { orderId } = req.params; // Get orderId from request parameters

    try {
        const order = await Order.findOneAndDelete({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found or does not belong to user' });
        }

        res.status(200).json({ message: 'Order removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
