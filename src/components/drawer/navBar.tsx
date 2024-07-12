import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AllInbox, Apps, BorderClear } from "@mui/icons-material";
import { NavBarItem } from "./navBarItem";


export const NavBar = () => {
  return (
    <>
      <NavBarItem
        label="Inventory"
        path="inventory"
        icon={<DashboardIcon />}
      />

      <NavBarItem
        label="Active Projects"
        path="active-projects"
        icon={<AllInbox />}
      />

      <NavBarItem label="Wishlist" path="wishlist" icon={<BorderClear />} />

      <NavBarItem
        label="Items & Recipes"
        path="items-and-recipes"
        icon={<Apps />}
      />
    </>
  );
};
