import React from "react";
import { Typography } from "@mui/material";
import "./ProfilePageTitle.css";

const ProfilePageTitle = () => {
  return (
    <div className="profile-page-title-div">
      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: "bold" }}
        className="profile-page-title"
      >
        💀 DOOM TRACKER 💀
      </Typography>
    </div>
  );
};

export default ProfilePageTitle;
