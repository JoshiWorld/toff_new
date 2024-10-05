import { AdminFAQTable } from "@/components/admin/faq";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { FAQ } from "@prisma/client";

export default function AdminFAQ({ faqs }: { faqs: FAQ[] }) {
  return <AdminFAQTable data={faqs} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const faqs = await prisma.fAQ.findMany();
  return {
    props: {
      faqs,
    },
  };
};