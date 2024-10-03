import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const MASTER = process.env.MASTER || "";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Master Password required" },
        { status: 400 }
      );
    }

    const isPasswordValid = password === MASTER;

    // Passwort prüfen
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // JWT erstellen
    const token = jwt.sign(
      { username: "master" },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Token als Antwort zurückgeben
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}