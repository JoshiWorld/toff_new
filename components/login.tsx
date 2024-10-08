"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function LoginWithSocialsAndEmail() {
  return (
    <div className="relative w-full overflow-hidden">
      <AmbientColor />
      <Form />
    </div>
  );
}

function Form() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const res = await fetch("/api/public/user/login", {
      method: "POST",
      body: JSON.stringify({
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if(res.token) {
        localStorage.setItem("token", `Bearer ${res.token}`);
        router.push('/admin/dashboard');
    } else {
        console.error("Login fehlgeschlagen");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center"
    >
      <h1 className="my-4 text-xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">
        Als Admin einloggen
      </h1>

      <div className="my-6 h-px w-full bg-neutral-100 dark:bg-neutral-800" />
      <motion.input
        initial={{
          height: "0px",
          opacity: 0,
          marginBottom: "0px",
        }}
        animate={{
          height: isClicked ? "40px" : "0px",
          opacity: isClicked ? 1 : 0,
          marginBottom: isClicked ? "10px" : "0px",
        }}
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block h-10 w-full rounded-md border-0 bg-white px-4 py-1.5 pl-4 text-black shadow-input placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-neutral-900 dark:text-white sm:text-sm sm:leading-6"
      />
      <button
        onClick={(e) => {
          if (!isClicked) {
            setIsClicked(true);
            return;
          }
          handleSubmit(e);
        }}
        className="group/btn relative w-full rounded-lg bg-black px-4 py-3 text-white dark:bg-white dark:text-black"
      >
        <div className="absolute inset-0 h-full w-full transform opacity-0 transition duration-200 group-hover/btn:opacity-100">
          <div className="absolute -left-px -top-px h-4 w-4 rounded-tl-lg border-l-2 border-t-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-left-4 group-hover/btn:-top-4 dark:border-white"></div>
          <div className="absolute -right-px -top-px h-4 w-4 rounded-tr-lg border-r-2 border-t-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-right-4 group-hover/btn:-top-4 dark:border-white"></div>
          <div className="absolute -bottom-px -left-px h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-bottom-4 group-hover/btn:-left-4 dark:border-white"></div>
          <div className="absolute -bottom-px -right-px h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-black bg-transparent transition-all duration-200 group-hover/btn:-bottom-4 group-hover/btn:-right-4 dark:border-white"></div>
        </div>
        <span className="text-sm">Mit Passwort anmelden</span>
      </button>
    </form>
  );
}

export const AmbientColor = () => {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-40 h-screen w-screen">
      <div
        style={{
          transform: "translateY(-350px) rotate(-45deg)",
          width: "560px",
          height: "1380px",
          background:
            "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
        }}
        className="absolute left-0 top-0"
      />

      <div
        style={{
          transform: "rotate(-45deg) translate(5%, -50%)",
          transformOrigin: "top left",
          width: "240px",
          height: "1380px",
          background:
            "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
        }}
        className="absolute left-0 top-0"
      />

      <div
        style={{
          position: "absolute",
          borderRadius: "20px",
          transform: "rotate(-45deg) translate(-180%, -70%)",
          transformOrigin: "top left",
          top: 0,
          left: 0,
          width: "240px",
          height: "1380px",
          background:
            "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
        }}
        className="absolute left-0 top-0"
      />
    </div>
  );
};
