import { Live } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get Live
export async function GET() {
  try {
    const data: Live[] = await prisma.live.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lives" },
      { status: 500 }
    );
  }
}