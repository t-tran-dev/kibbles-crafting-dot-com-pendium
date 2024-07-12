import React, { FC } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";

type NavBarItemProps = {
  label: string;
  path: string;
  icon: JSX.Element;
};

export const NavBarItem: FC<NavBarItemProps> = ({ label, path, icon }) => {
  // const navigate = useNavigate();
  return (
    <ListItemButton
    // onClick={() => navigate(`/${path}`)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
