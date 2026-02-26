"use server";

import { setTimeout } from "node:timers/promises";
import { redirect } from "next/navigation";
// import { SuiteSerializer } from "vest/exports/SuiteSerializer";
import { prisma } from "@/app/db/prismaClient";
// import { chronoVestSuite } from "@/app/validation/chronoVestSuite";

export type JumpActionState = {
  success: boolean | null;
  vestState?: unknown;
};

export type JumpData = {
  travelerName: string;
  mission: string;
  birthYear: number;
  destinationYear: number;
  plutoniumCores: number;
  suppressParadoxCheck: boolean;
};

export async function createJumpRequest(
  data: JumpData,
): Promise<void | string> {
  // const result = chronoVestSuite.runStatic(data);

  await setTimeout(1000);

  // if (!result.isValid()) {
  //   return SuiteSerializer.serialize(result);
  // }

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

  redirect("/jumps");
}

export async function initiateJump(data: JumpData): Promise<string | void> {
  return await createJumpRequest(data);
}
