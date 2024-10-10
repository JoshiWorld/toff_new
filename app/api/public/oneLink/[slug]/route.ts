import { Link } from "@prisma/client";
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

    const data: Link | null = await prisma.link.findFirst({
      where: {
        id: slug,
      },
      cacheStrategy: { ttl: 60 },
    });

    if (!data) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch link blog" },
      { status: 500 }
    );
  }
}
