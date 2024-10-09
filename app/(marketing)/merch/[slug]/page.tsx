"use client";

import { MerchView } from "@/components/merchview";
import { Merch } from "@prisma/client";
import { useEffect, useState } from "react";

export default function LiveBlog({ params }: { params: { slug: string } }) {
  const [merch, setMerch] = useState<Merch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/merch/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setMerch(data);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) return <p>Loading..</p>;
  if (!merch) return <p>Not found</p>;

  return <MerchView merch={merch} />;
}
