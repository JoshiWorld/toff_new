"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Stats } from "@/types/mongodb";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function AdminStatsTable() {
  const router = useRouter();
  const [platform, setPlatform] = useState("");
  const [stats, setStats] = useState(0);
  const [goal, setGoal] = useState(0);
  const [data, setData] = useState<Stats[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/stats").then((res) => res.json()).then((data) => {
      setData(data);
      setLoading(false);
    })
  }, []);

  if(isLoading) return <p>Loading...</p>;

  const createStat = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/stats", {
      method: "POST",
      body: JSON.stringify({
        platform: platform,
        stats: stats,
        goal: goal,
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setPlatform("");
      setStats(0);
      setGoal(0);
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 dark:text-neutral-50 md:text-5xl">
        Stats
      </h2>
      <p className="mx-auto max-w-lg text-center text-base text-neutral-600 dark:text-neutral-50">
        Hier kannst du deine Stats bearbeiten
      </p>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        {data.map((stat, index) => (
          <StatsItem
            key={index}
            platform={stat.platform}
            goal={stat.goal}
            stats={stat.stats}
            id={stat._id}
          />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Erstellen</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="platform">Plattform</Label>
            <Input
              type="text"
              id="platform"
              placeholder="Plattform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="stats">Stats</Label>
            <Input
              type="number"
              id="stats"
              placeholder="200000"
              value={stats}
              onChange={(e) => setStats(Number(e.target.value))}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="goal">Ziel</Label>
            <Input
              type="number"
              id="goal"
              placeholder="400000"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
            />
          </div>
          <Button onClick={createStat}>Erstellen</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const StatsItem = ({
  id,
  platform,
  stats,
  goal,
}: {
  id: string;
  platform: string;
  goal: number;
  stats: number;
}) => {
  const router = useRouter();
  const [platformNew, setPlatformNew] = useState(platform);
  const [statsNew, setStatsNew] = useState(stats);
  const [goalNew, setGoalNew] = useState(goal);

  const updateStat = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/stats", {
      method: "PUT",
      body: JSON.stringify({
        _id: id,
        platform: platformNew,
        stats: statsNew,
        goal: goalNew,
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

  const deleteStat = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/stats", {
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
                {platform}
              </h3>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="platform">Plattform</Label>
          <Input
            type="text"
            id="platform"
            placeholder="Plattform"
            value={platformNew}
            onChange={(e) => setPlatformNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="stats">Stats</Label>
          <Input
            type="number"
            id="stats"
            placeholder="200000"
            value={statsNew}
            onChange={(e) => setStatsNew(Number(e.target.value))}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="goal">Ziel</Label>
          <Input
            type="number"
            id="goal"
            placeholder="400000"
            value={goalNew}
            onChange={(e) => setGoalNew(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between">
          <Button variant={"destructive"} onClick={deleteStat}>
            Löschen
          </Button>
          <Button onClick={updateStat}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
