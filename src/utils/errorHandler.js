/*
* Error handler
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
* custom Error extension to add statuscodes
*/
export class ErrorHandler extends Error {
  constructor(message, status = 500) {
    super();
    this.status = status;
    this.message = message;
  }
}
