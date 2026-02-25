"use server";

import { setTimeout } from "node:timers/promises";
import { prisma } from "@/app/db/prismaClient";

export type JumpActionState = {
  success: boolean | null;
};

export async function initiateJump(
  _prevState: JumpActionState,
  data: {
    travelerName: string;
    mission: string;
    birthYear: number;
    destinationYear: number;
    plutoniumCores: number;
    suppressParadoxCheck: boolean;
  },
): Promise<JumpActionState> {
  try {
    await setTimeout(1000);

    await prisma.jumpRequest.create({
      data: {
        travelerName: String(data.travelerName),
        mission: String(data.mission),
        birthYear: Number(data.birthYear),
        destinationYear: Number(data.destinationYear),
        plutoniumCores: Number(data.plutoniumCores),
        suppressParadoxCheck: Boolean(data.suppressParadoxCheck),
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}
