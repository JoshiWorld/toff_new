import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Create Merch
export async function POST(req: Request) {
  try {
    const { title, description, date, link, frontImage, backImage } = await req.json();

    const result = await prisma.merch.create({
      data: {
        title: title as string,
        description: description as string,
        date: new Date(date as string),
        link: link as string,
        frontImage: frontImage,
        backImage: backImage,
      },
    });

    return NextResponse.json({
      message: "Merch created",
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create Merch" },
      { status: 500 }
    );
  }
}

// Update Merch
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, title, description, date, link, frontImage, backImage } = body;

    const result = await prisma.merch.update({
      where: { id: _id },
      data: {
        title,
        description,
        date,
        link,
        frontImage,
        backImage,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Merch not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Merch updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update Merch" },
      { status: 500 }
    );
  }
}

// Delete Merch
export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();

    const result = await prisma.merch.delete({
      where: { id: _id },
    });

    if (!result) {
      return NextResponse.json({ error: "Merch not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Merch deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete Merch" },
      { status: 500 }
    );
  }
}