"use client";

import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, [token]);

  if (!token || !loggedIn) return <p>Unauthorized</p>;

  return <div>{children}</div>;
}
