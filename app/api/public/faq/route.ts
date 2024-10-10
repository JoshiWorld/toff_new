import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { FAQ } from "@prisma/client";

export const dynamic = "force-dynamic";

// Get FAQs
export async function GET() {
  try {
    const data: FAQ[] = await prisma.fAQ.findMany({
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