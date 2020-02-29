import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../api/user/user.model';
import { ErrorHandler } from '../utils/errorHandler';

/**
* Function that initializes passport.js functionality.
* @param {object} passport passport middleware instance
*/
const initializePassport = (passport) => {
  // login user
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email }).exec();

          // user can't be found with given email
          if (!user) {
            const invalidEmailError = new ErrorHandler('Invalid email address.', 401);
            return done(invalidEmailError, false);
          }


          // password is incorrect
          const validPassword = await user.validatePassword(password);
          if (!validPassword) {
            const invalidPasswordError = new ErrorHandler('Invalid password for email address.', 401);
            return done(invalidPasswordError, false);
          }

          // user is correctly authenticated
          const jwtToken = user.toJwtToken();
          req.jwtToken = jwtToken;


          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  // handle JWT verification
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.JWT_SECRET,
        passReqToCallback: true,
      },
      async (req, jwtPayload, done) => {
        try {
          const user = await User.findOne({ email: jwtPayload.email }).exec();

          // check if user exists
          if (!user) {
            const userNotFoundError = new ErrorHandler('User not found.', 401);
            done(userNotFoundError, false);
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};

export default initializePassport;
