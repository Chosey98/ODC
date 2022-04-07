import create from './create';
import deleteCourse from './delete';
import getAll from './getAll';
import update from './update';
import { Router } from 'express';
import get from './get';
import getExams from './getExams';
import getEnrolls from './getEnrolls';
const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', get);
router.get('/:id/exams', getExams);
router.get('/:id/enrolls', getEnrolls);
router.patch('/:id', update);
router.delete('/:id', deleteCourse);
export default router;
