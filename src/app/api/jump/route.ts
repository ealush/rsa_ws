import { NextResponse } from "next/server";
import { createJumpRequest } from "@/app/actions/jumpAction";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = await createJumpRequest(body);

    return NextResponse.json(
      { success: true, payload: payload },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, payload: "Internal Server Error" },
      { status: 500 },
    );
  }
}
