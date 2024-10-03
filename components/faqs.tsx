"use client";
import React, { useEffect, useState } from "react";
import Accordion from "./accordion";
import { Heading } from "./heading";
import type { FAQ } from "@/types/mongodb";

export const FAQs = () => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<FAQ[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/faq').then((res) => res.json()).then((data) => {
      setData(data);
      setLoading(false);
    })
  }, []);

  if(isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      {!data || data.length === 0 ? (
        <Heading className="pt-4">Keine FAQs gefunden</Heading>
      ) : (
        <Heading className="pt-4">Häufig gestellte Fragen</Heading>
      )}
      <div className="grid  gap-10 pt-20">
        {data.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.question}
            description={item.answer}
          />
        ))}
      </div>
    </div>
  );
};
