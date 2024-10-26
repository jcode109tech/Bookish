const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null }, // Store old price for discounts
    newPrice: { type: Number, default: null }, // Store new price if applicable
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    ratings: { type: Number, default: 0 },
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
            rating: Number,
            createdAt: { type: Date, default: Date.now } // Track review date
        }
    ],
    image: { type: String, required: true }, // URL or path to the book image
    trending: { type: Boolean, default: false }, // Mark if the book is trending
    createdAt: { type: Date, default: Date.now }
});

// Create an index for faster searches
bookSchema.index({ title: 'text', author: 'text', category: 'text' });

module.exports = mongoose.model('Book', bookSchema);

