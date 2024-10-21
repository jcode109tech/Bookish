const Payment = require('../models/PaymentModel');
const Order = require('../models/OrderModel');

// Process payment
exports.processPayment = async (req, res) => {
    const { orderId, paymentMethod, amount } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        const newPayment = await Payment.create({
            orderId,
            userId: order.userId,
            amount,
            paymentMethod,
            status: 'Completed' // This should be dynamic based on the payment gateway response
        });

        // Update the order status
        order.paymentStatus = 'Completed';
        await order.save();

        res.status(200).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
