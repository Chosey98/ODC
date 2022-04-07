import { Router } from 'express';
import get from './get';
import changeEnrollmentStatus from './changeEnrollmentStatus';
import passport from 'passport';
import sendCode from './sendCode';

const router = Router();
router.get('/:id', get);
router.post('/:id', changeEnrollmentStatus);
router.post(
	'/:id/sendcode',
	passport.authenticate('jwt-admin', { session: false }),
	sendCode
);
export default router;
