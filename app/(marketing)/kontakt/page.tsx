import { AmbientColor } from "@/components/ambient-color";
import { ContactForm } from "@/components/contact-form";
import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Tools } from "@/components/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOFF Kontaktformular",
  description:
    "Hier kannst du uns kontaktieren!",
  openGraph: {
    images: ["https://proactiv-aceternity.vercel.app/banner.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <ContactForm />
    </div>
  );
}
