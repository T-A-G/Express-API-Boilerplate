export const sendResponse = (res, code = 200, result = {}) => {
  res.status(code).json(result);
};
