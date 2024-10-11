import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import prisma from "./lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  let pathname = req.nextUrl.pathname;

  if(pathname.startsWith("/api/protected")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);

      const { payload } = await jwtVerify(token, secret);

      req.nextUrl.searchParams.set("username", payload.username as string);

      return NextResponse.next();
    } catch (error) {
      console.error("Invalid token", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
  } else {
    if (
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/admin") &&
      !pathname.startsWith("/login") &&
      !pathname.startsWith("/link") &&
      !/\.\w+$/.test(pathname) && // Überprüft, ob der Pfad auf eine Dateiendung endet
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/musik") &&
      !pathname.startsWith("/#")
    ) {
      if (pathname === "/") pathname = "/startseite";
      const today = new Date();

      const routeEntry = await prisma.routeTracking.findFirst({
        where: {
          route: pathname,
          timestamp: new Date(today.setHours(0, 0, 0, 0)),
        },
        cacheStrategy: { ttl: 60 },
      });

      if (!routeEntry) {
        await prisma.routeTracking.create({
          data: {
            timestamp: new Date(today.setHours(0, 0, 0, 0)),
            route: pathname,
            count: 1,
          },
        });
      } else {
        await prisma.routeTracking.update({
          where: {
            id: routeEntry.id,
          },
          data: {
            count: routeEntry.count + 1,
          },
        });
      }
    }

    // if(pathname.startsWith("/link")) {
    //   console.log(req.geo?.country);
    //   console.log(req.geo?.city);
    // }
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/api/protected/:path*"],
  matcher: ["/:path*"],
};
