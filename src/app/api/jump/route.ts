import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { travelerName, mission, birthYear, destinationYear, plutoniumCores } = body;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await prisma.jumpRequest.create({
      data: {
        travelerName: String(travelerName),
        mission: String(mission),
        birthYear: Number(birthYear),
        destinationYear: Number(destinationYear),
        plutoniumCores: Number(plutoniumCores),
      },
    });

    return NextResponse.json(
      { success: true, message: "Coordinates locked." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
