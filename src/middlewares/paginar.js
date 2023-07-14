import BadRequest from "../errors/BadRequest.js";

async function paginar(req, res, next) {

    try {
        let { limite = 3, pagina = 1, ordenacao = "_id:-1" } = req.query;

        limite = parseInt(limite);
        pagina = parseInt(pagina);

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        ordem = parseInt(ordem);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado.find()
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec();
            res.status(200).json(resultadoPaginado);
        } else {
            next(new BadRequest());
        }
    } catch (err) {
        next(err);
    }
}

export default paginar;

