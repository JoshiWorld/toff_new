"use client";
import React, { useEffect, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Link } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";

export function AdminLinkTable() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [route, setRoute] = useState("");
  const [link, setLink] = useState("");
  const [data, setData] = useState<Link[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/link")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  const createLink = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/link", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        route: route,
        link: link,
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setTitle("");
      setRoute("");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 dark:text-neutral-50 md:text-5xl">
        Links
      </h2>
      <p className="mx-auto max-w-lg text-center text-base text-neutral-600 dark:text-neutral-50">
        Hier kannst du deine Deep-Links bearbeiten
      </p>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        {data.map((link, index) => (
          <LinkItem
            key={index}
            title={link.title}
            route={link.route}
            active={link.active}
            link={link.link}
            id={link.id}
          />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Erstellen</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Titel</Label>
            <Input
              type="text"
              id="title"
              placeholder="Tausend Träume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="route">Route</Label>
            <Input
              type="text"
              id="route"
              placeholder="tausend-traeume"
              value={route}
              onChange={(e) => setRoute(e.target.value.replace(/\s+/g, "-"))}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="link">Link</Label>
            <Input
              type="text"
              id="link"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <Button onClick={createLink}>Erstellen</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const LinkItem = ({
  id,
  title,
  route,
  active,
  link,
}: {
  id: string;
  title: string;
  route: string;
  active: boolean;
  link: string;
}) => {
  const router = useRouter();
  const [titleNew, setTitleNew] = useState(title);
  const [routeNew, setRouteNew] = useState(route);
  const [activeNew, setActiveNew] = useState(active);
  const [linkNew, setLinkNew] = useState(link);

  const updateLink = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/link", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: titleNew,
        route: routeNew,
        active: activeNew,
        link: linkNew,
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

  const deleteLink = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/link", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
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
                {titleNew}
              </h3>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Titel</Label>
          <Input
            type="text"
            id="title"
            placeholder="Titel"
            value={titleNew}
            onChange={(e) => setTitleNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="route">Route</Label>
          <Input
            type="text"
            id="route"
            placeholder="Route"
            value={routeNew}
            onChange={(e) => setRouteNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="link">Link</Label>
          <Input
            type="text"
            id="link"
            placeholder="Link"
            value={linkNew}
            onChange={(e) => setLinkNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Checkbox
            id="active"
            checked={activeNew}
            onCheckedChange={(checked) => setActiveNew(Boolean(checked))}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Aktiv
          </label>
        </div>
        <div className="flex justify-between">
          <Button variant={"destructive"} onClick={deleteLink}>
            Löschen
          </Button>
          <Button onClick={updateLink}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
