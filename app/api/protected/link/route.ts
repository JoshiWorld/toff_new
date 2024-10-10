import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Create Link
export async function POST(req: Request) {
  try {
    const { title, route, link } = await req.json();

    const result = await prisma.link.create({
      data: {
        title: title as string,
        route: route as string,
        link: link as string,
      },
    });

    return NextResponse.json({
      message: "Link created",
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create Link" },
      { status: 500 }
    );
  }
}

// Update Link
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, route, active, link } = body;

    const result = await prisma.link.update({
      where: { id },
      data: {
        title,
        route,
        active,
        link
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Link updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update Link" },
      { status: 500 }
    );
  }
}

// Delete Link
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const result = await prisma.link.delete({
      where: { id },
    });

    if (!result) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Link deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete Link" },
      { status: 500 }
    );
  }
}