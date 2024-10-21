import { Merriweather } from "next/font/google";
import Image from "next/image";
import React from "react";

const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] });

interface LikeComponentProps {
  date: string;
  likeCount: number;
  commentsCount: number;
}

export default function LikeComponent({
  date,
  likeCount,
  commentsCount,
}: LikeComponentProps) {
  return (
    <div>
      <div className="bg-slate-00 mt-3 mb-2 w-full justify-between items-end h-fit flex bg-slate-00 pl-3">
        <div className="flex gap-5">
          <div
            className={`flex justify-center items-end ${merriweather.className}`}
          >
            <p className="text-[.6rem] lg:text-[.65rem] w-fit text-gray-500">
              {date}
            </p>
          </div>
          <div className="flex justify-center items-end">
            <Image
              src="/icons/like.svg"
              alt="like"
              width={20}
              height={40}
              className="w-3 lg:w-3 mb-[2px]"
            />
            <p
              className={`text-[.6rem] lg:text-[.65rem] text-gray-500 ml-1 ${merriweather.className}`}
            >
              {likeCount}
            </p>
          </div>
          <div className="flex justify-center items-end">
            <Image
              src="/icons/message.png"
              alt="comments"
              width={15}
              height={30}
              className="w-3 lg:w-3 mb-[2px]"
            />
            <p
              className={`text-[.6rem] lg:text-[.65rem] text-gray-500 ml-1 ${merriweather.className}`}
            >
              {commentsCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
