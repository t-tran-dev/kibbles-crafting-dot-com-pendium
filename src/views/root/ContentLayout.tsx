import React, { FC, ReactNode, useState } from "react";
import { styled } from "@mui/material";
import { Header } from "../../components/header";
import { Drawer } from "../../components/drawer";
import { BottomBar } from "../../components/bottomBar";

type ContentLayoutProps = {
  children?: ReactNode;
};

export const ContentLayout: FC<ContentLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <StyledRoot>
      <Header open={open} toggleOpen={toggleDrawer} />
      <Drawer open={open} toggleOpen={toggleDrawer} />
      <Main>
        {children}
        <BottomBar />
      </Main>
    </StyledRoot>
  );
};

const StyledRoot = styled("div")({
  display: "flex",
});
const Main = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));
