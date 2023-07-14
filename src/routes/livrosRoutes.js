import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/livros", LivroController.listarLivros,   paginar)
    .get("/livros/busca", LivroController.mostrarLivrosPorFiltro, paginar)
    .get("/livros/:id", LivroController.mostraLivroId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.deletarLivro);

export default router;