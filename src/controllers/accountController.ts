import { Request, Response } from 'express';
import { findAccountByUserId } from '../repositories/accountRepository';

export const checkUserId = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const accountData = await findAccountByUserId(userId);
  res.json(accountData);
};
