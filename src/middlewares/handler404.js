import NaoEncontrado from "../errors/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function handler404 (req, res, next){
    const error404 = new NaoEncontrado();
    next(error404);
}

export default handler404;