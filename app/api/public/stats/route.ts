import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Stats } from "@prisma/client";

// Get Stats
export async function GET() {
  try {
    const data: Stats[] = await prisma.stats.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}