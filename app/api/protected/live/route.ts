import clientPromise from "@/lib/mongodb";
import { Collections, type Live } from "@/types/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create Live
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("toff");

    const body = await req.json();
    const newLive: Omit<Live, "_id"> = {
      title: body.title,
      description: body.description,
      date: body.date,
      link: body.link
    };

    const result = await db.collection(Collections.live).insertOne(newLive);

    return NextResponse.json({
      message: "Live created",
      id: result.insertedId,
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
    const client = await clientPromise;
    const db = client.db("toff");

    const body = await req.json();
    const { _id, title, description, date, link } = body;

    const result = await db.collection<Live>(Collections.live).updateOne(
      // @ts-expect-error
      { _id: new ObjectId(_id) }, // Cast _id to ObjectId
      { $set: { title, description, date, link } }
    );

    if (result.matchedCount === 0) {
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
    const client = await clientPromise;
    const db = client.db("toff");

    const { _id } = await req.json();

    const result = await db
      .collection<Live>(Collections.live)
      // @ts-expect-error
      .deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
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
