import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest{
  constructor(err){
    const errorMessage = Object.values(err.errors)
      .map(error => error.message)
      .join('; ');
    super(`The following errors were found in your input: ${errorMessage}`);
  }
}

export default ValidationError;