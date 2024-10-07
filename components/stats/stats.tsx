"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Stats } from "@/types/mongodb";
import Image from "next/image";

export function StatsWithNumberTicker() {
  const [items, setItems] = useState<Stats[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/stats")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-28 relative w-full h-full">
      <video
        src="/MUSIC_BACKGROUND.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <CurrentStats stats={items} />
        <GoalStats stats={items} />
      </div>
    </div>
  );
}

function CurrentStats({stats}: {stats: Stats[]}) {
    return (
      <section className="group/container relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl p-10 py-20">
        <div className="relative z-20">
          <h2 className="text-center text-xl font-bold text-white dark:text-neutral-100 md:text-3xl">
            Aktuelle Statistiken
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-neutral-200 dark:text-neutral-200 md:text-base">
            Das sind die aktuellen Statistiken von TOFF
          </p>
          <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                initial={{
                  y: 20,
                  opacity: 0,
                  filter: "blur(4px)",
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={"card" + index}
                className={cn("group/card relative overflow-hidden rounded-lg")}
              >
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-white dark:text-neutral-200">
                    <AnimatedNumber value={item.stats} />
                  </p>
                </div>
                <p className="text-balance mt-4 text-base text-neutral-300 dark:text-neutral-300">
                  {item.platform}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
}

function GoalStats({ stats }: { stats: Stats[] }) {
  return (
    <section className="group/container relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl p-10 py-20">
      <div className="relative z-20">
        <h2 className="text-center text-xl font-bold text-white dark:text-neutral-100 md:text-3xl">
          Ziele für {new Date().getFullYear()}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-neutral-200 dark:text-neutral-200 md:text-base">
          Das sind die Ziele für dieses Jahr von TOFF
        </p>
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              initial={{
                y: 20,
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              key={"card" + index}
              className={cn("group/card relative overflow-hidden rounded-lg")}
            >
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white dark:text-neutral-200">
                  <AnimatedNumber value={item.goal} />
                </p>
              </div>
              <p className="text-balance text-balance mt-4 text-base text-neutral-300 dark:text-neutral-300">
                {item.platform}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({
  value,
  initial = 0,
}: {
  value: number;
  initial?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const spring = useSpring(initial, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    } else {
      spring.set(initial);
    }
  }, [isInView, spring, value, initial]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
