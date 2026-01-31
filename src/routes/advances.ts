import { Router } from 'express';
import { accountMiddleware } from '../middleware/account.middleware';
import { authenticateUser } from '../middleware/auth.middleware';
import { createAdvanceRequest } from '../controllers/advance.controller';

const router = Router();

router.post('/', authenticateUser, accountMiddleware, createAdvanceRequest);

export default router;
