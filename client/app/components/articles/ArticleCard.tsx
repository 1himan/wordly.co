import React, { useState } from "react";
import Image from "next/image";
import { Merriweather, Open_Sans } from "next/font/google";
import Link from "next/link";
import LikeComponent from "../UI/ArticleMetaInfo";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // MUI icon for the three dots
import { Add, Share } from "@mui/icons-material";
import Swal from "sweetalert2"; // Import SweetAlert2

const merriweather = Merriweather({ weight: ["400"], subsets: ["latin"] });
const openSans = Open_Sans({ weight: ["400", "600"], subsets: ["latin"] });

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = async (option: string) => {
    if (option === "Share") {
      try {
        const articleLink = `${window.location.origin}/articles/${id}`;
        await navigator.clipboard.writeText(articleLink); // Copy the article URL to clipboard

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Link copied to clipboard!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          width: "400px",
        });
      } catch (err) {
        console.error("Failed to copy link:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to copy the link. Please try again.",
        });
      }
    } else if (option === "Add to Playlist") {
      Swal.fire({
        icon: "info",
        title: "Feature coming soon",
        text: "This feature will be added in a future update.",
        showConfirmButton: true,
      });
    }

    handleClose();
  };

  return (
    <div className="flex border-b-2 mb-4 hover:bg-gray-100 cursor-pointer transition-all max-w-[800px] lg:w-full">
      {/* The card content wrapped inside the link */}
      <Link
        href={`/articles/${id}`}
        className="flex max-w-32 justify-center items-center w-2/5 bg-slate-00"
      >
        <div className="md:min-w-[116px]">
          <Image
            className="max-h-24"
            src={`${imageUrl}`}
            alt="coding"
            width={100}
            height="20"
          />
        </div>
      </Link>

      <div>
        <Link href={`/articles/${id}`}>
          <div className="h-fit mr-2 flex items-center bg-slate-00">
            <div className="h-full pl-3 pr-1 flex flex-col justify-between items-center bg-gray-00">
              <div className="bg-gray-00 w-full">
                <div className="flex">
                  <p
                    className={`bg-slate-00 text-sm text-start ${merriweather.className}`}
                  >
                    {heading}
                  </p>
                </div>

                <p
                  className={`text-[.6rem] lg:text-[.65rem] mt-1 text-gray-500 ${openSans.className}`}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <LikeComponent
          date={date}
          likeCount={likeCount}
          commentsCount={commentsCount}
        />
      </div>

      <div className="relative">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => handleOptionClick("Share")}
            className="text-[#707070] text-sm"
          >
            <Share fontSize="small" className="mr-2" />
            Share
          </MenuItem>
          <MenuItem
            onClick={() => handleOptionClick("Add to Playlist")}
            className="text-[#707070] text-sm"
          >
            <Add className="mr-2" />
            Add to List
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
