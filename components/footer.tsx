import Link from "next/link";
import React from "react";
import { Logo } from "@/components/logo";

export const Footer = () => {
  const links = [
    {
      name: "Musik",
      href: "#musik",
    },
    {
      name: "Live",
      href: "#live",
    },
    {
      name: "Stats",
      href: "#stats",
    },
  ];
  const legal = [
    {
      name: "Impressum",
      href: "/impressum",
    }
  ];
  const socials = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/toff.musik/",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@toff.musik",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@toff.musik.",
    },
  ];
  return (
    <div className="relative">
      <div className="border-t border-neutral-900 px-8 pt-20 pb-32 relative bg-primary">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500 dark:text-neutral-400 flex sm:flex-row flex-col justify-between items-start ">
          <div>
            <div className="mr-4  md:flex mb-4">
              <Logo />
            </div>
            <div>Copyright &copy; 2024 brokoly</div>
            <div className="mt-2">All rights reserved</div>
          </div>
          <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {socials.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
