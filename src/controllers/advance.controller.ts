import { Response } from 'express';
import { CustomRequest } from '../types/express';
import { createAdvanceRequestSchema } from '../schemas/advanceRequest.schema';
import { createAdvance } from '../repositories/advanceRequest.repository';

export const createAdvanceRequest = async (req: CustomRequest, res: Response) => {
  const result = createAdvanceRequestSchema.safeParse(req.body);
  console.log('Create Advance Request Body:', req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  if (!req.account?.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const input = {
    requesterId: req.account.userId,
    payerId: req.account.userId,
    receiverId: result.data.friendId,
    amount: result.data.amount,
    occurredDate: new Date(result.data.date),
    note: result.data.note,
  }

  await createAdvance(input);
  res.status(201).json({});
};
