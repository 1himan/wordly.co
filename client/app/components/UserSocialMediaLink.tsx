import Image from "next/image";
import React from "react";
import socialMediaIcons from "@/lib/socialMediaIcons";
import Link from "next/link";

export default function UserSocialMediaLink({
  socialMediaLink,
  socialMedia,
  width = 30,
}) {
  const imageSrc = socialMediaIcons[socialMedia];
  const url = socialMediaLink[socialMedia]; // Get the URL for the specific social media

  if (!imageSrc) {
    console.error(`Image source for ${socialMedia} is not defined.`);
    return null;
  }

  if (!url) {
    // console.warn(`No URL defined for ${socialMedia}.`);
    return null; // Optionally render a fallback UI here
  }

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <button type="button" className="">
        <Image
          height={50}
          width={width}
          src={imageSrc}
          alt={`${socialMedia}-icon`}
          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-transform duration-300 transform hover:scale-[125%]"
        />
      </button>
    </Link>
  );
}
