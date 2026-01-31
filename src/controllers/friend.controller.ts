import { Response } from 'express';
import { CustomRequest } from '../types/express';
import { selectFriends as selectFriendsRepo } from '../repositories/friend.repository';

export const selectFriends = async (req: CustomRequest, res: Response) => {
  if (!req.account?.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const Response = await selectFriendsRepo({ userId: req.account.userId });
  res.status(200).json(Response);
};
