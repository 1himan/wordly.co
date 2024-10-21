import * as React from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import useLogout from "../../hooks/useLogout";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import ProfileIcon from "./ProfileIcon";

interface ProfileDropdownProps {
  imageUrl: string;
  alt: string;
  userId: string;
}

export default function ProfileDropdown({
  imageUrl,
  alt,
  userId,
}: ProfileDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Proper typing for anchorEl
  const open = Boolean(anchorEl);
  const logout = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
      <IconButton onClick={handleClick}>
        <Avatar alt={alt} src={imageUrl} sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiPaper-root": { width: "180px", borderRadius: "12px" } }} // Adjust the width and borderRadius as needed
      >
        <MenuItem onClick={handleClose}>
          <Link href={`/user/${userId}`} passHref className="w-full flex gap-3">
            <ProfileIcon />
            <p className="text-[#707070] text-sm">Profile</p>
          </Link>
        </MenuItem>
        <MenuItem onClick={logout} className="w-full flex gap-3">
          <Logout
            fontSize="inherit"
            className="ml-1"
            sx={{ color: "#707070", fontSize: "22px" }}
          />
          <p className="text-[#707070] font-thin text-sm">Log Out</p>
        </MenuItem>
      </Menu>
    </div>
  );
}
