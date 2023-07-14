import ErrorBase from "./ErrorBase.js";

class NaoEncontrado extends ErrorBase{
    constructor(message = "Página não encontrada."){
        super(message, 404);
    }
}

export default NaoEncontrado;