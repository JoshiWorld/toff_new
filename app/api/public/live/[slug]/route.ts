import { Live } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Live Entry
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const data: Live | null = await prisma.live.findFirst({
      where: {
        id: slug,
      },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Live not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch live blog" },
      { status: 500 }
    );
  }
}
