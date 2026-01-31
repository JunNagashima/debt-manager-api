import { Request, Response } from 'express';

export interface CustomRequest extends Request {
  auth?: {
    supabaseUserId: string;
  };
  account?: {
    userId: string;
  };
}
