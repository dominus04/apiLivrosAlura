import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function handler404(req, res, next){
  const error404 = new NotFound();
  next(error404);
}

export default handler404;