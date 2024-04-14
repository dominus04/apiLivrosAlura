import NotFound from "../errors/NotFound.js";
import { author, book } from "../models/index.js";

class BookController{

  static async listBooks(req, res, next){
    
    try {
      const {limit, page} = getPageAndLimit(req.query);
      const bookList = await book.find({}).limit(limit).skip(page);
      res.status(200).json(bookList);
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next){
    try {
      const bookById = await book.findById(req.params.id);
      if(bookById !== null){
        res.status(200).json(bookById);
      }else{
        next(new NotFound("Book ID not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async getBooksByFilter(req, res, next){
    try {
      const {limit, page} = getPageAndLimit(req.query);
      const search = createSearch(req.query);

      const bookList = await book.find(search).limit(limit).skip(page);
      if(bookList !== null)
        res.status(200).json(bookList);
      else
        next(new NotFound("No books found with the provided filter!"));
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req, res, next){
    const newBook = req.body;
    let fullBook = newBook;
    try {
      if(newBook.author){
        const foundAuthor = await author.findById(newBook.author);
        fullBook = {...newBook, author: {...foundAuthor._doc}};
      }
      const createdBook = await book.create(fullBook);
      res.status(201).json({
        message: "Success on create!", 
        book: createdBook
      }   );
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next){
    const newBook = req.body;
    let fullBook = {};
    try {
      if(newBook.author){
        const foundAuthor = await author.findById(newBook.author);
        fullBook = {...newBook, author: {...foundAuthor._doc}};
      }else{
        fullBook = newBook;
      }
      const updatedBook = await book.findByIdAndUpdate(req.params.id, fullBook, {new: true});
      if(updatedBook !== null)
        res.status(200).json({
          message: "Book up-to-date!",
          book: updatedBook
        });
      else
        next(new NotFound("Book ID not found!"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookById(req, res, next){
         
    try {
      const id = req.params.id;
      const deletedBook = await book.findByIdAndDelete(id);
      if(deletedBook !== null)
        res.status(200).json({
          message: `The book with id: ${id} was successfully deleted.`
        });
      else
        next(new NotFound("Book ID not found!"));
    } catch (error) {
      next(error);
    }
  }

};

function createSearch(params) {
  const {publisher, title, minPages, maxPages, authorName} = params;

  const search ={};
  
  if(publisher) search.publisher = {$regex: publisher, $options: "i"};
  if(title) search.title = {$regex: title, $options: "i"};

  if(minPages || maxPages) search.pages = {};

  if(minPages) search.pages.$gte = minPages;
  if(maxPages) search.pages.$lte = maxPages;

  if(authorName) search['author.name'] = {$regex: authorName, $options: "i"};
  
  return search;
}

function getPageAndLimit(params){
  const limit = params.limit;
  const page = (params.page - 1) * limit;

  return {limit, page};
}



export default BookController;