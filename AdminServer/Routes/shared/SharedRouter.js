import { Router } from 'express';
import Login from './Login';
import passport from 'passport';
import unless from '../../util/unless';
import CourseController from './courses/CourseController';
import ExamController from './exams/ExamController';
import StudentsController from './students/StudentsController';
import RevisionsController from './revisions/RevisionsController';
import QuestionsController from './questions/QuestionsController';
import RefreshToken from './RefreshToken';
import EnrollmentController from './enrolls/EnrollmentController';
import CategoriesController from './categories/CategoriesController';
import Logout from './Logout';
const router = Router();

router.use(
	unless(passport.authenticate('jwt-shared', { session: false }), [
		'/login',
		'/refreshToken',
		['/enrolls/:id/sendCode'],
	])
);
router.post('/login', Login);
router.post('/logout', Logout);
router.post(
	'/refreshToken',
	passport.authenticate('jwt-shared', {
		session: false,
		ignoreExpiration: true,
	}),
	RefreshToken
);
// Course CRUD
router.use('/courses', CourseController);

// Exam CRUD
router.use('/exams', ExamController);

// Student Controller
router.use('/students', StudentsController);

// Revisions Controller
router.use('/revisions', RevisionsController);

// Question CRUD
router.use('/questions', QuestionsController);

// Enrolls Controller
router.use('/enrolls', EnrollmentController);

router.use('/categories', CategoriesController);
export default router;
