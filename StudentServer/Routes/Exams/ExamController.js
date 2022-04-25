import { Router } from 'express';
import getExam from './getExam';
const router = Router();
router.get('/:id', getExam);
router.post('/:id/submit', submitExam);
export default router;
