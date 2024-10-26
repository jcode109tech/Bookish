const Book = require('../models/BookModel');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author, description, price, category, stock } = req.body;

    // Get the filename of the uploaded image
    const image = req.file ? req.file.filename : null;

    try {
        const newBook = await Book.create({ title, author, description, price, category, stock, image });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update book details
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
