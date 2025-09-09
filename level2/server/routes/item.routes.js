import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { listItems, createItem, updateItem, deleteItem } from '../controllers/itemController.js';


const router = Router();


router.get('/', requireAuth, listItems);
router.post('/', requireAuth, createItem);
router.put('/:id', requireAuth, updateItem);
router.delete('/:id', requireAuth, deleteItem);

export default router;