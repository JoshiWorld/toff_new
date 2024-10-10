"use client";

import { Link } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export function LinkEdit({ link }: { link: Link }) {
    const router = useRouter();
    const [titleNew, setTitleNew] = useState(link.title);
    const [routeNew, setRouteNew] = useState(link.route);
    const [activeNew, setActiveNew] = useState(link.active);
    const [linkNew, setLinkNew] = useState(link.link);

    const updateLink = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/protected/link", {
        method: "PUT",
        body: JSON.stringify({
          id: link.id,
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
          id: link.id,
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
      <div className="container flex flex-col items-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title" className="text-white">
            Titel
          </Label>
          <Input
            type="text"
            id="title"
            placeholder="Titel"
            value={titleNew}
            onChange={(e) => setTitleNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="route" className="text-white">
            Route
          </Label>
          <Input
            type="text"
            id="route"
            placeholder="Route"
            value={routeNew}
            onChange={(e) => setRouteNew(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="link" className="text-white">
            Link
          </Label>
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
            className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
      </div>
    );
}