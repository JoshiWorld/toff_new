"use client";

import { LiveBlogView } from "@/components/liveblog";
import { Live } from "@prisma/client";
import { useEffect, useState } from "react";

export default function LiveBlog({ params }: { params: { slug: string } }) {
    const [live, setLive] = useState<Live | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/public/live/${params.slug}`).then((res) => res.json()).then((data) => {
            setLive(data);
            setLoading(false);
        })
    }, [params.slug]);

    if(loading) return <p>Loading..</p>;
    if(!live) return <p>Not found</p>;

    return <LiveBlogView live={live} />
}