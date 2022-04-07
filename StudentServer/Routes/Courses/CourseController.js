import { Router } from 'express';
import getAllCourses from './getAllCourses';
import getCourse from './getCourse';
import enroll from './enroll';

const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', enroll);

export default router;
