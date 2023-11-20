import React, { ReactNode } from "react";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";

const layout = ({ children }: { children: ReactNode }) => {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
};

export default layout;
