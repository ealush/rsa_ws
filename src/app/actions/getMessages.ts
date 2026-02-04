"use server";

import { prisma } from "../db/prismaClient";

export async function getMessages(contactId: number) {
  const messages = await prisma.message.findMany({
    where: {
      contactId,
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 5,
  });

  return messages.map((msg) => ({
    ...msg,
    timestamp: msg.timestamp.toISOString(),
  }));
}
