import clientPromise from "@/lib/mongodb";
import { Collections, type FAQ } from "@/types/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create FAQ
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("toff");

    const body = await req.json();
    const newFAQ: Omit<FAQ, "_id"> = {
      question: body.question,
      answer: body.answer
    };

    const result = await db.collection(Collections.faq).insertOne(newFAQ);

    return NextResponse.json({
      message: "FAQ created",
      id: result.insertedId,
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
    const client = await clientPromise;
    const db = client.db("toff");

    const body = await req.json();
    const { _id, question, answer } = body;

    const result = await db.collection<FAQ>(Collections.faq).updateOne(
      // @ts-expect-error
      { _id: new ObjectId(_id) }, // Cast _id to ObjectId
      { $set: { question, answer } }
    );

    if (result.matchedCount === 0) {
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
    const client = await clientPromise;
    const db = client.db("toff");

    const { _id } = await req.json();

    const result = await db
      .collection<FAQ>(Collections.faq)
      // @ts-expect-error
      .deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
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
