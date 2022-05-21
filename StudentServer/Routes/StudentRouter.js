import { Router } from 'express';
import passport from 'passport';
import unless from '../util/unless';
import Register from './auth/Register';
import Login from './auth/Login';
import RefreshToken from './auth/RefreshToken';
import CourseController from './Courses/CourseController';
import getProfile from './getProfile';
import updateProfile from './updateProfile';
import Logout from './auth/Logout';
import forgetPassword from './auth/forgetPassword';
import verifyOtp from './auth/verifyOtp';
import resetPassword from './auth/ResetPassword';
import getAllCat from './Categories/getAllCat';
import getCatById from './Categories/getCatById';
import getCoursesByCat from './Categories/getCoursesByCat';
import getPrivacyPolicy from './misc/getPrivacyPolicy';
const router = Router();

router.use(
	unless(passport.authenticate('jwt', { session: false }), [
		'/login',
		'/register',
		'/refreshToken',
		'/forgetPassword',
		'/verifyOtp',
		'/resetPassword',
		'/privacy-policy',
	])
);

router.get('/privacy-policy', getPrivacyPolicy);
router.post('/login', Login);
router.post('/register', Register);
router.post(
	'/refreshToken',
	passport.authenticate('jwt-shared', {
		session: false,
		ignoreExpiration: true,
	}),
	RefreshToken
);
router.get('/me', getProfile);
router.patch('/me', updateProfile);
router.post('/forgetPassword', forgetPassword);
router.post('/verifyOtp', verifyOtp);
router.post('/resetPassword', resetPassword);
router.post('/logout', Logout);

// Courses controller
router.use('/courses', CourseController);
router.get('/categories', getAllCat);
router.get('/categories/:id', getCatById);
router.get('/categories/:id/courses', getCoursesByCat);
export default router;
