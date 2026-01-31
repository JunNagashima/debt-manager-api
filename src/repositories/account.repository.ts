import { prisma } from '../lib/prisma';

export const findAccountByUserId = async (userId: string) => {
  return await prisma.account.findFirst({
    where: { userId }
  });
};

export const findAccountBySupabaseAuthId = async (supabaseAuthId: string) => {
  return await prisma.account.findUnique({
    where: { id: supabaseAuthId },
    select: {
      userId: true,
    }
  });
};
