import express from 'express';
import AuthorController from '../controllers/authorController.js';

const authorRoutes = express.Router();

authorRoutes.get('/authors', AuthorController.listAuthors);
authorRoutes.get('/authors/:id', AuthorController.getAuthorById);
authorRoutes.post('/authors', AuthorController.createAuthor);
authorRoutes.put('/authors/:id', AuthorController.updateAuthor);
authorRoutes.delete('/authors/:id', AuthorController.deleteAuthorById);

export default authorRoutes;