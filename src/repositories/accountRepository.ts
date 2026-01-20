import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAccountByUserId = async (userId: string) => {
  return await prisma.account.findFirst({
    where: { userId }
  });
};
