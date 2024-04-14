import BaseError from "./BaseError.js";

class BadRequest extends BaseError{
  constructor(message="There are errors on your request!",){
    super(message,400);
  }
}

export default BadRequest;