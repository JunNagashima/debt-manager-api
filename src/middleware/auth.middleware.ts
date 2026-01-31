import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/express';
import { createSupabaseClient } from '../utils/supabase';

export const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'authenticateUser - Unauthorized' })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createSupabaseClient(token)

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.auth = {
      supabaseUserId: data.user.id,
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
