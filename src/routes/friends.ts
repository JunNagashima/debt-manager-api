import { Router } from 'express';
import { accountMiddleware } from '../middleware/account.middleware';
import { authenticateUser } from '../middleware/auth.middleware';
import { selectFriends } from '../controllers/friend.controller';

const router = Router();

router.get('/', authenticateUser, accountMiddleware, selectFriends);

export default router;
