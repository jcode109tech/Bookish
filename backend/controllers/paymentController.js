const Payment = require('../models/PaymentModel');
const Order = require('../models/OrderModel');


// Mock function simulating payment gateway interaction
const processPaymentGateway = async (amount, paymentMethod) => {
    // Simulate payment processing (Replace with real payment gateway API call)
    // Return { status: 'success' or 'failure', transactionId: '...', etc. }
    return { status: 'success', transactionId: 'txn_1234567890' };
};


// Process payment
exports.processPayment = async (req, res) => {
    const { orderId, paymentMethod, amount, } = req.body;

    try {
        // Fetch the order by ID
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        // Check if the payment amount matches the order total
        if (amount !== order.totalAmount) {
            return res.status(400).json({ error: 'Invalid payment amount' });
        }

        // Simulate a call to a payment gateway
        const paymentResponse = await processPaymentGateway(amount, paymentMethod);
        if (paymentResponse.status !== 'success') {
            return res.status(400).json({ error: 'Payment failed' });
        }

        // Create new payment
        const newPayment = await Payment.create({
            orderId,
            userId: order.userId,
            amount,
            paymentMethod,
            status: 'Completed', // Make dynamic based on payment gateway response
            transactionId: paymentResponse.transactionId
        });

        // Update order status
        order.paymentStatus = 'Completed';

        await order.save();

        if (order.paymentStatus === 'Completed')
            await Order.delete({ userId });

        res.status(200).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
