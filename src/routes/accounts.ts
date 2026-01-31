import { Router } from 'express';
import { checkUserId } from '../controllers/account.controller';

const router = Router();

router.post('/check-user-id', checkUserId);

export default router;
