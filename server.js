// server.js
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
];

// GET all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.status(200).json(book);
});

// POST a new book
app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).send('Title and author are required');
    }
    
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    
    books.push(book);
    res.status(201).json(book);
});

// PUT (update) an existing book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    
    if (!req.body.title || !req.body.author) {
        return res.status(400).send('Title and author are required');
    }
    
    book.title = req.body.title;
    book.author = req.body.author;
    res.status(200).json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');
    
    const deletedBook = books.splice(bookIndex, 1);
    res.status(200).json(deletedBook);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});