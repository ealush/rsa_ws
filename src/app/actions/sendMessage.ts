"use server";

import { prisma } from "../db/prismaClient";

export async function sendMessage(formData: FormData) {
  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  const message = await prisma.message.create({
    data: {
      content,
      contact: {
        connect: {
          id: parseInt(id),
        },
      },
    },
  });

  return {
    ...message,
    timestamp: message.timestamp.toISOString(),
  };
}
