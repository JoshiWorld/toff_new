import { type Metadata } from "next";
import { getAllBlogs } from "@/lib/blog";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { BlogCard } from "@/components/blog-card";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { IconClipboardText, IconShirt } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
// import { truncate } from "@/lib/utils";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import { MerchCard } from "@/components/merch-card";

export const metadata: Metadata = {
  title: "TOFF Merch",
  description: "Aktuelle Merch Einträge von TOFF",
  openGraph: {
    images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
  },
};

export default async function MerchPage() {
  const items = await prisma.merch.findMany();

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconShirt className="h-6 w-6 text-purple-500" />
          </FeatureIconContainer>
          <Heading as="h1" className="mt-4">
            Merch
          </Heading>
          <Subheading className="text-center">
            Anfragen aktuell nur über Instagram-DM!
          </Subheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {items.slice(0, 3).map((merch, index) => (
            <MerchCard merch={merch} key={merch.id + index} />
          ))}
        </div>
      </Container>
    </div>
  );
}
