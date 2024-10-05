import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Stats } from "@prisma/client";

export const dynamic = "force-dynamic";

// Get Stats
export async function GET() {
  try {
    const data: Stats[] = await prisma.stats.findMany();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}