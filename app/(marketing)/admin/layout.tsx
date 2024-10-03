"use client";

import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/public/user/verify", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setLoggedIn(true);
      });
  }, []);

  if (!loggedIn) return <p>Unauthorized</p>;

  return <div>{children}</div>;
}
