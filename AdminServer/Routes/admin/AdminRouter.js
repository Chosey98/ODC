import { Router } from 'express';
import RolesController from './roles/RolesController';
import SubAdminsController from './subadmins/SubAdminsController';
import passport from 'passport';

const router = Router();
router.use(passport.authenticate('jwt-admin', { session: false }));

router.use('/roles', RolesController);
router.use('/subadmins', SubAdminsController);

export default router;
