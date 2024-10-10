import { Link } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Get Link Entry
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const today = new Date();

    const data: Link | null = await prisma.link.findFirst({
      where: {
        route: slug,
      },
      cacheStrategy: { ttl: 60 },
    });

    if (!data) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const country = req.headers.get("X-User-Country");
    const city = req.headers.get("X-User-City");
    const device = req.headers.get("X-User-Device");

    const trackingToday = await prisma.linkTracking.findFirst({
      where: {
        timestamp: new Date(today.setHours(0, 0, 0, 0)),
        link: { id: data.id },
      },
    });

    if (trackingToday) {
      await prisma.linkTracking.update({
        where: {
          id: trackingToday.id,
        },
        data: {
          link: { connect: { id: data.id } },
          timestamp: new Date(today.setHours(0, 0, 0, 0)),
          linkType: device!,
          country: country!,
          city: city!,
          count: trackingToday.count + 1,
        },
      });
    } else {
      await prisma.linkTracking.create({
        data: {
          link: { connect: { id: data.id } },
          timestamp: new Date(today.setHours(0, 0, 0, 0)),
          linkType: device!,
          country: country!,
          city: city!,
          count: 1,
        },
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch link slug" },
      { status: 500 }
    );
  }
}
