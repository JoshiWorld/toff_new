import clientPromise from "@/lib/mongodb";
import { Collections, type Stats } from "@/types/mongodb";
import { NextResponse } from "next/server";

// Get Stats
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("toff");

    const data: Stats[] = await db
      .collection<Stats>(Collections.stats)
      .find({})
      .toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}