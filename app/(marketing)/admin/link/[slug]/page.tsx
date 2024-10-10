"use client";

import { LinkEdit } from "@/components/admin/linkEdit";
import { LinkStatsBarChart } from "@/components/admin/linkstats/barchart";
import { DeviceChart } from "@/components/admin/linkstats/deviceChart";
import { Link, LinkTracking } from "@prisma/client";
import { useEffect, useState } from "react";

export default function LinksViewCurrent({ params }: { params: { slug: string } }) {
    const id = params.slug;
    const [link, setLink] = useState<Link | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/public/oneLink/${id}`).then((res) => res.json()).then((data) => {
            setLink(data);
            setLoading(false);
        });
    }, [id]);

    if(loading) return <p>Loading..</p>;
    if(!link) return <p>Not found</p>;

    return (
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40">
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
        {/* <DeviceChart trackings={linkStats} /> */}
      </div>
    );
}