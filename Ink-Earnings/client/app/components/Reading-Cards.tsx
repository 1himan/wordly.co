import React from "react";
import Image from "next/image";
import { Merriweather, Open_Sans } from "next/font/google";
import Link from "next/link";
import LongMenu from "./menu";

const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] });
const openSans = Open_Sans({ weight: ["400", "600"], subsets: ["latin"] });

// Define the interface for the props
interface ReadingCardsProps {
  imageUrl: string;
  heading: string;
  description: string;
  date: string;
  likeCount: number;
  commentsCount: number;
  id: string;
}

export default function ReadingCards({
  imageUrl,
  heading,
  description,
  date,
  likeCount,
  commentsCount,
  id,
}: ReadingCardsProps) {
  return (
    <>
      {/* this is a link component okay */}
      <Link href={`/articles/${id}`}>
        <div className="h-fit border-b-2 mb-7 mr-2 flex items-center hover:bg-gray-100 cursor-pointer transition-all ">
          <div className="flex max-h-fit max-w-32 justify-center items-center w-1/5 bg-slate-00">
            <Image
              className="max-h-32"
              src={`${imageUrl}`}
              alt="coding"
              width={200}
              height="40"
            />
          </div>
          <div className="w-4/5 pl-3 pr-1 flex flex-col justify-around items-center bg-gray-00">
            <div className="bg-gray-00 w-full">
              <div className="flex">
                <p
                  className={`bg-slate-00 text-sm text-start ${merriweather.className}`}
                >
                  {heading}
                </p>
                {/* <LongMenu /> */}
              </div>

              <p
                className={`text-[.6rem] lg:text-[.65rem] mt-1 text-gray-500 ${openSans.className}`}
              >
                {description}
              </p>
            </div>

            <div className="bg-slate-00 mt-3 mb-2 w-full justify-between items-end h-fit flex bg-slate-00">
              <div className="flex b-black gap-5">
                <div
                  className={`flex justify-center items-end ${merriweather.className}`}
                >
                  <p className="text-[.6rem] lg:text-[.65rem] w-fit text-gray-500">
                    {date}
                  </p>
                </div>
                <div className=" flex justify-center items-end">
                  <Image
                    src="/like.svg"
                    alt=""
                    width={20}
                    height={40}
                    className="w-3 lg:w-3"
                  />
                  <p
                    className={`text-[.6rem] lg:text-[.65rem] text-gray-500 ml-1 ${merriweather.className}`}
                  >
                    {likeCount}
                  </p>
                </div>
                <div className="flex justify-center items-end">
                  <Image
                    src="/message.svg"
                    alt=""
                    width={15}
                    height={30}
                    className="w-3 lg:w-3"
                  />
                  <p
                    className={`text-[.6rem] lg:text-[.65rem] text-gray-500 ml-1 ${merriweather.className}`}
                  >
                    {commentsCount}
                  </p>
                </div>
              </div>
              <div className="flex items-end ">
                <div className="">
                  <Image
                    src="/bookmark.svg"
                    alt=""
                    width={22}
                    height={30}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
