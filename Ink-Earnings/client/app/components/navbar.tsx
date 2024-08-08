"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({
  read = true,
  write = true,
  publish = true,
  edit = false,
}) {
  const pathname = usePathname();

  return (
    <nav className="h-12 w-[100vw] outline outline-1 outline-gray-300 flex">
      <div className="flex h-full w-full justify-between items-center">
        <Link href="/">
          <div className="flex flex-row items-center gap-2  w-fit bg-red-00 bg-slate-00">
            <div className="text-[#4A90E2] bg-gray-00">
              <Image
                className="ml-3"
                src="/pencil-icon.png"
                width={35}
                height={30}
                alt="icon"
              />
            </div>
            <div>
              <p className="bg-slate-00 text-[#4A90E2] cursor-pointer text-xs">
                Wordly
              </p>
            </div>
          </div>
        </Link>

        <div className="text-sm text-gray-500 w-fit min-w-40 flex gap-7 items-center justify-end mr-6">
          {/* {read && ( */}
          <Link
            href="/articles"
            className={`text-xs ${
              pathname.includes("article")
                ? "text-[#2D5B92] underline underline-offset-4"
                : ""
            }`}
          >
            <p className="cursor-pointer">Read</p>
          </Link>
          {/* )} */}
          {/* {write && ( */}
          
          <Link
            href="/write"
            className={`text-xs ${
              pathname.includes("write")
                ? "text-[#2D5B92] underline underline-offset-4"
                : ""
            }`}
          >
            <p className="cursor-pointer">Write</p>
          </Link>
          {/* )} */}
          {/* {publish && (
            <Link href="/write">
              <p className="cursor-pointer bg-[#50E3C2] px-2 py-1 text-white rounded-sm text-xs">
                Publish
              </p>
            </Link>
          )}{" "}
          {publish && (
            <Link
              href="/write"
              className="cursor-pointer bg-cyan-00 outline outline-1 outline-cyan-600  px-2 py-1 text-cyan-600 rounded-sm gap-2"
            >
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                <p className="text-xs">Edit</p>
              </div>
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
}
