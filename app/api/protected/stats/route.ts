import clientPromise from "@/lib/mongodb";
import { Collections, type Stats } from "@/types/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create Stats
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("toff");

    const body = await req.json();
    const newStat: Omit<Stats, "_id"> = {
      platform: body.platform,
      stats: body.stats,
      goal: body.goal,
    };

    const result = await db.collection(Collections.stats).insertOne(newStat);

    return NextResponse.json({
      message: "Stat created",
      id: result.insertedId,
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
    const client = await clientPromise;
    const db = client.db("toff");

    const body = await req.json();
    const { _id, platform, stats, goal } = body;

    const result = await db.collection<Stats>(Collections.stats).updateOne(
      // @ts-expect-error
      { _id: new ObjectId(_id) }, // Cast _id to ObjectId
      { $set: { platform, stats, goal } }
    );

    console.log(result);

    if (result.matchedCount === 0) {
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
    const client = await clientPromise;
    const db = client.db("toff");

    const { _id } = await req.json();

    const result = await db
      .collection<Stats>(Collections.stats)
      // @ts-expect-error
      .deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
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
