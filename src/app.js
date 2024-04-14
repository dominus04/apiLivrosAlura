import express from "express";
import databaseConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import handler404 from "./middleware/handler404.js";

const connection = await databaseConnect();

connection.on("error", (erro) => {
  console.error("Connection error", erro);
});

connection.once("open", () => {
  console.log("Success on database connection!");
});

const app = express();
routes(app);

app.use(handler404);

//eslint-disable-next-line no-unused-vars
app.use(errorHandler);

export default app;