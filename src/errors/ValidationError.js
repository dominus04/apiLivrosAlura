import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest{

    constructor(err){
        const errorMessages = Object.values(err.errors)
            .map(erro => erro.message)
            .join("; ");
        super(`Os seguintes erros foram encontrados: ${errorMessages}.`);
    }

}

export default ValidationError;