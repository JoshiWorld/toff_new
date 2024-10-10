"use client";

import { Link } from "@prisma/client";
import { useEffect, useState } from "react";

export default function LinkRoute({ params }: { params: { slug: string } }) {
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDeviceType = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        return "Mobile";
      } else {
        return "Desktop";
      }
    };

    const fetchGeoLocation = async () => {
      try {
        const response = await fetch("https://ipinfo.io?token=999eaf392f5425");
        const data = await response.json();
        const { city, country } = data; 
        return { city, country };
      } catch (error) {
        console.error("Error fetching geolocation: ", error);
        return { city: "Unknown", country: "Unknown" }; 
      }
    };

    const convertToSpotifyUri = (url: string) => {
      // Beispiel: https://open.spotify.com/track/5ExETTpCaGBW2yMWoUTwH3
      const match = url.match(/\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
      if (match) {
        const type = match[1]; // z.B. 'track', 'album', 'playlist'
        const id = match[2]; // z.B. '5ExETTpCaGBW2yMWoUTwH3'
        return `spotify:${type}:${id}`;
      }
      return url; 
    };

    const fetchLinkWithHeaders = async () => {
      const { city, country } = await fetchGeoLocation();
      const deviceType = getDeviceType();

      fetch(`/api/public/link/${params.slug}`, {
        method: "GET",
        headers: {
          "X-User-Country": country,
          "X-User-City": city,
          "X-User-Device": deviceType,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLink(data);
          setLoading(false);

          if(data && data.link) {
            if (deviceType === "Mobile") {
              const spotifyUri = convertToSpotifyUri(data.link);
              window.location.href = spotifyUri;
            } else {
              window.location.href = data.link;
            }
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };

    fetchLinkWithHeaders();
  }, [params.slug]);

  if (loading) return <p>Loading..</p>;
  if (!link) return <p>Not found</p>;

  return (
    <div className="text-white">
        <p>Link found</p>
    </div>
  );
}
