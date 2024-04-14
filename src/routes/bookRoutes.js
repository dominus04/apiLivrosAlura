import express from 'express';
import BookController from '../controllers/bookController.js';

const bookRoutes = express.Router();

bookRoutes.get('/books', BookController.listBooks);
bookRoutes.get('/books/search', BookController.getBooksByFilter);
bookRoutes.get('/books/:id', BookController.getBookById);
bookRoutes.post('/books', BookController.createBook);
bookRoutes.put('/books/:id', BookController.updateBook);
bookRoutes.delete('/books/:id', BookController.deleteBookById);

export default bookRoutes;