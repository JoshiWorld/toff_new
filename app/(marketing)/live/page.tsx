import { type Metadata } from "next";
import { getAllBlogs } from "@/lib/blog";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { BlogCard } from "@/components/blog-card";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { IconClipboardText } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
// import { truncate } from "@/lib/utils";
import { format } from "date-fns";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "TOFF Live",
  description:
    "Aktuelle Live Einträge über TOFF",
  openGraph: {
    images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
  },
};

export default async function ArticlesIndex() {
  const items = await prisma.live.findMany();

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconClipboardText className="h-6 w-6 text-purple-500" />
          </FeatureIconContainer>
          <Heading as="h1" className="mt-4">
            Live
          </Heading>
          <Subheading className="text-center">
            Du willst Toff Live sehen? Hier gibts schonmal einen kleinen Vorgeschmack!
          </Subheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {items.slice(0, 3).map((live, index) => (
            <BlogCard blog={live} key={live.id + index} />
          ))}
        </div>

        <div className="w-full py-20">
          <p className="text-2xl font-bold text-white mb-10">Mehr Live-Beiträge</p>

          <div className="divide-y divide-neutral-800">
            {items.slice(3, 6).map((live, index) => (
              <Link
                href={`/live/${live.id}`}
                key={live.id + index}
                className="flex md:flex-row flex-col items-start justify-between md:items-center group py-4"
              >
                <div>
                  <p className="text-neutral-300 text-lg font-medium group-hover:text-white transition duration-200">
                    {live.title}
                  </p>
                  <p className="text-neutral-300 text-sm mt-2 max-w-xl group-hover:text-white transition duration-200">
                    {/* {truncate(blog.description, 80)} */}
                  </p>

                  <p className="text-neutral-300 text-sm mt-2 max-w-xl group-hover:text-white transition duration-200">
                    {format(new Date(live.date), "MMMM dd, yyyy")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
