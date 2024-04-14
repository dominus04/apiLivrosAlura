import NotFound from "../errors/NotFound.js";
import { author } from "../models/index.js";

class AuthorController{
  
  static async listAuthors(req, res, next){
    try {
      const authorList = await author.find({});
      res.status(200).json(authorList);
    } catch (error) {
      next(error);
    }
  }
  
  static async getAuthorById(req, res, next){
    try {
      const authorById = await author.findById(req.params.id);
      if(authorById !== null){
        res.status(200).json(authorById);
      }else{
        next(new NotFound("Author ID not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createAuthor(req, res, next){
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: "Success on create!",
        author: newAuthor
      }   );
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(req, res, next){
    try {
      const updatedAuthor = await author.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if(updatedAuthor !== null)
        res.status(200).json({
          message: "author up-to-date!",
          author: updatedAuthor
        });
      else
        next(new NotFound("Author ID not found!"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthorById(req, res, next){
    try {
      const id = req.params.id;
      const deletedAuthor = await author.findByIdAndDelete(id);
      
      if(deletedAuthor !== null)
        res.status(200).json({
          message: `The author with id: ${id} was successfully deleted.`
        });
      else
        next(new NotFound("Author ID not found!"));
    } catch (error) {
      next(error);
    }
  }

};

export default AuthorController;