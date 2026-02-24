import { NextResponse } from "next/server";
import { prisma } from "@/app/db/prismaClient";

export async function GET() {
  try {
    const jumps = await prisma.jumpRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, jumps }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
