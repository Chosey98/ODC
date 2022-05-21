import { Router } from 'express';
import getAllCourses from './getAllCourses';
import getCourse from './getCourse';
import enroll from './enroll';
import getExams from './getExams';
import submitExam from '../Exams/submitExam';
import checkStatus from './checkStatus';
const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.get('/:id/exams', getExams);
router.post('/:id/enroll', enroll);
router.get('/:id/checkStatus', checkStatus);
router.post('/submitExam', submitExam);

export default router;
