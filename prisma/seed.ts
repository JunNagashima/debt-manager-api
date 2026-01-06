import {
  PrismaClient,
  AdvanceType,
  RepaymentSource,
  RequestStatus,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // =====================
  // cleanup
  // =====================
  await prisma.userPairBalance.deleteMany()
  await prisma.repaymentCancelRequest.deleteMany()
  await prisma.offsetRequest.deleteMany()
  await prisma.advanceRequest.deleteMany()
  await prisma.repayment.deleteMany()
  await prisma.advance.deleteMany()
  await prisma.friend.deleteMany()
  await prisma.friendRequest.deleteMany()
  await prisma.account.deleteMany()

  // =====================
  // accounts（3）
  // =====================
  await prisma.account.createMany({
    data: [
      {
        userId: 'user_a',
        name: '山田 太郎',
        saasUserId: 'saas_yamada',
      },
      {
        userId: 'user_b',
        name: '佐藤 花子',
        saasUserId: 'saas_sato',
      },
      {
        userId: 'user_c',
        name: '鈴木 次郎',
        saasUserId: 'saas_suzuki',
      },
    ],
  })

  // =====================
  // friend_requests
  // =====================
  await prisma.friendRequest.createMany({
    data: [
      { requesterUserId: 'user_a', targetUserId: 'user_b' },
      { requesterUserId: 'user_b', targetUserId: 'user_a' }, // 行き違い
      { requesterUserId: 'user_b', targetUserId: 'user_c' },
      { requesterUserId: 'user_c', targetUserId: 'user_b' },
    ],
  })

  // =====================
  // friends
  // =====================
  await prisma.friend.createMany({
    data: [
      { userLow: 'user_a', userHigh: 'user_b' },
      { userLow: 'user_b', userHigh: 'user_c' },
    ],
  })

  // =====================
  // advances（立替）
  // =====================
  const advances = await prisma.advance.createMany({
    data: [
      // A → B
      {
        payerId: 'user_a',
        receiverId: 'user_b',
        amount: 1200,
        occurredDate: new Date('2024-01-05'),
        type: AdvanceType.NORMAL,
        note: 'コンビニ',
        createdBy: 'user_a',
        updatedBy: 'user_a',
      },
      {
        payerId: 'user_a',
        receiverId: 'user_b',
        amount: 4800,
        occurredDate: new Date('2024-01-10'),
        type: AdvanceType.NORMAL,
        note: '飲み会',
        createdBy: 'user_a',
        updatedBy: 'user_a',
      },

      // B → A
      {
        payerId: 'user_b',
        receiverId: 'user_a',
        amount: 3000,
        occurredDate: new Date('2024-01-15'),
        type: AdvanceType.ADJUSTMENT,
        note: '旅行精算',
        createdBy: 'user_b',
        updatedBy: 'user_b',
      },

      // B → C
      {
        payerId: 'user_b',
        receiverId: 'user_c',
        amount: 2200,
        occurredDate: new Date('2024-01-08'),
        type: AdvanceType.NORMAL,
        note: 'ランチ',
        createdBy: 'user_b',
        updatedBy: 'user_b',
      },
      {
        payerId: 'user_b',
        receiverId: 'user_c',
        amount: 7800,
        occurredDate: new Date('2024-01-20'),
        type: AdvanceType.NORMAL,
        note: 'ライブチケット',
        createdBy: 'user_b',
        updatedBy: 'user_b',
      },

      // A → C（少なめ）
      {
        payerId: 'user_a',
        receiverId: 'user_c',
        amount: 1500,
        occurredDate: new Date('2024-01-25'),
        type: AdvanceType.NORMAL,
        note: 'タクシー',
        createdBy: 'user_a',
        updatedBy: 'user_a',
      },
    ],
  })

  // =====================
  // repayments（返済）
  // =====================
  const repayment1 = await prisma.repayment.create({
    data: {
      payerId: 'user_b',
      receiverId: 'user_a',
      amount: 3000,
      occurredDate: new Date('2024-01-18'),
      note: '飲み会分まとめて',
      source: RepaymentSource.MANUAL,
      createdBy: 'user_b',
      updatedBy: 'user_b',
    },
  })

  const repayment2 = await prisma.repayment.create({
    data: {
      payerId: 'user_c',
      receiverId: 'user_b',
      amount: 2000,
      occurredDate: new Date('2024-01-22'),
      note: '一部返済',
      source: RepaymentSource.MANUAL,
      createdBy: 'user_c',
      updatedBy: 'user_c',
    },
  })

  await prisma.repayment.createMany({
    data: [
      {
        payerId: 'user_b',
        receiverId: 'user_a',
        amount: 1000,
        occurredDate: new Date('2024-01-28'),
        note: '端数',
        source: RepaymentSource.OFFSET,
        createdBy: 'user_b',
        updatedBy: 'user_b',
      },
      {
        payerId: 'user_c',
        receiverId: 'user_b',
        amount: 3000,
        occurredDate: new Date('2024-01-30'),
        note: 'チケット精算',
        source: RepaymentSource.MANUAL,
        createdBy: 'user_c',
        updatedBy: 'user_c',
      },
    ],
  })

  // =====================
  // advance_requests（全ステータス複数）
  // =====================
  await prisma.advanceRequest.createMany({
    data: [
      {
        requesterId: 'user_a',
        payerId: 'user_a',
        receiverId: 'user_b',
        amount: 5000,
        occurredDate: new Date('2024-02-01'),
        status: RequestStatus.PENDING,
      },
      {
        requesterId: 'user_b',
        payerId: 'user_b',
        receiverId: 'user_a',
        amount: 2000,
        occurredDate: new Date('2024-02-02'),
        status: RequestStatus.APPROVED,
        resolvedAt: new Date('2024-02-03'),
      },
      {
        requesterId: 'user_c',
        payerId: 'user_c',
        receiverId: 'user_b',
        amount: 1200,
        occurredDate: new Date('2024-02-03'),
        status: RequestStatus.REJECTED,
        resolvedAt: new Date('2024-02-04'),
      },
      {
        requesterId: 'user_a',
        payerId: 'user_a',
        receiverId: 'user_c',
        amount: 800,
        occurredDate: new Date('2024-02-04'),
        status: RequestStatus.CANCELED,
        resolvedAt: new Date('2024-02-05'),
      },
      {
        requesterId: 'user_b',
        payerId: 'user_b',
        receiverId: 'user_c',
        amount: 3500,
        occurredDate: new Date('2024-02-06'),
        status: RequestStatus.APPROVED,
        resolvedAt: new Date('2024-02-07'),
      },
      {
        requesterId: 'user_c',
        payerId: 'user_c',
        receiverId: 'user_a',
        amount: 1800,
        occurredDate: new Date('2024-02-07'),
        status: RequestStatus.PENDING,
      },
    ],
  })

  // =====================
  // offset_requests
  // =====================
  await prisma.offsetRequest.createMany({
    data: [
      {
        requesterId: 'user_a',
        counterpartyUserId: 'user_b',
        status: RequestStatus.PENDING,
      },
      {
        requesterId: 'user_b',
        counterpartyUserId: 'user_c',
        status: RequestStatus.APPROVED,
        resolvedAt: new Date('2024-02-10'),
      },
      {
        requesterId: 'user_c',
        counterpartyUserId: 'user_b',
        status: RequestStatus.REJECTED,
        resolvedAt: new Date('2024-02-11'),
      },
    ],
  })

  // =====================
  // repayment_cancel_requests
  // =====================
  await prisma.repaymentCancelRequest.createMany({
    data: [
      {
        repaymentId: repayment1.id,
        requesterId: 'user_b',
        reason: '金額ミス',
        status: RequestStatus.PENDING,
      },
      {
        repaymentId: repayment2.id,
        requesterId: 'user_c',
        reason: '二重支払い',
        status: RequestStatus.APPROVED,
        resolvedAt: new Date('2024-02-12'),
      },
    ],
  })

  // =====================
  // user_pair_balances
  // =====================
  await prisma.userPairBalance.createMany({
    data: [
      {
        userLow: 'user_a',
        userHigh: 'user_b',
        netLowToHigh: BigInt(2000),
        netHighToLow: BigInt(0),
      },
      {
        userLow: 'user_b',
        userHigh: 'user_c',
        netLowToHigh: BigInt(3000),
        netHighToLow: BigInt(0),
      },
      {
        userLow: 'user_a',
        userHigh: 'user_c',
        netLowToHigh: BigInt(1500),
        netHighToLow: BigInt(0),
      },
    ],
  })
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
