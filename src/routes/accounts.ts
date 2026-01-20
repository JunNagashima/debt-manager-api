import { Router } from 'express';
import { checkUserId } from '../controllers/accountController';

const router = Router();

router.post('/check-user-id', checkUserId);

export default router;
