import autores from "../models/Autor.js";

class AutorController{

    static listarAutores = async (req, res) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static cadastrarAutor = async (req, res) => {
        try{
            let autor = new autores(req.body);
            await autor.save();
            res.status(201).send(autor.toJSON());
        }catch(err){
            res.status(501).send({message: `${err.message} - erro ao cadastrar autor`});
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, {$set: req.body})
            res.status(200).send({message: 'Autor atualizado com sucesso'})
        } catch (err) {
            res.status(500).send({message: err.message})
        }
        
    } 

    static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findById(id);
            res.status(200).json(autorResultado);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static deletarAutor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndDelete(id)
            res.status(200).send({message: "Autor removido com sucesso"})
        } catch (err) {
            res.status(500).send({message: err.message})
        }
    }

}

export default AutorController;