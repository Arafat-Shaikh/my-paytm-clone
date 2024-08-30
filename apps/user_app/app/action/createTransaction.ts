"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/db/client";

export async function createTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const token = (Math.random() * 10000000).toString();

  if (!session.user) {
    return { message: "you are not logged" };
  }

  await prisma.onRampTransaction.create({
    data: {
      amount,
      provider,
      token,
      startTime: new Date(),
      userId: Number(session.user.id),
      status: "Processing",
    },
  });

  return { success: "Transaction Successfully created" };
}
