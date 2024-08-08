import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent the Link from being triggered
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation(); // Prevent the Link from being triggered
    setAnchorEl(null);
  };

  const handleEdit = (event) => {
    event.stopPropagation(); // Prevent the Link from being triggered
    console.log("Edit clicked");
    handleClose(event);
  };

  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent the Link from being triggered
    console.log("Delete clicked");
    handleClose(event);
  };

  const handleShare = (event) => {
    event.stopPropagation(); // Prevent the Link from being triggered
    console.log("Share clicked");
    handleClose(event);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" /> Delete
        </MenuItem>
        <MenuItem onClick={handleShare}>
          <ShareIcon fontSize="small" /> Share
        </MenuItem>
      </Menu>
    </div>
  );
}
