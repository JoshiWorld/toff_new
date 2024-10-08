import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Create Live
export async function POST(req: Request) {
  try {
    const { title, description, date, link, image } = await req.json();

    // Save the data to the database
    const result = await prisma.live.create({
      data: {
        title: title as string,
        description: description as string,
        date: new Date(date as string),
        link: link as string,
        image: image,
      },
    });

    return NextResponse.json({
      message: "Live created",
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create Live" },
      { status: 500 }
    );
  }
}

// Update Live
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, title, description, date, link, image } = body;

    const result = await prisma.live.update({
      where: { id: _id },
      data: {
        title,
        description,
        date,
        link,
        image,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Live not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Live updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update Live" },
      { status: 500 }
    );
  }
}

// Delete Live
export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();

    const result = await prisma.live.delete({
      where: { id: _id },
    });

    if (!result) {
      return NextResponse.json({ error: "Live not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Live deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete Live" },
      { status: 500 }
    );
  }
}