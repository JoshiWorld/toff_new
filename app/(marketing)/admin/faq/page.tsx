import { AdminFAQTable } from "@/components/admin/faq";
import prisma from "@/lib/prisma";
import { FAQ } from "@prisma/client";

export default async function AdminFAQ() {
  const faqs: FAQ[] = await prisma.fAQ.findMany();

  return <AdminFAQTable data={faqs} />;
}
