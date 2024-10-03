import clientPromise from "@/lib/mongodb";
import { Collections, type FAQ } from "@/types/mongodb";
import { NextResponse } from "next/server";

// Get FAQs
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("toff");

    const data: FAQ[] = await db
      .collection<FAQ>(Collections.faq)
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