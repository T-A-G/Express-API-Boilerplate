import { Router } from 'express';
import passport from 'passport';
import * as controller from './user.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false, failWithError: true }), controller.index);
router.post('/register', passport.authenticate('register', { session: false, failWithError: true }), controller.register);
router.post('/login', passport.authenticate('login', { session: false, failWithError: true }), controller.login);

export default router;
