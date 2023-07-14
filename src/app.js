import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorsHandler.js";
import handler404 from "./middlewares/handler404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
    console.log("Conexão efetuada com sucesso.");
});

const app = express();

routes(app);

app.use(handler404);

app.use(errorHandler);

export default app;

