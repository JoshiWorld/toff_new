import { Live } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Live
export async function GET() {
  try {
    const data: Live[] = await prisma.live.findMany({
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lives" },
      { status: 500 }
    );
  }
}