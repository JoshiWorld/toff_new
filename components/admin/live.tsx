"use client";
import React, { useEffect, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Live } from "@prisma/client";

export function AdminLiveTable() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<Live[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/live").then((res) => res.json()).then((data) => {
      setData(data);
      setLoading(false);
    })
  }, []);

  if(isLoading) return <p>Loading...</p>;

  const createLive = async () => {
    const token = localStorage.getItem("token");
    if(!imageFile) return;

    const imageForm = new FormData();
    imageForm.append("file", imageFile);

    const getImageLink = await fetch("/api/protected/s3", {
      method: "POST",
      body: imageForm,
      headers: {
        Authorization: `${token}`,
      },
    });
    const imageLink = await getImageLink.json();

    const res = await fetch("/api/protected/live", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        link: link,
        date: date.toISOString(),
        image: imageLink.link
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      setTitle("");
      setDescription("");
      setDate(new Date());
      setLink("");
      setImageFile(null);
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-600 dark:text-neutral-50 md:text-5xl">
        Live
      </h2>
      <p className="mx-auto max-w-lg text-center text-base text-neutral-600 dark:text-neutral-50">
        Hier kannst du deine Live-Blogs bearbeiten
      </p>
      <div className="mx-auto mt-10 w-full max-w-3xl">
        {data.map((live, index) => (
          <LiveItem
            key={index}
            title={live.title}
            description={live.description}
            link={live.link}
            date={live.date}
            image={live.image}
            id={live.id}
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
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              placeholder="Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="date">Datum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Datum auswählen</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  // @ts-expect-error
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Bild</Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files);
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
          </div>
          <Button onClick={createLive}>Erstellen</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const LiveItem = ({
  id,
  title,
  description,
  link,
  date,
  image
}: {
  id: string;
  title: string;
  description: string;
  link: string;
  date: Date;
  image: string;
}) => {
  const router = useRouter();
  const [titleNew, setTitleNew] = useState(title);
  const [linkNew, setLinkNew] = useState(link);
  const [descriptionNew, setDescriptionNew] = useState(description);
  const [dateNew, setDateNew] = useState(date);
  const [imageNew, setImageNew] = useState<File | null>(null);

  const updateLive = async () => {
    if(!imageNew) await updateWithoutNewImage();
    else await updateWithNewImage();
  };

  const updateWithoutNewImage = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/live", {
      method: "PUT",
      body: JSON.stringify({
        _id: id,
        title: titleNew,
        link: linkNew,
        description: descriptionNew,
        date: dateNew,
        image: image,
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      router.push("/admin/dashboard");
    }
  }

  const updateWithNewImage = async () => {
    const token = localStorage.getItem("token");
    if(!imageNew) return;

    const imageForm = new FormData();
    imageForm.append("file", imageNew);
    imageForm.append("old", image);

    const getImageLink = await fetch("/api/protected/s3", {
      method: "PUT",
      body: imageForm,
      headers: {
        Authorization: `${token}`,
      },
    });
    const imageLink = await getImageLink.json();

    const res = await fetch("/api/protected/live", {
      method: "PUT",
      body: JSON.stringify({
        _id: id,
        title: titleNew,
        link: linkNew,
        description: descriptionNew,
        date: dateNew,
        image: imageLink.link,
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

  const deleteLive = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/protected/live", {
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
                {title}
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
          <Label htmlFor="description">Beschreibung</Label>
          <Textarea
            id="description"
            placeholder="Beschreibung"
            value={descriptionNew}
            onChange={(e) => setDescriptionNew(e.target.value)}
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
          <Label htmlFor="date">Datum</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !dateNew && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateNew ? (
                  format(dateNew, "PPP")
                ) : (
                  <span>Datum auswählen</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateNew}
                // @ts-expect-error
                onSelect={setDateNew}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Bild</Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files);
              if (e.target.files && e.target.files.length > 0) {
                setImageNew(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="flex justify-between">
          <Button variant={"destructive"} onClick={deleteLive}>
            Löschen
          </Button>
          <Button onClick={updateLive}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
