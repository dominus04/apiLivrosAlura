import livros from "../models/Livro.js";

class LivroController{

    static listarLivros = async (req, res) => {
        try {
            const livrosResultado = await livros.find().populate("autor", "nome").exec();
            res.status(200).json(livrosResultado);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static cadastrarLivro = async (req, res) => {
        try{
            let livro = new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        }catch(err){
            res.status(501).send({message: `${err.message} - erro ao cadastrar livro`});
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, {$set: req.body}).populate("autor", "nome").exec();
            res.status(200).send({message: 'Livro atualizado com sucesso'});
        } catch (err) {
            res.status(500).send({message: err.message});
        }
        
    } 

    static mostraLivroId = async (req, res) => {
        try {
            const id = req.params.id;
            const livroResultado = await livros.findById(id);
            res.status(200).json(livroResultado);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static deletarLivro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id)
            res.status(200).send({message: "Livro removido com sucesso"})
        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }

    static mostrarLivrosPorEditora = async (req, res) => {
        const editora = req.param("editora")
        try {
            const livrosResultado = await livros.find({'editora': editora}).populate("autor", "nome").exec();
            res.status(200).json(livrosResultado);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

export default LivroController;