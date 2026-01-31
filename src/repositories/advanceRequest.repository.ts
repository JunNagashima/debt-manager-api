import { prisma } from '../lib/prisma';

interface CreateAdvanceRequestInput {
  requesterId: string;
  payerId: string;
  receiverId: string;
  amount: number;
  occurredDate: Date;
  note?: string;
}

export const createAdvance = async (input: CreateAdvanceRequestInput) => {
  return await prisma.advanceRequest.create({
    data: input,
  });
};
