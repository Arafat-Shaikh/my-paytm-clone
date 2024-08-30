/*
  Warnings:

  - You are about to drop the `p2pTransfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_toUserId_fkey";

-- DropTable
DROP TABLE "p2pTransfer";

-- CreateTable
CREATE TABLE "P2pTransfer" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,

    CONSTRAINT "P2pTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2pTransfer" ADD CONSTRAINT "P2pTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2pTransfer" ADD CONSTRAINT "P2pTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
