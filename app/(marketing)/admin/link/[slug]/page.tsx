"use client";

import { LinkEdit } from "@/components/admin/linkEdit";
import { LinkStatsBarChart } from "@/components/admin/linkstats/barchart";
import { CountryChart } from "@/components/admin/linkstats/countryChart";
import { DeviceChart } from "@/components/admin/linkstats/deviceChart";
import { Link, LinkTracking } from "@prisma/client";
import { IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function LinksViewCurrent({ params }: { params: { slug: string } }) {
    const id = params.slug;
    const [link, setLink] = useState<Link | null>(null);
    const [loading, setLoading] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch(`/api/public/oneLink/${id}`).then((res) => res.json()).then((data) => {
            setLink(data);
            setLoading(false);
        });
    }, [id]);

    if(loading) return <p>Loading..</p>;
    if(!link) return <p>Not found</p>;

    const copyToClipboard = () => {
      const linkToCopy = `https://toff-musik.de/link/${link!.route}`;
      navigator.clipboard.writeText(linkToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
        <blockquote className="text-white mt-6 border-l-2 pl-6 italic">
          https://toff-musik.de/link/{link.route}
          <span
            className="relative inline-block ml-2 cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={copyToClipboard}
          >
            <IconCopy />
            {showTooltip && (
              <span className="absolute left-0 bottom-full mb-2 w-32 bg-gray-800 text-white text-xs p-1 rounded">
                {copied ? "Link kopiert!" : "Link kopieren"}
              </span>
            )}
          </span>
        </blockquote>
        <LinkEdit link={link} />
        <LinkCharts link={link} />
      </div>
    );
}

function LinkCharts({ link }: { link: Link }) {
    const [linkStats, setLinkStats] = useState<LinkTracking[] | null>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`/api/protected/linkstats/${link.id}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`
            }
        }).then((res) => res.json()).then((data) => {
            setLinkStats(data);
            setLoading(false);
            console.log(data);
        })
    }, [link]);

    if(loading) return <p>Loading..</p>;
    if(!linkStats) return <p>No Data</p>;

    return (
      <div className="pt-10">
        <LinkStatsBarChart trackings={linkStats} />
        <div className="flex justify-center">
          <DeviceChart trackings={linkStats} />
        </div>
      </div>
    );
}