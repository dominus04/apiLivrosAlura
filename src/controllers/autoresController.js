import {autores} from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class AutorController{

    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (err) {
            next(err);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try{
            let autor = new autores(req.body);
            await autor.save();
            res.status(201).send(autor.toJSON());
        }catch(err){
            next(err);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

            if(autorResultado !== null)
                res.status(200).send({message: "Autor atualizado com sucesso"});
            else
                next(new NaoEncontrado("Id do autor não Localizado."));

        } catch (err) {
            next(err);
        }
        
    }; 

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findById(id);
            if(autorResultado !== null)
                res.status(200).json(autorResultado);
            else
                next(new NaoEncontrado("Id do Autor não Localizado."));

        } catch (err) {
            next(err);
        }
    };

    static deletarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findByIdAndDelete(id);

            if(autorResultado !== null)
                res.status(200).send({message: "Autor removido com sucesso"});
            else
                next(new NaoEncontrado("Id do autor não Localizado."));

        } catch (err) {
            next(err);
        }
    };

}

export default AutorController;