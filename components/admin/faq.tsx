"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FAQs = [
  {
    question: "What is the purpose of this website?",
    answer:
      "This website is a place to help you find the best products and services in the world.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact support by email at support@example.com or by phone at 123-456-7890.",
  },
  {
    question: "How do I find the best products?",
    answer:
      "You can find the best products by searching for them on the search page or by browsing the categories.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, you can return a product within 30 days of purchase. Please refer to our return policy for more details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to most countries. Shipping fees and delivery times may vary depending on the destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the order history page. You will also receive a tracking number via email once your order has shipped.",
  },
];
export function AdminFAQTable() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 dark:text-neutral-50 md:text-5xl">
        FAQs
      </h2>
      <p className="mx-auto max-w-lg text-center text-base text-neutral-600 dark:text-neutral-50">
        Hier kannst du deine FAQs bearbeiten
      </p>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        {FAQs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {

  return (
    <div
      className="mb-8 w-full cursor-pointer rounded-lg bg-white p-4 shadow-input dark:bg-neutral-900"
      onClick={() => {
        
      }}
    >
      <div className="flex items-start">
        <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
          <IconChevronUp
            className={cn(
              "absolute inset-0 h-6 w-6 transform text-black transition-all duration-200 dark:text-white",
              "rotate-90 scale-0"
            )}
          />
          <IconChevronDown
            className={cn(
              "absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-black transition-all duration-200 dark:text-white",
              "rotate-0 scale-100"
            )}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">
            {question}
          </h3>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden text-neutral-500 dark:text-neutral-400"
            >
              {answer.split("").map((line, index) => (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: index * 0.005,
                  }}
                  key={index}
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
