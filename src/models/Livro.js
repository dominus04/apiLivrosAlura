import mongoose, { Schema } from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {type: String, required: [true, "O título do livro é obrigatório"]},
        autor: {type: Schema.Types.ObjectId, ref: "autores", required: [true, "O ID de um(a) autor(a) é obrigatório"]},
        editora: {
            type: String, 
            required: [true, "O nome da editora é obrigatório"],
            enum: {
                values: ["Casa do Código", "Alura"],
                message: "A editora {VALUE} não é permitida"
            }
        },
        numeroPaginas: {
            type: Number,
            min: [1, "O livro precisa ter no mínimo 1 página"],
            max: [10000, "O livro pode ter no máximo 10000 páginas"]
        }
    }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;