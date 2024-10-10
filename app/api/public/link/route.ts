import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Link } from "@prisma/client";

export const dynamic = "force-dynamic";

// Get Links
export async function GET() {
  try {
    const data: Link[] = await prisma.link.findMany({
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}