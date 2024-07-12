import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: 4 }}
    >
      {"Copyright © "}
      {/* <Link color="inherit" to="https://www.kthomebrew.com/">
        Kibbles Tasty
      </Link>{" "}
      <Link
        color="inherit"
        to="https://youtu.be/mWsoQLYZ1X8?si=-6BTuy48bID6fYIq&t=104"
      >
        {new Date().getFullYear()}
      </Link>{" "} */}
      {"."}
    </Typography>
  );
};
