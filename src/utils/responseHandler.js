/**
* Function that take a express application response object and send out a json
* response with an status code.
* @param {object} res express applicatin response object
* @param {int} code http status code that with default value of 200
* @param {object} result object that should be returned as the json response 
*/
export const sendResponse = (res, code = 200, result = {}) => {
  res.status(code).json(result);
};
