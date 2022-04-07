import { Router } from 'express';
import passport from 'passport';
import unless from '../util/unless';
import Register from './Register';
import Login from './Login';
import RefreshToken from './RefreshToken';
import CourseController from './Courses/CourseController';
import getProfile from './getProfile';
import updateProfile from './updateProfile';
import Logout from './Logout';
const router = Router();

router.use(
	unless(passport.authenticate('jwt', { session: false }), [
		'/login',
		'/register',
		'/refreshToken',
	])
);

router.get('/me', getProfile);
router.patch('/me', updateProfile);
router.post('/login', Login);
router.post('/logout', Logout);
router.post('/register', Register);
router.post(
	'/refreshToken',
	passport.authenticate('jwt-shared', {
		session: false,
		ignoreExpiration: true,
	}),
	RefreshToken
);

// Courses controller
router.use('/courses', CourseController);

export default router;
