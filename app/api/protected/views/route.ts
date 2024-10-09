import { RouteTracking } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Date RouteTrack Entry
export async function GET() {
  try {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const data: RouteTracking[] = await prisma.routeTracking.findMany({
      where: {
        timestamp: {
          gte: threeMonthsAgo,
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    if (!data) {
      return NextResponse.json(
        { error: "RouteTracking not found" },
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
      { error: "Failed to fetch RouteTracking" },
      { status: 500 }
    );
  }
}
