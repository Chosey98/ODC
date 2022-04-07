import { Router } from 'express';
import deleteCat from './delete';
import get from './get';
import getAll from './getAll';
import create from './create';
import update from './update';
const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', get);
router.patch('/:id', update);
router.delete('/:id', deleteCat);
export default router;
