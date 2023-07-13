import express from "express";
import db from './config/dbConnect.js';
import livros from './models/Livro.js';
import routes from './routes/index.js'


db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", ()=>{
    console.log("Conexão efetuada com sucesso.");
})


const app = express();

routes(app);


export default app
