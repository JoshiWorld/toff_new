import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import type { Viewport } from "next";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "TOFF OFFICIAL",
  description: "Landsbergs bekanntester Rapper",
  openGraph: {
    images: [
      "https://i.scdn.co/image/ab6761610000e5ebf8e4aca307e11e6916e26fbe",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            "bg-charcoal antialiased h-full w-full"
          )}
        >
          <NavBar />
          {children}
          <Footer />
        </body>
        <Toaster />
      </html>
    </ViewTransitions>
  );
}
