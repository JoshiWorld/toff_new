"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FAQ } from "@prisma/client";

export function AdminFAQTable() {
  const router = useRouter();
  const [question, setQeustion] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState<FAQ[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/faq").then((res) => res.json()).then((data) => {
      setData(data);
      setLoading(false);
    })
  }, []);

  if(isLoading) return <p>Loading...</p>;

  const createFAQ = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/faq", {
      method: "POST",
      body: JSON.stringify({
        question: question,
        answer: answer,
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setQeustion("");
      setAnswer("");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 dark:text-neutral-50 md:text-5xl">
        FAQs
      </h2>
      <p className="mx-auto max-w-lg text-center text-base text-neutral-600 dark:text-neutral-50">
        Hier kannst du deine FAQs bearbeiten
      </p>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        {data.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            id={faq.id}
          />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Erstellen</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="question">Frage</Label>
            <Input
              type="text"
              id="question"
              placeholder="Frage"
              value={question}
              onChange={(e) => setQeustion(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="answer">Antwort</Label>
            <Input
              type="text"
              id="answer"
              placeholder="Antwort"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <Button onClick={createFAQ}>Erstellen</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const FAQItem = ({
  id,
  question,
  answer,
}: {
  id: string;
  question: string;
  answer: string;
}) => {
  const router = useRouter();
  const [questionNew, setQeustionNew] = useState(question);
  const [answerNew, setAnswerNew] = useState(answer);

  const updateFAQ = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/faq", {
      method: "PUT",
      body: JSON.stringify({
        _id: id,
        question: questionNew,
        answer: answerNew,
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      router.push("/admin/dashboard");
    }
  };

  const deleteFAQ = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/faq", {
      method: "DELETE",
      body: JSON.stringify({
        _id: id
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="mb-8 w-full cursor-pointer rounded-lg bg-white p-4 shadow-input dark:bg-neutral-900"
          onClick={() => {}}
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
      </DialogTrigger>
      <DialogContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="question">Frage</Label>
          <Input
            type="text"
            id="question"
            placeholder="Frage"
            value={questionNew}
            onChange={(e) => setQeustionNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="answer">Antwort</Label>
          <Input
            type="text"
            id="answer"
            placeholder="Antwort"
            value={answerNew}
            onChange={(e) => setAnswerNew(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <Button variant={"destructive"} onClick={deleteFAQ}>Löschen</Button>
          <Button onClick={updateFAQ}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
