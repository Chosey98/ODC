import { Router } from 'express';
import getStudent from './get';
import getAll from './getAll';
const router = Router();

router.get('/', getAll);
router.get('/:id', getStudent);

export default router;
