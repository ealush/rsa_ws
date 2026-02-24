import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { travelerName, mission, destinationYear, plutoniumCores } = body;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (Number(destinationYear) === 2020) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            destinationYear: [
              "Jump denied: Severe temporal storm detected in this sector.",
            ],
          },
        },
        { status: 400 },
      );
    }

    await prisma.jumpRequest.create({
      data: {
        travelerName: String(travelerName),
        mission: String(mission),
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
