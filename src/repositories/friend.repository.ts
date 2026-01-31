import { prisma } from '../lib/prisma';

interface selectFriendsInput {
  userId: string;
}

export const selectFriends = async (input: selectFriendsInput) => {
  return await prisma.friend.findMany({
    where: {
      OR: [
        { userLow: input.userId },
        { userHigh: input.userId },
      ],
    },
    include: {
      userLowAccount: true,
      userHighAccount: true,
    },
  });
};
