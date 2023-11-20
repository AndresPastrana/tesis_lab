import { ReactNode } from "react";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import NavbarHorizontal from "../ui/dashboard/NavbarHorizontal";
import NavbarVertical from "../ui/dashboard/NavbarVertical";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/*Navbar */}
        <NavbarHorizontal />
        {/* Page content here */}
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </div>
      <NavbarVertical />
    </div>
  );
}

export default layout;
