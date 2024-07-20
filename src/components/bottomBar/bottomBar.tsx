import React from "react";
import { Copyright } from "./copyright";
import { ExportModal, UserGuide } from "../modals";

export const BottomBar = () => {
  return (
    <>
      <UserGuide />
      <ExportModal />
      <Copyright />
    </>
  );
};
