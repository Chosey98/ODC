import { Router } from 'express';
import getAll from './getAll';
import get from './get';
import update from './update';
import deleteRole from './delete';
import create from './add';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', get);
router.patch('/:id', update);
router.delete('/:id', deleteRole);

export default router;
