-- CreateEnum
CREATE TYPE "AdvanceType" AS ENUM ('NORMAL', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "RepaymentSource" AS ENUM ('MANUAL', 'OFFSET');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "userId" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "saasUserId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friend_requests" (
    "id" UUID NOT NULL,
    "requesterUserId" VARCHAR(50) NOT NULL,
    "targetUserId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "userLow" VARCHAR(50) NOT NULL,
    "userHigh" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("userLow","userHigh")
);

-- CreateTable
CREATE TABLE "advances" (
    "id" UUID NOT NULL,
    "payerId" VARCHAR(50) NOT NULL,
    "receiverId" VARCHAR(50) NOT NULL,
    "amount" INTEGER NOT NULL,
    "occurredDate" DATE NOT NULL,
    "type" "AdvanceType" NOT NULL,
    "note" TEXT,
    "createdBy" VARCHAR(50) NOT NULL,
    "updatedBy" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repayments" (
    "id" UUID NOT NULL,
    "payerId" VARCHAR(50) NOT NULL,
    "receiverId" VARCHAR(50) NOT NULL,
    "amount" INTEGER NOT NULL,
    "occurredDate" DATE NOT NULL,
    "note" TEXT,
    "source" "RepaymentSource" NOT NULL,
    "createdBy" VARCHAR(50) NOT NULL,
    "updatedBy" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advance_requests" (
    "id" UUID NOT NULL,
    "requesterId" VARCHAR(50) NOT NULL,
    "payerId" VARCHAR(50) NOT NULL,
    "receiverId" VARCHAR(50) NOT NULL,
    "amount" INTEGER NOT NULL,
    "occurredDate" DATE NOT NULL,
    "note" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advance_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offset_requests" (
    "id" UUID NOT NULL,
    "requesterId" VARCHAR(50) NOT NULL,
    "counterpartyUserId" VARCHAR(50) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offset_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repayment_cancel_requests" (
    "id" UUID NOT NULL,
    "repaymentId" UUID NOT NULL,
    "requesterId" VARCHAR(50) NOT NULL,
    "reason" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repayment_cancel_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pair_balances" (
    "userLow" VARCHAR(50) NOT NULL,
    "userHigh" VARCHAR(50) NOT NULL,
    "netLowToHigh" BIGINT NOT NULL DEFAULT 0,
    "netHighToLow" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pair_balances_pkey" PRIMARY KEY ("userLow","userHigh")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_key" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_saasUserId_key" ON "accounts"("saasUserId");

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_requesterUserId_fkey" FOREIGN KEY ("requesterUserId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userLow_fkey" FOREIGN KEY ("userLow") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userHigh_fkey" FOREIGN KEY ("userHigh") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advances" ADD CONSTRAINT "advances_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advances" ADD CONSTRAINT "advances_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repayments" ADD CONSTRAINT "repayments_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repayments" ADD CONSTRAINT "repayments_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advance_requests" ADD CONSTRAINT "advance_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advance_requests" ADD CONSTRAINT "advance_requests_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advance_requests" ADD CONSTRAINT "advance_requests_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_requests" ADD CONSTRAINT "offset_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_requests" ADD CONSTRAINT "offset_requests_counterpartyUserId_fkey" FOREIGN KEY ("counterpartyUserId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repayment_cancel_requests" ADD CONSTRAINT "repayment_cancel_requests_repaymentId_fkey" FOREIGN KEY ("repaymentId") REFERENCES "repayments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repayment_cancel_requests" ADD CONSTRAINT "repayment_cancel_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pair_balances" ADD CONSTRAINT "user_pair_balances_userLow_fkey" FOREIGN KEY ("userLow") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pair_balances" ADD CONSTRAINT "user_pair_balances_userHigh_fkey" FOREIGN KEY ("userHigh") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
