import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Merch } from "@prisma/client";

export const dynamic = "force-dynamic";

// Get Merch
export async function GET() {
  try {
    const data: Merch[] = await prisma.merch.findMany({
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch faqs" },
      { status: 500 }
    );
  }
}