import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Create FAQ
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer
      }
    });

    return NextResponse.json({
      message: "FAQ created",
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

// Update FAQ
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, question, answer } = body;

    const result = await prisma.fAQ.update({
      where: { id: _id },
      data: {
        question, answer
      }
    });

    if (!result) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// Delete FAQ
export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();
    
    const result = await prisma.fAQ.delete({
      where: { id: _id }
    });

    if (!result) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
