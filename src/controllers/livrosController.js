import NaoEncontrado from "../errors/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class LivroController{

    static listarLivros = async (req, res, next) => {
        try {
            
            const buscaLivros = livros.find().populate("autor", "nome");

            req.resultado = buscaLivros;

            next();


        } catch (err) {
            next(err);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try{
            let livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        }catch(err){
            next(err);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body}).populate("autor", "nome").exec();
            
            if(livroResultado !== null)
                res.status(200).send({message: "Livro atualizado com sucesso"});
            else
                next(new NaoEncontrado("Id do Livro não Localizado"));

        } catch (err) {
            next(err);
        }
        
    }; 

    static mostraLivroId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroResultado = await livros.findById(id);

            if(livroResultado !== null)
                res.status(200).json(livroResultado);
            else
                next(new NaoEncontrado("Id do Livro não Localizado"));

        } catch (err) {
            next(err);
        }
    };

    static deletarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroResultado =  await livros.findByIdAndDelete(id);

            if(livroResultado !== null)
                res.status(200).send({message: "Livro removido com sucesso"});
            else
                next(new NaoEncontrado("Id do Livro não Localizado"));

            
        } catch (err) {
            next(err);
        }
    };

    static mostrarLivrosPorFiltro = async (req, res, next) => {

        try {
            
            const busca = await processaBusca(req.query);

            const livrosResultado = livros.find(busca).populate("autor", "nome");

            req.resultado = livrosResultado;

            next();
            
        } catch (err) {
            next(err);
        }
    };

}

async function processaBusca(parametros){

    const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;

    let busca = {};

    if(editora) busca.editora =  {$regex: editora, $options: "i"};
    if(titulo) busca.titulo = {$regex: titulo, $options: "i"};

    if(minPaginas || maxPaginas) busca.numeroPaginas = {};

    if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    if(nomeAutor){
        const autor = await autores.findOne({nome: {$regex: nomeAutor, $options: "i"}});
        if(autor !== null)
            busca.autor = autor._id;
        else
            busca = null;
    }

    return busca;

}

export default LivroController;