import { Router } from 'express';
import getExam from './getExam';
import submitExam from './submitExam';
const router = Router();

router.get('/:id', getExam);
router.post('/:id/submit', submitExam);

export default router;
