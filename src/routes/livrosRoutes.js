import express from 'express'
import LivroController from '../controllers/livrosController.js';

const router = express.Router();

router
    .get("/livros", LivroController.listarLivros)
    .get("/livros/busca", LivroController.mostrarLivrosPorEditora)
    .get("/livros/:id", LivroController.mostraLivroId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.deletarLivro)

export default router;