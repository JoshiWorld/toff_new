import { Merch } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Merch Entry
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const data: Merch | null = await prisma.merch.findFirst({
      where: {
        id: slug,
      },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Merch not found" },
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
      { error: "Failed to fetch merch blog" },
      { status: 500 }
    );
  }
}
