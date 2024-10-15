"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./context/themeContext";

export default function Home() {
  const { theme } = useTheme();
  return (
    <>
      <main className="overflow-y-hidden flex justify-center items-center w-[100vw] h-[80vh]">
        <div className="flex flex-col items-center justify-between lg:mb-10">
          <p
            className={`text-2xl md:text-3xl  ${
              theme === "dark" ? "text-white" : "text-[#4A90E2]"
            }`}
          >
            Wordly
          </p>
          <Image
            src="/pencil.png"
            width={400}
            height={87.93}
            alt="pencil"
            className="w-44 md:w-auto relative bottom-6 md:bottom-11"
          />
          <p
            className={`text-[.9rem] md:text-xl ${
              theme === "dark" ? "" : " text-[#2D5B92]"
            }`}
          >
            Empowering Writers Everywhere
          </p>
          <p
            className={`text-[.65rem] w-[60vw] text-center md:text-xs  mt-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            We believe in the power of words and the global reach of
            storytelling. We provide writers with the opportunity to earn
            through their writing, no matter where they are in the world. By
            focusing on creating compelling articles, writers can turn their
            passion into profit and support their journey with continuous growth
            and fair recognition. Join us and let your voice be heard.
          </p>
          <div className="w-fit flex justify-evenly mt-9 gap-4">
            <Link href="/articles">
              <button className="text-sm md:text-base text-[#50E3C2] min-w-32 outline rounded-md outline-1 px-5 py-1 hover:bg-[#50E3C2] hover:text-white transition-all">
                Start Reading
              </button>
            </Link>
            <Link href="/write">
              <button className="text-sm md:text-base text-[#50E3C2] min-w-32 outline rounded-md outline-1 px-5 py-1 hover:bg-[#50E3C2] hover:text-white transition-all">
                Start Writing
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
