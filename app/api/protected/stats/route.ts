import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create Stats
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await prisma.stats.create({
      data: {
        platform: body.platform,
        stats: body.stats,
        goal: body.goal,
      },
    });

    return NextResponse.json({
      message: "Stat created",
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create stat" },
      { status: 500 }
    );
  }
}

// Update Stats
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, platform, stats, goal } = body;

    const result = await prisma.stats.update({
      where: { id: _id },
      data: {
        platform,
        stats,
        goal,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Stat not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Stat updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update stat" },
      { status: 500 }
    );
  }
}

// Delete Stats
export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();

    const result = await prisma.stats.delete({
      where: { id: _id },
    });

    if (!result) {
      return NextResponse.json({ error: "Stat not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Stat deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete stat" },
      { status: 500 }
    );
  }
}
