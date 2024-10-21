"use client";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import ReadingCards from "@/app/components/articles/ArticleCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserSocialMediaLink from "@/app/components/UI/UserSocialMediaLink";
import Chip from "@mui/material/Chip"; // Import MUI Chip

// Define the Writer interface
interface Writer {
  cover: string;
  profilePicture: string;
  username: string;
  bio: string;
  weeklyReaders: number;
  articlesWritten: number;
  interests: string[];
  quote: string;
  socialMedia: {
    github?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  articles: {
    id: string;
    imageUrl: string;
    heading: string;
    description: string;
    date: string;
    likeCount: number;
    commentsCount: number;
  }[];
}

const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Page() {
  const [writer, setWriter] = useState<Writer | null>(null);

  useEffect(() => {
    const fetchWriterData = async () => {
      const response = await fetch("http://localhost:8001/writer/profile", {
        credentials: "include",
      });
      const data: Writer = await response.json();
      console.log(data);
      setWriter(data);
    };

    fetchWriterData();
  }, []);

  if (!writer) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`w-[100vw] lg:w-[100vw] h-[90vh] flex flex-col lg:flex-row lg:justify-evenly ${openSans.className}`}
    >
      <div className="lg:w-[40%] lg:h-full h-fit lg:border-r border-gray-00 flex flex-col items-center ">
        <Image
          height={1000}
          width={1000}
          alt="cover image"
          src={writer.cover}
          className="w-full max-h-[217px] object-cover"
        />
        <div className="flex flex-col justify-center items-center bg-slate-00 ">
          <Image
            alt="pfp"
            src={writer.profilePicture}
            width={1000}
            height={1000}
            className="shadow-2xl rounded-full border-4 border-white w-[10vw] min-w-20 min-h-20 h-[10vw] bottom-12 mt-[-60px]"
          />
          <p className="text-xl font-semibold text-gray-00 my-2">
            {writer.username}
          </p>
        </div>
        <p className="text-center text-gray-00 mt bg-slate-00 text-sm pb-2 mx-4">
          Full-stack dev navigating the data science matrix. Engages in
          ontological debates, theological discourse, and existential musings.
        </p>
        <div className="bg-slate-00 flex justify-evenly lg:py-4 pt-2 flex-wrap border-b pb-3">
          <p className="font-semibold text-gray-600 text-sm mx-2">
            Weekly Readers: {writer.weeklyReaders}
          </p>
          <p className="font-semibold text-gray-600 text-sm mx-2">
            Articles Written: {writer.articlesWritten}
          </p>
        </div>
        <div className="bg-slate-00 text-center py-3 hidden lg:block">
          <p className="text-sm mb-2 font-semibold text-gray-600">
            Interested In
          </p>
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {writer.interests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                component="a"
                href={`/tags/${interest}`}
                clickable
                className="text-xs"
              />
            ))}
          </div>
        </div>
        <div className="justify-evenly mb-4 mt-8 hidden lg:flex w-36">
          <UserSocialMediaLink
            socialMedia={"github"}
            width={25}
            socialMediaLink={writer.socialMedia}
          />
          <UserSocialMediaLink
            socialMedia={"linkedin"}
            width={25}
            socialMediaLink={writer.socialMedia}
          />
          <UserSocialMediaLink
            socialMedia={"facebook"}
            width={25}
            socialMediaLink={writer.socialMedia}
          />
          <UserSocialMediaLink
            socialMedia={"instagram"}
            width={25}
            socialMediaLink={writer.socialMedia}
          />
          <UserSocialMediaLink
            socialMedia={"twitter"}
            width={25}
            socialMediaLink={writer.socialMedia}
          />
        </div>
      </div>
      <div className="lg:w-[60%] bg-slate-00 lg:mx-5 mt-3 flex flex-col items-center">
        <p className="text-gray-600 text-center mb-6 ">
          Articles By {writer.username}
        </p>
        {writer.articles.map((item) => (
          <ReadingCards
            key={item.id}
            imageUrl={item.imageUrl || ""}
            heading={item.heading}
            description={item.description}
            date={item.date}
            likeCount={item.likeCount}
            commentsCount={item.commentsCount}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}
