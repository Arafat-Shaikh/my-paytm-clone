"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/db/client";

export async function payViaNumber(amount: string, phone: string) {
  const session = await getServerSession(authOptions);
  const receiverUser = await prisma.user.findFirst({
    where: {
      number: phone,
    },
    select: {
      id: true,
    },
  });

  if (!receiverUser?.id) {
    return { message: "user not found" };
  }

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;

      const fromBalance = await prisma.balance.findFirst({
        where: {
          id: Number(session.user.id),
        },
      });

      console.log("log before checking balance");
      await new Promise((resolve) => setTimeout(resolve, 4000));

      if (!fromBalance?.amount || !(fromBalance?.amount >= Number(amount))) {
        throw new Error("Insufficient balance");
      }
      console.log("after checking the balance");

      await prisma.balance.update({
        where: {
          userId: Number(session?.user?.id),
        },
        data: {
          amount: {
            decrement: Number(amount),
          },
        },
      });
      await prisma.balance.update({
        where: {
          userId: Number(receiverUser?.id),
        },
        data: {
          amount: {
            increment: Number(amount),
          },
        },
      });

      await prisma.p2pTransfer.create({
        data: {
          amount: Number(amount),
          timeStamp: new Date(),
          fromUserId: Number(session.user.id),
          toUserId: Number(receiverUser.id),
        },
      });
    });

    return { success: "Payment completed successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while processing" };
  }
}
