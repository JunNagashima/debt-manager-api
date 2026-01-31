import { Response } from 'express';
import { CustomRequest } from '../types/express';
import { findAccountByUserId } from '../repositories/account.repository';

export const checkUserId = async (req: CustomRequest, res: Response) => {
  const { userId } = req.body;

  const accountData = await findAccountByUserId(userId);
  res.json(accountData);
};

export const findUserId = async (req: CustomRequest, res: Response) => {
  if (!req.account?.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.json(req.account.userId);
};
