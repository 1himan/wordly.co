import Image from "next/image";
import React, { MouseEventHandler } from "react";
import socialMediaIcons from "@/lib/socialMediaIcons";

// what is an interface?
interface SocialMediaLinkProps {
  // what is this ugly looking thing down there?
  handleClick: MouseEventHandler<HTMLButtonElement>;
  // what is this as well?
  socialMedia: keyof typeof socialMediaIcons;
  // and at last what is this "?"
  width?: number;
}

export default function SocialMediaLink({
  handleClick,
  socialMedia,
  width = 30,
}: SocialMediaLinkProps) {
  const imageSrc = socialMediaIcons[socialMedia];
  if (!imageSrc) {
    console.error(`Image source for ${socialMedia} is not defined.`);
    return null;
  }
  return (
    <button type="button" onClick={handleClick} className="flex">
      <Image
        height={50}
        width={width}
        src={imageSrc}
        alt={`${socialMedia}-icon`}
        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-transform duration-300 transform hover:scale-[125%]"
      />
    </button>
  );
}
