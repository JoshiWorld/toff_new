import clientPromise from "@/lib/mongodb";
import { Collections, type Live } from "@/types/mongodb";
import { NextResponse } from "next/server";

// Get Live
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("toff");

    const data: Live[] = await db
      .collection<Live>(Collections.live)
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