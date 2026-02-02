"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "@/components/Confetti";
import Image from "next/image";

const BABE_NAME = "M. Chioma Maryann 💕";

export default function Home() {
  const [yesClicked, setYesClicked] = useState(false);
  const [secret, setSecret] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hearts, setHearts] = useState<
    { left: string; delay: string; size: string }[]
  >([]);

  useEffect(() => {
    audioRef.current = new Audio("/sound/90love.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 25 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.4}s`,
      size: `${Math.random() * 28 + 18}px`,
    }));

    setHearts(generatedHearts);
  }, []);

  // Heart cursor trail
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const heart = document.createElement("div");
      heart.innerText = "💖";
      heart.className = "fixed pointer-events-none animate-heart";
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1000);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const moveNoButton = () => {
    const button = noButtonRef.current;
    if (!button) return;

    const x = Math.random() * (window.innerWidth - 140);
    const y = Math.random() * (window.innerHeight - 80);

    button.style.position = "absolute";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  };

  const handleYes = async () => {
    try {
      await audioRef.current?.play();
    } catch {}
    setYesClicked(true);
  };

  return (
    <main className="relative font-bricolage-grotesk flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-pink-300 to-rose-200">
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart, i) => (
          <span
            key={i}
            className="absolute text-pink-400 animate-float"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              fontSize: heart.size,
            }}
          >
            💕
          </span>
        ))}
      </div>

      {!yesClicked ? (
        <div className="z-10 font-bricolage-grotesk text-center bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl animate-pop">
          <Image
            src="/teddy.jpg"
            alt="teddy"
            width={256}
            height={256}
            className="mx-auto rounded-full"
          />
          <h1
            onClick={() => setSecret(true)}
            className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 cursor-pointer font-bricolage-grotesk"
          >
            <p className="py-4">{BABE_NAME},</p>
            <span>will you be my Valentine? 💖</span>
          </h1>

          <p className="text-pink-400 text-lg">
            (Hint: there’s only one correct answer 😏)
          </p>

          <div className="flex gap-6 justify-center mt-8 relative">
            <button
              onClick={handleYes}
              className="px-10 py-4 text-xl font-semibold rounded-full bg-pink-500 text-white shadow-lg hover:scale-110 transition"
            >
              YES 💘
            </button>

            <button
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              className="px-10 py-4 text-xl font-semibold rounded-full bg-gray-300 text-gray-700 shadow-lg transition"
            >
              NO 😒
            </button>
          </div>

          {secret && (
            <p className="mt-6 text-pink-500 animate-pop">
              I love you more than you know 💝
            </p>
          )}
        </div>
      ) : (
        <Celebration name={BABE_NAME} />
      )}
    </main>
  );
}

function Celebration({ name }: { name: string }) {
  return (
    <div className="z-10 font-bricolage-grotesk text-center bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl animate-pop">
      <Confetti />
      <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mb-6 font-bricolage-grotesk">
        YAYYYY!!! SHE SAID YES 💖🎉
      </h1>
      <p className="text-2xl text-rose-500 mb-4">
        {name}, you’re officially my Valentine 😍
      </p>

      <Image
        src="/gif/basketball_celebration_dance.gif"
        alt="Kid dancing happily"
        width={500}
        height={500}
        className="mx-auto rounded-xl"
      />

      <h1 className="text-4xl font-bold text-pink-600 mb-4 pt-4">My Treasure 💖</h1>

      <p className="text-lg text-pink-500 leading-relaxed mb-6">
        Happy Valentine’s Day 💝
      </p>
      <p className="text-lg text-pink-400">
        I can’t wait to love you forever 💝
      </p>
    </div>
  );
}
