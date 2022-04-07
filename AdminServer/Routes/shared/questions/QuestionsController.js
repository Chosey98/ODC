import { Router } from 'express';
import create from './create';
import deleteQuestion from './delete';
import update from './update';
import get from './get';
const router = Router();

router.post('/', create);
router.get('/:id', get);
router.patch('/:id', update);
router.delete('/:id', deleteQuestion);
export default router;
