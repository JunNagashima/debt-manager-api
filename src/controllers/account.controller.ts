import { Response } from 'express';
import { CustomRequest } from '../types/express';
import { findAccountByUserId } from '../repositories/account.repository';

export const checkUserId = async (req: CustomRequest, res: Response) => {
  const { userId } = req.body;

  const accountData = await findAccountByUserId(userId);
  res.json(accountData);
};
