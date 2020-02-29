import {pick} from 'lodash'
import { ErrorHandler } from '../../utils/errorHandler';
import { sendResponse } from '../../utils/responseHandler';
/**
* function which returns user information of current user
*/
export async function index(req, res, next) {
  try {
    const user = pick(req.user,['email'])
    sendResponse(res, 200, { user });
  } catch (e) {
    const uploadError = new ErrorHandler('An unexpected error occured when trying to retrieve user.');
    next(uploadError);
  }
}

/**
* function which returns information of current user and generated JWT token
* after user successfully logged in.
*/
export async function login(req, res, next) {
  try {
    const { jwtToken } = req;
    const user = pick(req.user,['email'])
    sendResponse(res, 200, { jwtToken, user });
  } catch (e) {
    const uploadError = new ErrorHandler('An unexpected error occured when trying to login.');
    next(uploadError);
  }
}
