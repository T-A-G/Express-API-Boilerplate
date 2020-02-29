/**
* Function that takes errors thrown in the application and converts
* them to a valid json response with a status code.
* @param {Error} error
* @param {object} res express applicatin response object
*/
export const handleError = (error, res) => {
  const status = error.status || 500;
  const message = error.message || 'An unknown error occured';
  res.status(status).json({
    status,
    message,
  });
};

/*
* custom Error extension to add statuscodes. 
*/
export class ErrorHandler extends Error {
  constructor(message, status = 500) {
    super();
    this.status = status;
    this.message = message;
  }
}
