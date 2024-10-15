import Image from "next/image";
import React from "react";
import socialMediaIcons from "@/lib/socialMediaIcons";
export default function SocialMediaLink({ handleClick, socialMedia ,width=30 }) {
  const imageSrc = socialMediaIcons[socialMedia];

  if (!imageSrc) {
    console.error(`Image source for ${socialMedia} is not defined.`);
    return null;
  }

  return (
    <button type="button" onClick={handleClick} className="">
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
