import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  title: {type: String, required: [true, "The book 'title' is required"]},
  publisher: {
    type: String,
    required: [true, "The 'publisher' is required"],
    enum: {
      values: ["Casa do Código", "Alura"],
      message: "The publisher {VALUE} is not allowed"
    }
  },
  price: {type: Number},
  pages: {
    type: Number,
    validate:{
      validator: (input) => {return input >= 10 && input <= 5000;},
      message: "The number of pages entered ({VALUE}) is not allowed. The value must be between 10 and 5000"
    }
  },
  author: {type: authorSchema, required: [true, "'author' field is required"]}
}, {versionKey: false});

const book = mongoose.model('books', bookSchema);

export default book;