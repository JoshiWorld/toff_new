import { RouteTracking } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Date RouteTrack Entry
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const today = new Date(slug);

    const data: RouteTracking[] = await prisma.routeTracking.findMany({
      where: {
        timestamp: new Date(today.setHours(0, 0, 0, 0)),
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    if (!data) {
      return NextResponse.json({ error: "RouteTracking not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch RouteTracking" },
      { status: 500 }
    );
  }
}
