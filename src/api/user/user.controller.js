import { ErrorHandler } from '../../utils/errorHandler';
import { sendResponse } from '../../utils/responseHandler';

export async function index(req, res, next) {
  try {
    const user = req.user.toJSON();
    sendResponse(res, 200, { user });
  } catch (e) {
    const uploadError = new ErrorHandler('An unexpected error occured when trying to retrieve user.');
    next(uploadError);
  }
}

export async function login(req, res, next) {
  try {
    const { jwtToken } = req;
    const user = req.user.toJSON();
    sendResponse(res, 200, { jwtToken, user });
  } catch (e) {
    const uploadError = new ErrorHandler('An unexpected error occured when trying to login.');
    next(uploadError);
  }
}
