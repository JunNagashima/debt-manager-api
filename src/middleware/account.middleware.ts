import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/express';
import { findAccountBySupabaseAuthId } from '../repositories/account.repository'

export const accountMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth?.supabaseUserId) {
    return res.status(401).json({ message: 'accountMiddleware - Unauthorized' })
  }

  const account = await findAccountBySupabaseAuthId(req.auth.supabaseUserId)

  if (!account) {
    return res.status(403).json({ message: 'Account not found' })
  }

  req.account = {
    userId: account.userId,
  }

  next()
}
