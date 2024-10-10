import { LinkTracking } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Link RouteTrack Entry
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const data: LinkTracking[] = await prisma.linkTracking.findMany({
      where: {
        link: { id: slug },
        timestamp: {
          gte: threeMonthsAgo,
        },
      },
      orderBy: {
        timestamp: "asc",
      },
      cacheStrategy: { ttl: 60 },
    });

    if (!data) {
      return NextResponse.json(
        { error: "LinkTracking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch LinkTracking" },
      { status: 500 }
    );
  }
}
