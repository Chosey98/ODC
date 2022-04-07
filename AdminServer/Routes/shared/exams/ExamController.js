import { Router } from 'express';
import create from './create';
import deleteExam from './delete';
import update from './update';
import get from './get';
import getQuestions from './getQuestions';
import getRevisions from './getRevisions';

const router = Router();

router.post('/', create);
router.get('/:id', get);
router.get('/:id/questions', getQuestions);
router.get('/:id/revisions', getRevisions);
router.patch('/:id', update);
router.delete('/:id', deleteExam);
export default router;
